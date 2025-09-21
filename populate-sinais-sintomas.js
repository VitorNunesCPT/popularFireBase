const { db } = require('./firebase-config');
const {
  sintomasClassicos,
  sintomasFormas,
  sintomasPVHIV,
  locaisAvaliacao,
  criteriosSR,
  examesComplementares,
  monitoramentoTratamento,
  sinaisAlerta,
} = require('./data/sinais-sintomas-data');

async function populateSinaisSintomas() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_1...');

    const batch = db.batch();

    // Referência para o card_1 (Sinais e Sintomas)
    const card1Ref = db.collection('infoCards').doc('card_1');

    // Sintomas clássicos
    const sintomasClassicosRef = card1Ref.collection('detalhes').doc('sintomas-classicos');
    batch.set(sintomasClassicosRef, {
      title: "Sintomas Clássicos",
      description: "Os principais sintomas da tuberculose pulmonar",
      order: 1,
      data: sintomasClassicos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Sintomas por formas clínicas
    const sintomasFormasRef = card1Ref.collection('detalhes').doc('sintomas-formas');
    batch.set(sintomasFormasRef, {
      title: "Sintomas por Formas Clínicas",
      description: "Manifestações específicas por tipo de tuberculose",
      order: 2,
      data: sintomasFormas,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Sintomas em PVHIV
    const sintomasPVHIVRef = card1Ref.collection('detalhes').doc('sintomas-pvhiv');
    batch.set(sintomasPVHIVRef, {
      title: "Sintomas em Pessoas Vivendo com HIV",
      description: "Rastreamento específico para PVHIV",
      order: 3,
      data: sintomasPVHIV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais de avaliação
    const locaisAvaliacaoRef = card1Ref.collection('detalhes').doc('locais-avaliacao');
    batch.set(locaisAvaliacaoRef, {
      title: "Locais de Avaliação",
      description: "Onde e como fazer busca ativa de sintomáticos respiratórios",
      order: 4,
      data: locaisAvaliacao,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios para SR
    const criteriosSRRef = card1Ref.collection('detalhes').doc('criterios-sr');
    batch.set(criteriosSRRef, {
      title: "Critérios para Sintomático Respiratório",
      description: "Definições por população e contexto",
      order: 5,
      data: criteriosSR,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Exames complementares
    const examesComplementaresRef = card1Ref.collection('detalhes').doc('exames-complementares');
    batch.set(examesComplementaresRef, {
      title: "Exames Complementares",
      description: "Exames para confirmação diagnóstica",
      order: 6,
      data: examesComplementares,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Monitoramento do tratamento
    const monitoramentoTratamentoRef = card1Ref.collection('detalhes').doc('monitoramento-tratamento');
    batch.set(monitoramentoTratamentoRef, {
      title: "Monitoramento do Tratamento",
      description: "Acompanhamento da evolução dos sintomas",
      order: 7,
      data: monitoramentoTratamento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Sinais de alerta
    const sinaisAlertaRef = card1Ref.collection('detalhes').doc('sinais-alerta');
    batch.set(sinaisAlertaRef, {
      title: "Sinais de Alerta",
      description: "Situações que requerem atenção imediata",
      order: 8,
      data: sinaisAlerta,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_1!');
    console.log('📊 Documentos criados em infoCards/card_1/detalhes:');
    console.log('  - sintomas-classicos');
    console.log('  - sintomas-formas');
    console.log('  - sintomas-pvhiv');
    console.log('  - locais-avaliacao');
    console.log('  - criterios-sr');
    console.log('  - exames-complementares');
    console.log('  - monitoramento-tratamento');
    console.log('  - sinais-alerta');

    // Verificar se os dados foram inseridos
    const snapshot = await card1Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearSinaisSintomas() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_1...');

    const card1Ref = db.collection('infoCards').doc('card_1');
    const snapshot = await card1Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_1 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listSinaisSintomas() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_1:');

    const card1Ref = db.collection('infoCards').doc('card_1');
    const snapshot = await card1Ref.collection('detalhes')
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

async function getSinaisSintomasDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_1:');

    const card1Ref = db.collection('infoCards').doc('card_1');
    const snapshot = await card1Ref.collection('detalhes').get();

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
      await populateSinaisSintomas();
      break;
    case 'clear':
      await clearSinaisSintomas();
      break;
    case 'list':
      await listSinaisSintomas();
      break;
    case 'details':
      await getSinaisSintomasDetails();
      break;
    case 'reset':
      await clearSinaisSintomas();
      await populateSinaisSintomas();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_1:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-sinais-sintomas.js populate');
      console.log('🏗️ Estrutura: infoCards/card_1/detalhes/[documentos]');
  }

  process.exit(0);
}

main();