const { db } = require('./firebase-config');
const {
  metodosLaboratoriais,
  metodosImunologicos,
  metodosImagem,
  fluxogramaDiagnostico,
  diagnosticoDiferencial,
  biomarcadores,
  algoritmoTratamento,
  criteriosEspeciais,
} = require('./data/diagnostico-data');

async function populateDiagnostico() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_3...');

    const batch = db.batch();

    // Referência para o card_3 (Diagnóstico)
    const card3Ref = db.collection('infoCards').doc('card_3');

    // Métodos laboratoriais
    const metodosLabRef = card3Ref.collection('detalhes').doc('metodos-laboratoriais');
    batch.set(metodosLabRef, {
      title: "Métodos Laboratoriais",
      description: "Exames laboratoriais para diagnóstico de tuberculose",
      order: 1,
      data: metodosLaboratoriais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Métodos imunológicos
    const metodosImunoRef = card3Ref.collection('detalhes').doc('metodos-imunologicos');
    batch.set(metodosImunoRef, {
      title: "Métodos Imunológicos",
      description: "Testes imunológicos para detecção de tuberculose",
      order: 2,
      data: metodosImunologicos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Métodos de imagem
    const metodosImagemRef = card3Ref.collection('detalhes').doc('metodos-imagem');
    batch.set(metodosImagemRef, {
      title: "Métodos de Imagem",
      description: "Exames de imagem no diagnóstico da tuberculose",
      order: 3,
      data: metodosImagem,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Fluxograma diagnóstico
    const fluxogramaRef = card3Ref.collection('detalhes').doc('fluxograma-diagnostico');
    batch.set(fluxogramaRef, {
      title: "Fluxograma Diagnóstico",
      description: "Algoritmos diagnósticos por população",
      order: 4,
      data: fluxogramaDiagnostico,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Diagnóstico diferencial
    const diagDiferencialRef = card3Ref.collection('detalhes').doc('diagnostico-diferencial');
    batch.set(diagDiferencialRef, {
      title: "Diagnóstico Diferencial",
      description: "Doenças a serem diferenciadas da tuberculose",
      order: 5,
      data: diagnosticoDiferencial,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Biomarcadores
    const biomarcadoresRef = card3Ref.collection('detalhes').doc('biomarcadores');
    batch.set(biomarcadoresRef, {
      title: "Biomarcadores",
      description: "Marcadores biológicos auxiliares no diagnóstico",
      order: 6,
      data: biomarcadores,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Algoritmo de tratamento
    const algoritmoRef = card3Ref.collection('detalhes').doc('algoritmo-tratamento');
    batch.set(algoritmoRef, {
      title: "Algoritmo de Decisão Terapêutica",
      description: "Decisões baseadas em resultados de exames",
      order: 7,
      data: algoritmoTratamento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios especiais
    const criteriosRef = card3Ref.collection('detalhes').doc('criterios-especiais');
    batch.set(criteriosRef, {
      title: "Critérios Especiais",
      description: "Critérios diagnósticos para populações específicas",
      order: 8,
      data: criteriosEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_3!');
    console.log('📊 Documentos criados em infoCards/card_3/detalhes:');
    console.log('  - metodos-laboratoriais');
    console.log('  - metodos-imunologicos');
    console.log('  - metodos-imagem');
    console.log('  - fluxograma-diagnostico');
    console.log('  - diagnostico-diferencial');
    console.log('  - biomarcadores');
    console.log('  - algoritmo-tratamento');
    console.log('  - criterios-especiais');

    // Verificar se os dados foram inseridos
    const snapshot = await card3Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearDiagnostico() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_3...');

    const card3Ref = db.collection('infoCards').doc('card_3');
    const snapshot = await card3Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_3 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listDiagnostico() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_3:');

    const card3Ref = db.collection('infoCards').doc('card_3');
    const snapshot = await card3Ref.collection('detalhes')
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

async function getDiagnosticoDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_3:');

    const card3Ref = db.collection('infoCards').doc('card_3');
    const snapshot = await card3Ref.collection('detalhes').get();

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
      await populateDiagnostico();
      break;
    case 'clear':
      await clearDiagnostico();
      break;
    case 'list':
      await listDiagnostico();
      break;
    case 'details':
      await getDiagnosticoDetails();
      break;
    case 'reset':
      await clearDiagnostico();
      await populateDiagnostico();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_3:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-diagnostico.js populate');
      console.log('🏗️ Estrutura: infoCards/card_3/detalhes/[documentos]');
  }

  process.exit(0);
}

main();