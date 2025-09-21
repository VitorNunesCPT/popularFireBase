const { db } = require('./firebase-config');
const {
  tiposInteracoes,
  populacoesEspeciais,
  estrategiasManejo,
  criteriosMonitoramento,
  dosagensEspeciais,
} = require('./data/interacoes-medicamentosas-data');

async function populateInteracoesMedicamentosas() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_6...');

    const batch = db.batch();

    // Referência para o card_6 (Interações Medicamentosas)
    const card6Ref = db.collection('infoCards').doc('card_6');

    // Tipos de interações
    const tiposInteracoesRef = card6Ref.collection('detalhes').doc('tipos-interacoes');
    batch.set(tiposInteracoesRef, {
      title: "Tipos de Interações",
      description: "Classificação das interações por mecanismo",
      order: 1,
      data: tiposInteracoes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Populações especiais
    const populacoesEspeciaisRef = card6Ref.collection('detalhes').doc('populacoes-especiais');
    batch.set(populacoesEspeciaisRef, {
      title: "Populações Especiais",
      description: "Grupos com maior risco de interações",
      order: 2,
      data: populacoesEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Estratégias de manejo
    const estrategiasManejoRef = card6Ref.collection('detalhes').doc('estrategias-manejo');
    batch.set(estrategiasManejoRef, {
      title: "Estratégias de Manejo",
      description: "Abordagens para prevenir e manejar interações",
      order: 3,
      data: estrategiasManejo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios de monitoramento
    const criteriosMonitoramentoRef = card6Ref.collection('detalhes').doc('criterios-monitoramento');
    batch.set(criteriosMonitoramentoRef, {
      title: "Critérios de Monitoramento",
      description: "Parâmetros para acompanhamento de interações",
      order: 4,
      data: criteriosMonitoramento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dosagens especiais
    const dosagensEspeciaisRef = card6Ref.collection('detalhes').doc('dosagens-especiais');
    batch.set(dosagensEspeciaisRef, {
      title: "Dosagens Especiais",
      description: "Ajustes de dose para evitar interações",
      order: 5,
      data: dosagensEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_6!');
    console.log('📊 Documentos criados em infoCards/card_6/detalhes:');
    console.log('  - tipos-interacoes');
    console.log('  - populacoes-especiais');
    console.log('  - estrategias-manejo');
    console.log('  - criterios-monitoramento');
    console.log('  - dosagens-especiais');

    // Verificar se os dados foram inseridos
    const snapshot = await card6Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearInteracoesMedicamentosas() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_6...');

    const card6Ref = db.collection('infoCards').doc('card_6');
    const snapshot = await card6Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_6 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listInteracoesMedicamentosas() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_6:');

    const card6Ref = db.collection('infoCards').doc('card_6');
    const snapshot = await card6Ref.collection('detalhes')
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

async function getInteracoesMedicamentosasDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_6:');

    const card6Ref = db.collection('infoCards').doc('card_6');
    const snapshot = await card6Ref.collection('detalhes').get();

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
      await populateInteracoesMedicamentosas();
      break;
    case 'clear':
      await clearInteracoesMedicamentosas();
      break;
    case 'list':
      await listInteracoesMedicamentosas();
      break;
    case 'details':
      await getInteracoesMedicamentosasDetails();
      break;
    case 'reset':
      await clearInteracoesMedicamentosas();
      await populateInteracoesMedicamentosas();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_6:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-interacoes-medicamentosas.js populate');
      console.log('🏗️ Estrutura: infoCards/card_6/detalhes/[documentos]');
  }

  process.exit(0);
}

main();