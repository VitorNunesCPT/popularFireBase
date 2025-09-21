const { db } = require('./firebase-config');
const {
  mecanismoTransmissao,
  fatoresRisco,
  locaisRisco,
  medidasControle,
  cronologiaTransmissao,
  criteriosQuantitativos,
  populacoesVulneraveis,
} = require('./data/transmissao-data');

async function populateTransmissao() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_2...');

    const batch = db.batch();

    // Referência para o card_2 (Transmissão)
    const card2Ref = db.collection('infoCards').doc('card_2');

    // Mecanismo de transmissão
    const mecanismoRef = card2Ref.collection('detalhes').doc('mecanismo-transmissao');
    batch.set(mecanismoRef, {
      title: "Mecanismo de Transmissão",
      description: "Como ocorre a transmissão da tuberculose",
      order: 1,
      data: mecanismoTransmissao,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Fatores de risco
    const fatoresRiscoRef = card2Ref.collection('detalhes').doc('fatores-risco');
    batch.set(fatoresRiscoRef, {
      title: "Fatores de Risco para Transmissão",
      description: "Fatores que aumentam o risco de transmissão",
      order: 2,
      data: fatoresRisco,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais de risco
    const locaisRiscoRef = card2Ref.collection('detalhes').doc('locais-risco');
    batch.set(locaisRiscoRef, {
      title: "Locais de Alto Risco",
      description: "Ambientes com maior probabilidade de transmissão",
      order: 3,
      data: locaisRisco,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Medidas de controle
    const medidasControleRef = card2Ref.collection('detalhes').doc('medidas-controle');
    batch.set(medidasControleRef, {
      title: "Medidas de Controle",
      description: "Estratégias para prevenir a transmissão",
      order: 4,
      data: medidasControle,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Cronologia da transmissão
    const cronologiaRef = card2Ref.collection('detalhes').doc('cronologia-transmissao');
    batch.set(cronologiaRef, {
      title: "Cronologia da Transmissibilidade",
      description: "Evolução da capacidade de transmissão durante o tratamento",
      order: 5,
      data: cronologiaTransmissao,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios quantitativos
    const criteriosRef = card2Ref.collection('detalhes').doc('criterios-quantitativos');
    batch.set(criteriosRef, {
      title: "Critérios Quantitativos",
      description: "Parâmetros numéricos para avaliação de risco",
      order: 6,
      data: criteriosQuantitativos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Populações vulneráveis
    const populacoesRef = card2Ref.collection('detalhes').doc('populacoes-vulneraveis');
    batch.set(populacoesRef, {
      title: "Populações Vulneráveis",
      description: "Grupos com maior risco de exposição",
      order: 7,
      data: populacoesVulneraveis,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_2!');
    console.log('📊 Documentos criados em infoCards/card_2/detalhes:');
    console.log('  - mecanismo-transmissao');
    console.log('  - fatores-risco');
    console.log('  - locais-risco');
    console.log('  - medidas-controle');
    console.log('  - cronologia-transmissao');
    console.log('  - criterios-quantitativos');
    console.log('  - populacoes-vulneraveis');

    // Verificar se os dados foram inseridos
    const snapshot = await card2Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearTransmissao() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_2...');

    const card2Ref = db.collection('infoCards').doc('card_2');
    const snapshot = await card2Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_2 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listTransmissao() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_2:');

    const card2Ref = db.collection('infoCards').doc('card_2');
    const snapshot = await card2Ref.collection('detalhes')
      .orderBy('order', 'asc')
      .get();

    if (snapshot.empty) {
      console.log('Nenhum documento encontrado.');
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
    console.error('❌ Erro ao listar documentos da subcoleção:', error);
  }
}

async function getTransmissaoDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_2:');

    const card2Ref = db.collection('infoCards').doc('card_2');
    const snapshot = await card2Ref.collection('detalhes').get();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      console.log(`\n📄 ${doc.id}:`);
      console.log(`   Título: ${data.title}`);

      if (data.data && Array.isArray(data.data)) {
        console.log(`   Itens: ${data.data.length}`);
      } else if (data.data && typeof data.data === 'object') {
        const keys = Object.keys(data.data);
        console.log(`   Seções: ${keys.join(', ')}`);
        keys.forEach(key => {
          if (Array.isArray(data.data[key])) {
            console.log(`     ${key}: ${data.data[key].length} itens`);
          }
        });
      }
    }

  } catch (error) {
    console.error('❌ Erro ao obter detalhes da subcoleção:', error);
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'populate':
      await populateTransmissao();
      break;
    case 'clear':
      await clearTransmissao();
      break;
    case 'list':
      await listTransmissao();
      break;
    case 'details':
      await getTransmissaoDetails();
      break;
    case 'reset':
      await clearTransmissao();
      await populateTransmissao();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_2:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-transmissao.js populate');
      console.log('🏗️ Estrutura: infoCards/card_2/detalhes/[documentos]');
  }

  process.exit(0);
}

main();