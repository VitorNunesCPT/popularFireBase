const { db } = require('./firebase-config');
const {
  acoesCuidado,
  importancia,
  locaisTempos,
  dosagens,
  sinaisAlerta,
} = require('./data/autocuidado-data');

async function populateAutocuidado() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_8...');

    const batch = db.batch();

    // Referência para o card_8 (Dicas de Autocuidado)
    const card8Ref = db.collection('infoCards').doc('card_8');

    // Ações de cuidado
    const acoesCuidadoRef = card8Ref.collection('detalhes').doc('acoes-cuidado');
    batch.set(acoesCuidadoRef, {
      title: "Ações de Cuidado",
      description: "Práticas essenciais para o autocuidado durante o tratamento",
      order: 1,
      data: acoesCuidado,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Importância do autocuidado
    const importanciaRef = card8Ref.collection('detalhes').doc('importancia');
    batch.set(importanciaRef, {
      title: "Importância do Autocuidado",
      description: "Por que o autocuidado é fundamental no tratamento da TB",
      order: 2,
      data: importancia,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais e tempos
    const locaisTemposRef = card8Ref.collection('detalhes').doc('locais-tempos');
    batch.set(locaisTemposRef, {
      title: "Onde e Quando Praticar",
      description: "Orientações sobre locais e momentos para o autocuidado",
      order: 3,
      data: locaisTempos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Dosagens importantes
    const dosagensRef = card8Ref.collection('detalhes').doc('dosagens');
    batch.set(dosagensRef, {
      title: "Dosagens Importantes",
      description: "Doses e orientações sobre medicamentos",
      order: 4,
      data: dosagens,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Sinais de alerta
    const sinaisAlertaRef = card8Ref.collection('detalhes').doc('sinais-alerta');
    batch.set(sinaisAlertaRef, {
      title: "Sinais de Alerta",
      description: "Sintomas que requerem atenção médica imediata",
      order: 5,
      data: sinaisAlerta,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_8!');
    console.log('📊 Documentos criados em infoCards/card_8/detalhes:');
    console.log('  - acoes-cuidado');
    console.log('  - importancia');
    console.log('  - locais-tempos');
    console.log('  - dosagens');
    console.log('  - sinais-alerta');

    // Verificar se os dados foram inseridos
    const snapshot = await card8Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearAutocuidado() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_8...');

    const card8Ref = db.collection('infoCards').doc('card_8');
    const snapshot = await card8Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_8 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listAutocuidado() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_8:');

    const card8Ref = db.collection('infoCards').doc('card_8');
    const snapshot = await card8Ref.collection('detalhes')
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

async function getAutocuidadoDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_8:');

    const card8Ref = db.collection('infoCards').doc('card_8');
    const snapshot = await card8Ref.collection('detalhes').get();

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
      await populateAutocuidado();
      break;
    case 'clear':
      await clearAutocuidado();
      break;
    case 'list':
      await listAutocuidado();
      break;
    case 'details':
      await getAutocuidadoDetails();
      break;
    case 'reset':
      await clearAutocuidado();
      await populateAutocuidado();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_8:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-autocuidado.js populate');
      console.log('🏗️ Estrutura: infoCards/card_8/detalhes/[documentos]');
  }

  process.exit(0);
}

main();