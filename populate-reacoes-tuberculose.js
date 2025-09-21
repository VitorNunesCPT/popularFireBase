const { db } = require('./firebase-config');
const {
  reacoesMedicamentos,
  eventosVacina,
  populacoesRisco,
  dosagensVitamina,
  criteriosMonitoramento,
} = require('./data/reacoes-tuberculose-data');

async function populateReacoesTuberculose() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_7...');

    const batch = db.batch();

    // Referência para o card_7 (Reações da Tuberculose)
    const card7Ref = db.collection('infoCards').doc('card_7');

    // Reações a medicamentos
    const reacoesMedicamentosRef = card7Ref.collection('detalhes').doc('reacoes-medicamentos');
    batch.set(reacoesMedicamentosRef, {
      title: "Reações aos Medicamentos",
      description: "Efeitos adversos dos medicamentos antituberculose",
      order: 1,
      data: reacoesMedicamentos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Eventos adversos da vacina BCG
    const eventosVacinaRef = card7Ref.collection('detalhes').doc('eventos-vacina');
    batch.set(eventosVacinaRef, {
      title: "Eventos Adversos da Vacina BCG",
      description: "Complicações relacionadas à vacinação BCG",
      order: 2,
      data: eventosVacina,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Populações de risco
    const populacoesRiscoRef = card7Ref.collection('detalhes').doc('populacoes-risco');
    batch.set(populacoesRiscoRef, {
      title: "Populações de Risco",
      description: "Grupos com maior risco de reações adversas",
      order: 3,
      data: populacoesRisco,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dosagens de vitamina B6
    const dosagensVitaminaRef = card7Ref.collection('detalhes').doc('dosagens-vitamina');
    batch.set(dosagensVitaminaRef, {
      title: "Dosagens de Piridoxina (Vitamina B6)",
      description: "Doses recomendadas para prevenção de neuropatia",
      order: 4,
      data: dosagensVitamina,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios de monitoramento
    const criteriosMonitoramentoRef = card7Ref.collection('detalhes').doc('criterios-monitoramento');
    batch.set(criteriosMonitoramentoRef, {
      title: "Critérios de Monitoramento",
      description: "Parâmetros para acompanhamento de reações",
      order: 5,
      data: criteriosMonitoramento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_7!');
    console.log('📊 Documentos criados em infoCards/card_7/detalhes:');
    console.log('  - reacoes-medicamentos');
    console.log('  - eventos-vacina');
    console.log('  - populacoes-risco');
    console.log('  - dosagens-vitamina');
    console.log('  - criterios-monitoramento');

    // Verificar se os dados foram inseridos
    const snapshot = await card7Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearReacoesTuberculose() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_7...');

    const card7Ref = db.collection('infoCards').doc('card_7');
    const snapshot = await card7Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_7 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listReacoesTuberculose() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_7:');

    const card7Ref = db.collection('infoCards').doc('card_7');
    const snapshot = await card7Ref.collection('detalhes')
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

async function getReacoesTuberculoseDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_7:');

    const card7Ref = db.collection('infoCards').doc('card_7');
    const snapshot = await card7Ref.collection('detalhes').get();

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
      await populateReacoesTuberculose();
      break;
    case 'clear':
      await clearReacoesTuberculose();
      break;
    case 'list':
      await listReacoesTuberculose();
      break;
    case 'details':
      await getReacoesTuberculoseDetails();
      break;
    case 'reset':
      await clearReacoesTuberculose();
      await populateReacoesTuberculose();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_7:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-reacoes-tuberculose.js populate');
      console.log('🏗️ Estrutura: infoCards/card_7/detalhes/[documentos]');
  }

  process.exit(0);
}

main();