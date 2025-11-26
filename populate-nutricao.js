const { db } = require("./firebase-config");
const { nutricao5w2h } = require("./data/nutricao-data");

async function populateNutricao() {
  try {
    console.log("🔄 Iniciando população da subcoleção em card_12...");

    const batch = db.batch();
    const card12Ref = db.collection("infoCards").doc("card_12");
    const docRef = card12Ref.collection("detalhes").doc("nutricao");
    const timestamp = new Date();

    batch.set(docRef, {
      title:
        "Orientações Nutricionais para Pacientes com Tuberculose: Avaliação 5W2H",
      description:
        "Conteúdo estruturado sobre manejo nutricional e apoio alimentar na TB organizado em O Quê, Por Quê, Onde, Quando, Quem, Como e Quanto.",
      order: 1,
      data: nutricao5w2h,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await batch.commit();

    console.log(
      '✅ Documento "nutricao-5w2h" criado com sucesso em infoCards/card_12/detalhes.'
    );

    const snapshot = await card12Ref.collection("detalhes").get();
    console.log(
      `🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`
    );
  } catch (error) {
    console.error("❌ Erro ao popular a subcoleção:", error);
  }
}

async function clearNutricao() {
  try {
    console.log("🗑️ Limpando subcoleção detalhes do card_12...");

    const card12Ref = db.collection("infoCards").doc("card_12");
    const snapshot = await card12Ref.collection("detalhes").get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("✅ Subcoleção detalhes do card_12 limpa com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao limpar a subcoleção:", error);
  }
}

async function listNutricao() {
  try {
    console.log("📋 Listando documentos da subcoleção detalhes do card_12:");

    const card12Ref = db.collection("infoCards").doc("card_12");
    const snapshot = await card12Ref
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

async function getNutricaoDetails() {
  try {
    console.log("🔍 Detalhes da subcoleção detalhes do card_12:");

    const card12Ref = db.collection("infoCards").doc("card_12");
    const snapshot = await card12Ref.collection("detalhes").get();

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

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "populate":
      await populateNutricao();
      break;
    case "clear":
      await clearNutricao();
      break;
    case "list":
      await listNutricao();
      break;
    case "details":
      await getNutricaoDetails();
      break;
    case "reset":
      await clearNutricao();
      await populateNutricao();
      break;
    default:
      console.log(
        "📖 Comandos disponíveis para subcoleção detalhes do card_12:"
      );
      console.log("  populate - Popula a subcoleção com os dados");
      console.log("  clear    - Limpa todos os documentos da subcoleção");
      console.log("  list     - Lista todos os documentos da subcoleção");
      console.log("  details  - Mostra detalhes dos documentos");
      console.log("  reset    - Limpa e popula novamente a subcoleção");
      console.log("");
      console.log("💡 Exemplo: node populate-nutricao.js populate");
      console.log("🏗️ Estrutura: infoCards/card_12/detalhes/[documentos]");
  }

  process.exit(0);
}

main();
