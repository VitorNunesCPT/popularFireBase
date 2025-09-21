const { db } = require('./firebase-config');
const {
  esquemasBasicos,
  esquemasTBDR,
  esquemaILTB,
  locaisTratamento,
  modalidadesTDO,
  monitoramentoCronico,
  dosagensEspeciais,
  criteriosLaboratoriais,
} = require('./data/tratamento-data');

async function populateTratamento() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_4...');

    const batch = db.batch();

    // Referência para o card_4 (Tratamento)
    const card4Ref = db.collection('infoCards').doc('card_4');

    // Esquemas básicos
    const esquemasBasicosRef = card4Ref.collection('detalhes').doc('esquemas-basicos');
    batch.set(esquemasBasicosRef, {
      title: "Esquemas Básicos de Tratamento",
      description: "Esquemas padrão para TB sensível",
      order: 1,
      data: esquemasBasicos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Esquemas TB drogarresistente
    const esquemasTBDRRef = card4Ref.collection('detalhes').doc('esquemas-tbdr');
    batch.set(esquemasTBDRRef, {
      title: "Esquemas para TB Drogarresistente",
      description: "Tratamento para TB MDR e XDR",
      order: 2,
      data: esquemasTBDR,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Esquemas ILTB
    const esquemaILTBRef = card4Ref.collection('detalhes').doc('esquemas-iltb');
    batch.set(esquemaILTBRef, {
      title: "Esquemas para ILTB",
      description: "Tratamento da Infecção Latente da Tuberculose",
      order: 3,
      data: esquemaILTB,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais de tratamento
    const locaisTratamentoRef = card4Ref.collection('detalhes').doc('locais-tratamento');
    batch.set(locaisTratamentoRef, {
      title: "Locais de Tratamento",
      description: "Níveis de atenção e indicações",
      order: 4,
      data: locaisTratamento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Modalidades TDO
    const modalidadesTDORef = card4Ref.collection('detalhes').doc('modalidades-tdo');
    batch.set(modalidadesTDORef, {
      title: "Modalidades de TDO",
      description: "Tratamento Diretamente Observado",
      order: 5,
      data: modalidadesTDO,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Monitoramento
    const monitoramentoCronicoRef = card4Ref.collection('detalhes').doc('monitoramento-cronico');
    batch.set(monitoramentoCronicoRef, {
      title: "Monitoramento do Tratamento",
      description: "Acompanhamento durante o tratamento",
      order: 6,
      data: monitoramentoCronico,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dosagens especiais
    const dosagensEspeciaisRef = card4Ref.collection('detalhes').doc('dosagens-especiais');
    batch.set(dosagensEspeciaisRef, {
      title: "Dosagens Especiais",
      description: "Doses máximas e considerações especiais",
      order: 7,
      data: dosagensEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios laboratoriais
    const criteriosLaboratoriaisRef = card4Ref.collection('detalhes').doc('criterios-laboratoriais');
    batch.set(criteriosLaboratoriaisRef, {
      title: "Critérios Laboratoriais",
      description: "Parâmetros de monitoramento laboratorial",
      order: 8,
      data: criteriosLaboratoriais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_4!');
    console.log('📊 Documentos criados em infoCards/card_4/detalhes:');
    console.log('  - esquemas-basicos');
    console.log('  - esquemas-tbdr');
    console.log('  - esquemas-iltb');
    console.log('  - locais-tratamento');
    console.log('  - modalidades-tdo');
    console.log('  - monitoramento-cronico');
    console.log('  - dosagens-especiais');
    console.log('  - criterios-laboratoriais');

    // Verificar se os dados foram inseridos
    const snapshot = await card4Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearTratamento() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_4...');

    const card4Ref = db.collection('infoCards').doc('card_4');
    const snapshot = await card4Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_4 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listTratamento() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_4:');

    const card4Ref = db.collection('infoCards').doc('card_4');
    const snapshot = await card4Ref.collection('detalhes')
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

async function getTratamentoDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_4:');

    const card4Ref = db.collection('infoCards').doc('card_4');
    const snapshot = await card4Ref.collection('detalhes').get();

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
      await populateTratamento();
      break;
    case 'clear':
      await clearTratamento();
      break;
    case 'list':
      await listTratamento();
      break;
    case 'details':
      await getTratamentoDetails();
      break;
    case 'reset':
      await clearTratamento();
      await populateTratamento();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_4:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-tratamento.js populate');
      console.log('🏗️ Estrutura: infoCards/card_4/detalhes/[documentos]');
  }

  process.exit(0);
}

main();