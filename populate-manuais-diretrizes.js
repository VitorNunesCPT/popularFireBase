const { db } = require('./firebase-config');
const {
  manuaisDiretrizes,
  categorias,
  historicoAtualizacoes,
  metadados,
} = require('./data/manuais-diretrizes-data');

async function populateManuaisDiretrizes() {
  try {
    console.log('🔄 Iniciando população do card_13 - Manuais e Diretrizes...');

    const batch = db.batch();
    const card13Ref = db.collection('infoCards').doc('card_13');

    // 1. Atualizar/Criar documento principal do card_13
    console.log('📝 Atualizando documento principal card_13...');
    batch.set(card13Ref, {
      title: "Manuais e Diretrizes",
      description: "Documentos técnicos oficiais",
      iconName: "BookOpen",
      status: "Referência",
      theme: "indigo",
      order: 13,
      updatedAt: new Date(),
    }, { merge: true });

    // 2. Documento com lista de manuais na subcoleção detalhes
    console.log('📚 Adicionando manuais à subcoleção detalhes...');
    const manuaisRef = card13Ref.collection('detalhes').doc('manuais');
    batch.set(manuaisRef, {
      title: "Manuais e Diretrizes Oficiais",
      description: "Documentos técnicos e normativos do Ministério da Saúde",
      order: 1,
      data: manuaisDiretrizes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Card_13 populado com sucesso!');
    console.log('');
    console.log('📊 Estrutura criada:');
    console.log('   ✓ infoCards/card_13 - Documento principal atualizado');
    console.log('   ✓ infoCards/card_13/detalhes/manuais - Lista completa');
    console.log('');
    console.log(`📚 Total de manuais: ${manuaisDiretrizes.length}`);
    console.log(`✨ Documentos atuais: ${manuaisDiretrizes.filter(m => m.isAtual).length}`);
    console.log(`📖 Documentos históricos: ${manuaisDiretrizes.filter(m => !m.isAtual).length}`);

    // Verificação
    const snapshot = await card13Ref.collection('detalhes').get();
    console.log('');
    console.log(`🔍 Verificação: ${snapshot.size} documento(s) na subcoleção detalhes`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearManuaisDiretrizes() {
  try {
    console.log('🗑️  Limpando subcoleção detalhes do card_13...');

    const card13Ref = db.collection('infoCards').doc('card_13');
    const snapshot = await card13Ref.collection('detalhes').get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`✅ ${snapshot.size} documentos removidos com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao limpar subcoleção:', error);
  }
}

async function listManuaisDiretrizes() {
  try {
    console.log('📋 Listando documentos da subcoleção card_13/detalhes...\n');

    const card13Ref = db.collection('infoCards').doc('card_13');
    const snapshot = await card13Ref.collection('detalhes').orderBy('order').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum documento encontrado');
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`📄 ${doc.id}`);
      console.log(`   Título: ${data.title}`);
      console.log(`   Descrição: ${data.description}`);
      console.log(`   Order: ${data.order}`);

      if (doc.id === 'manuais' && data.data) {
        console.log(`   Total de manuais: ${data.data.length}`);
        console.log(`   Manuais atuais: ${data.data.filter(m => m.isAtual).length}`);
      }

      console.log('');
    });

    console.log(`📊 Total: ${snapshot.size} documentos`);
  } catch (error) {
    console.error('❌ Erro ao listar documentos:', error);
  }
}

async function getManuaisDiretrizesDetails() {
  try {
    console.log('🔍 Detalhes completos da subcoleção card_13/detalhes...\n');

    const card13Ref = db.collection('infoCards').doc('card_13');
    const snapshot = await card13Ref.collection('detalhes').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum documento encontrado');
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`📄 Documento: ${doc.id}`);
      console.log('─'.repeat(60));
      console.log(JSON.stringify(data, null, 2));
      console.log('');
    });

  } catch (error) {
    console.error('❌ Erro ao buscar detalhes:', error);
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'populate':
      await populateManuaisDiretrizes();
      break;
    case 'clear':
      await clearManuaisDiretrizes();
      break;
    case 'list':
      await listManuaisDiretrizes();
      break;
    case 'details':
      await getManuaisDiretrizesDetails();
      break;
    case 'reset':
      await clearManuaisDiretrizes();
      await populateManuaisDiretrizes();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_13:');
      console.log('');
      console.log('  populate  - Popula a subcoleção com manuais e diretrizes');
      console.log('  clear     - Remove todos os documentos da subcoleção');
      console.log('  list      - Lista os documentos (resumo)');
      console.log('  details   - Mostra detalhes completos dos documentos');
      console.log('  reset     - Limpa e repopula a subcoleção');
      console.log('');
      console.log('Uso: node populate-manuais-diretrizes.js <comando>');
  }

  process.exit(0);
}

main();
