const { db } = require('./firebase-config');
const {
  estrategias,
  locais,
  momentos,
  responsaveis,
  implementacao,
  metas,
} = require('./data/prevencao-data');

async function populatePrevencao() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_9...');

    const batch = db.batch();

    // Referência para o card_9 (Prevenção)
    const card9Ref = db.collection('infoCards').doc('card_9');

    // Estratégias de prevenção
    const estrategiasRef = card9Ref.collection('detalhes').doc('estrategias');
    batch.set(estrategiasRef, {
      title: "Estratégias de Prevenção",
      description: "Principais abordagens para prevenir a tuberculose",
      order: 1,
      data: estrategias,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais de implementação
    const locaisRef = card9Ref.collection('detalhes').doc('locais');
    batch.set(locaisRef, {
      title: "Locais de Implementação",
      description: "Ambientes onde as medidas preventivas são aplicadas",
      order: 2,
      data: locais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Momentos de intervenção
    const momentosRef = card9Ref.collection('detalhes').doc('momentos');
    batch.set(momentosRef, {
      title: "Momentos de Intervenção",
      description: "Quando aplicar as medidas preventivas",
      order: 3,
      data: momentos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Responsáveis
    const responsaveisRef = card9Ref.collection('detalhes').doc('responsaveis');
    batch.set(responsaveisRef, {
      title: "Responsáveis",
      description: "Atores envolvidos na prevenção da tuberculose",
      order: 4,
      data: responsaveis,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Implementação
    const implementacaoRef = card9Ref.collection('detalhes').doc('implementacao');
    batch.set(implementacaoRef, {
      title: "Implementação",
      description: "Como operacionalizar as medidas preventivas",
      order: 5,
      data: implementacao,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Metas e indicadores
    const metasRef = card9Ref.collection('detalhes').doc('metas');
    batch.set(metasRef, {
      title: "Metas e Indicadores",
      description: "Objetivos quantitativos para prevenção",
      order: 6,
      data: metas,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_9!');
    console.log('📊 Documentos criados em infoCards/card_9/detalhes:');
    console.log('  - estrategias');
    console.log('  - locais');
    console.log('  - momentos');
    console.log('  - responsaveis');
    console.log('  - implementacao');
    console.log('  - metas');

    // Verificar se os dados foram inseridos
    const snapshot = await card9Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearPrevencao() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_9...');

    const card9Ref = db.collection('infoCards').doc('card_9');
    const snapshot = await card9Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_9 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listPrevencao() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_9:');

    const card9Ref = db.collection('infoCards').doc('card_9');
    const snapshot = await card9Ref.collection('detalhes')
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

async function getPrevencaoDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_9:');

    const card9Ref = db.collection('infoCards').doc('card_9');
    const snapshot = await card9Ref.collection('detalhes').get();

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
      await populatePrevencao();
      break;
    case 'clear':
      await clearPrevencao();
      break;
    case 'list':
      await listPrevencao();
      break;
    case 'details':
      await getPrevencaoDetails();
      break;
    case 'reset':
      await clearPrevencao();
      await populatePrevencao();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_9:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-prevencao.js populate');
      console.log('🏗️ Estrutura: infoCards/card_9/detalhes/[documentos]');
  }

  process.exit(0);
}

main();