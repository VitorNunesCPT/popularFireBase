const { db } = require('./firebase-config');
const {
  reacoesMenores,
  reacoesMaiores,
  fatoresRisco,
  estrategiasManejo,
  frequenciasReacoes,
  dosagensEspeciais,
  monitoramentoEspecial,
} = require('./data/reacoes-adversas-data');

async function populateReacoesAdversas() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_5...');

    const batch = db.batch();

    // Referência para o card_5 (Reações Adversas)
    const card5Ref = db.collection('infoCards').doc('card_5');

    // Reações menores
    const reacoesMenoresRef = card5Ref.collection('detalhes').doc('reacoes-menores');
    batch.set(reacoesMenoresRef, {
      title: "Reações Adversas Menores",
      description: "Efeitos colaterais comuns e menos graves",
      order: 1,
      data: reacoesMenores,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Reações maiores
    const reacoesMaioresRef = card5Ref.collection('detalhes').doc('reacoes-maiores');
    batch.set(reacoesMaioresRef, {
      title: "Reações Adversas Maiores",
      description: "Efeitos colaterais graves que requerem atenção especial",
      order: 2,
      data: reacoesMaiores,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Fatores de risco
    const fatoresRiscoRef = card5Ref.collection('detalhes').doc('fatores-risco');
    batch.set(fatoresRiscoRef, {
      title: "Fatores de Risco",
      description: "Condições que aumentam o risco de reações adversas",
      order: 3,
      data: fatoresRisco,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Estratégias de manejo
    const estrategiasManejoRef = card5Ref.collection('detalhes').doc('estrategias-manejo');
    batch.set(estrategiasManejoRef, {
      title: "Estratégias de Manejo",
      description: "Abordagens para reações menores e maiores",
      order: 4,
      data: estrategiasManejo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Frequências das reações
    const frequenciasReacoesRef = card5Ref.collection('detalhes').doc('frequencias-reacoes');
    batch.set(frequenciasReacoesRef, {
      title: "Frequências das Reações",
      description: "Incidência dos principais efeitos adversos",
      order: 5,
      data: frequenciasReacoes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dosagens especiais
    const dosagensEspeciaisRef = card5Ref.collection('detalhes').doc('dosagens-especiais');
    batch.set(dosagensEspeciaisRef, {
      title: "Dosagens Especiais",
      description: "Doses específicas para prevenção e manejo",
      order: 6,
      data: dosagensEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Monitoramento especial
    const monitoramentoEspecialRef = card5Ref.collection('detalhes').doc('monitoramento-especial');
    batch.set(monitoramentoEspecialRef, {
      title: "Monitoramento Especial",
      description: "Acompanhamento de grupos de risco",
      order: 7,
      data: monitoramentoEspecial,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_5!');
    console.log('📊 Documentos criados em infoCards/card_5/detalhes:');
    console.log('  - reacoes-menores');
    console.log('  - reacoes-maiores');
    console.log('  - fatores-risco');
    console.log('  - estrategias-manejo');
    console.log('  - frequencias-reacoes');
    console.log('  - dosagens-especiais');
    console.log('  - monitoramento-especial');

    // Verificar se os dados foram inseridos
    const snapshot = await card5Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearReacoesAdversas() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_5...');

    const card5Ref = db.collection('infoCards').doc('card_5');
    const snapshot = await card5Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_5 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listReacoesAdversas() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_5:');

    const card5Ref = db.collection('infoCards').doc('card_5');
    const snapshot = await card5Ref.collection('detalhes')
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

async function getReacoesAdversasDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_5:');

    const card5Ref = db.collection('infoCards').doc('card_5');
    const snapshot = await card5Ref.collection('detalhes').get();

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
      await populateReacoesAdversas();
      break;
    case 'clear':
      await clearReacoesAdversas();
      break;
    case 'list':
      await listReacoesAdversas();
      break;
    case 'details':
      await getReacoesAdversasDetails();
      break;
    case 'reset':
      await clearReacoesAdversas();
      await populateReacoesAdversas();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_5:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-reacoes-adversas.js populate');
      console.log('🏗️ Estrutura: infoCards/card_5/detalhes/[documentos]');
  }

  process.exit(0);
}

main();