const { db } = require('./firebase-config');
const {
  dadosNacionais2023,
  dadosRegionais,
  tendenciasHistoricas,
  indicadoresControle,
  populacoesVulneraveis,
  determinantesSociais,
  metasEndTB,
  comparacaoInternacional,
} = require('./data/epidemiologia-data');

async function populateEpidemiologia() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_11...');

    const batch = db.batch();

    // Referência para o card_11 (Epidemiologia)
    const card11Ref = db.collection('infoCards').doc('card_11');

    // Dados nacionais 2023
    const dadosNacionaisRef = card11Ref.collection('detalhes').doc('dados-nacionais-2023');
    batch.set(dadosNacionaisRef, {
      title: "Dados Nacionais 2023",
      description: "Indicadores epidemiológicos principais do Brasil",
      order: 1,
      data: dadosNacionais2023,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dados regionais
    const dadosRegionaisRef = card11Ref.collection('detalhes').doc('dados-regionais');
    batch.set(dadosRegionaisRef, {
      title: "Dados por Região",
      description: "Distribuição da TB pelas regiões brasileiras",
      order: 2,
      data: dadosRegionais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Tendências históricas
    const tendenciasRef = card11Ref.collection('detalhes').doc('tendencias-historicas');
    batch.set(tendenciasRef, {
      title: "Tendências Históricas",
      description: "Evolução dos indicadores de TB no Brasil (2014-2023)",
      order: 3,
      data: tendenciasHistoricas,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Indicadores de controle
    const indicadoresRef = card11Ref.collection('detalhes').doc('indicadores-controle');
    batch.set(indicadoresRef, {
      title: "Indicadores de Controle",
      description: "Indicadores de desempenho do programa de controle da TB",
      order: 4,
      data: indicadoresControle,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Populações vulneráveis
    const populacoesRef = card11Ref.collection('detalhes').doc('populacoes-vulneraveis');
    batch.set(populacoesRef, {
      title: "Populações Vulneráveis",
      description: "Grupos com maior risco e incidência de TB",
      order: 5,
      data: populacoesVulneraveis,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Determinantes sociais
    const determinantesRef = card11Ref.collection('detalhes').doc('determinantes-sociais');
    batch.set(determinantesRef, {
      title: "Determinantes Sociais",
      description: "Fatores socioeconômicos associados à TB",
      order: 6,
      data: determinantesSociais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Metas End TB Strategy
    const metasRef = card11Ref.collection('detalhes').doc('metas-end-tb');
    batch.set(metasRef, {
      title: "Metas End TB Strategy",
      description: "Progresso em direção às metas da Estratégia End TB",
      order: 7,
      data: metasEndTB,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Comparação internacional
    const comparacaoRef = card11Ref.collection('detalhes').doc('comparacao-internacional');
    batch.set(comparacaoRef, {
      title: "Comparação Internacional",
      description: "Posição do Brasil em relação a outros países",
      order: 8,
      data: comparacaoInternacional,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_11!');
    console.log('📊 Documentos criados em infoCards/card_11/detalhes:');
    console.log('  - dados-nacionais-2023');
    console.log('  - dados-regionais');
    console.log('  - tendencias-historicas');
    console.log('  - indicadores-controle');
    console.log('  - populacoes-vulneraveis');
    console.log('  - determinantes-sociais');
    console.log('  - metas-end-tb');
    console.log('  - comparacao-internacional');

    // Verificar se os dados foram inseridos
    const snapshot = await card11Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearEpidemiologia() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_11...');

    const card11Ref = db.collection('infoCards').doc('card_11');
    const snapshot = await card11Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_11 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listEpidemiologia() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_11:');

    const card11Ref = db.collection('infoCards').doc('card_11');
    const snapshot = await card11Ref.collection('detalhes')
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

async function getEpidemiologiaDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_11:');

    const card11Ref = db.collection('infoCards').doc('card_11');
    const snapshot = await card11Ref.collection('detalhes').get();

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
      await populateEpidemiologia();
      break;
    case 'clear':
      await clearEpidemiologia();
      break;
    case 'list':
      await listEpidemiologia();
      break;
    case 'details':
      await getEpidemiologiaDetails();
      break;
    case 'reset':
      await clearEpidemiologia();
      await populateEpidemiologia();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_11:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-epidemiologia.js populate');
      console.log('🏗️ Estrutura: infoCards/card_11/detalhes/[documentos]');
  }

  process.exit(0);
}

main();