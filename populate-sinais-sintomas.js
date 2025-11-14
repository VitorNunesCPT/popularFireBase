const { db } = require("./firebase-config");
const { sinais_valiacao5w2h } = require("./data/sinais-sintomas-data");

async function populateSinaisSintomas() {
  try {
    console.log("🔄 Iniciando população da subcoleção em card_1...");

    const batch = db.batch();

    // Referência para o card_1 (Sinais e Sintomas)
    const card1Ref = db.collection("infoCards").doc("card_1");

    const avaliacao5w2hRef = card1Ref
      .collection("detalhes")
      .doc("sinais-sintomas");

    const timestamp = new Date();

    batch.set(avaliacao5w2hRef, {
      title: "Sintomas da Tuberculose: Avaliação 5W2H",
      description:
        "A sua consulta solicita uma avaliação dos sintomas da Tuberculose (TB) utilizando o método 5W2H (O Quê, Por Quê, Onde, Quando, Quem, Como e Quanto).",
      order: 1,
      data: sinais_valiacao5w2h,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await batch.commit();

    console.log(
      '✅ Documento "avaliacao-5w2h" criado com sucesso em infoCards/card_1/detalhes.'
    );

    // Verificar se os dados foram inseridos
    const snapshot = await card1Ref.collection("detalhes").get();
    console.log(
      `🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`
    );
  } catch (error) {
    console.error("❌ Erro ao popular a subcoleção:", error);
  }
}

async function clearSinaisSintomas() {
  try {
    console.log("🗑️ Limpando subcoleção detalhes do card_1...");

    const card1Ref = db.collection("infoCards").doc("card_1");
    const snapshot = await card1Ref.collection("detalhes").get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("✅ Subcoleção detalhes do card_1 limpa com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao limpar a subcoleção:", error);
  }
}

async function listSinaisSintomas() {
  try {
    console.log("📋 Listando documentos da subcoleção detalhes do card_1:");

    const card1Ref = db.collection("infoCards").doc("card_1");
    const snapshot = await card1Ref
      .collection("detalhes")
      .orderBy("order", "asc")
      .get();

    if (snapshot.empty) {
      console.log("Nenhum documento encontrado.");
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`${data.order}. ${data.title} (${doc.id})`);
      if (data.description) {
        console.log(`   ${data.description}`);
      }
    });
  } catch (error) {
    console.error("❌ Erro ao listar documentos da subcoleção:", error);
  }
}

async function getSinaisSintomasDetails() {
  try {
    console.log("🔍 Detalhes da subcoleção detalhes do card_1:");

    const card1Ref = db.collection("infoCards").doc("card_1");
    const snapshot = await card1Ref.collection("detalhes").get();

    const summarizeStructure = (node, path = []) => {
      if (Array.isArray(node)) {
        console.log(`     ${path.join(" > ")}: ${node.length} itens`);
        return;
      }

      if (node && typeof node === "object") {
        Object.entries(node).forEach(([key, value]) => {
          summarizeStructure(value, [...path, key]);
        });
      }
    };

    for (const doc of snapshot.docs) {
      const data = doc.data();
      console.log(`\n📄 ${doc.id}:`);
      console.log(`   Título: ${data.title}`);

      if (data.data && Array.isArray(data.data)) {
        console.log(`   Itens: ${data.data.length}`);
      } else if (data.data && typeof data.data === "object") {
        const keys = Object.keys(data.data);
        console.log(`   Seções principais: ${keys.join(", ")}`);
        keys.forEach((key) => {
          summarizeStructure(data.data[key], [key]);
        });
      }
    }
  } catch (error) {
    console.error("❌ Erro ao obter detalhes da subcoleção:", error);
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "populate":
      await populateSinaisSintomas();
      break;
    case "clear":
      await clearSinaisSintomas();
      break;
    case "list":
      await listSinaisSintomas();
      break;
    case "details":
      await getSinaisSintomasDetails();
      break;
    case "reset":
      await clearSinaisSintomas();
      await populateSinaisSintomas();
      break;
    default:
      console.log(
        "📖 Comandos disponíveis para subcoleção detalhes do card_1:"
      );
      console.log("  populate - Popula a subcoleção com os dados");
      console.log("  clear    - Limpa todos os documentos da subcoleção");
      console.log("  list     - Lista todos os documentos da subcoleção");
      console.log("  details  - Mostra detalhes dos documentos");
      console.log("  reset    - Limpa e popula novamente a subcoleção");
      console.log("");
      console.log("💡 Exemplo: node populate-sinais-sintomas.js populate");
      console.log("🏗️ Estrutura: infoCards/card_1/detalhes/[documentos]");
  }

  process.exit(0);
}

main();
