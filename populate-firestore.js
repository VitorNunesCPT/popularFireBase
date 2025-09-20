const { db } = require('./firebase-config');

// Dados dos infoCards sobre tuberculose
const infoCardsData = [
  {
    title: "Sinais e Sintomas",
    description: "Reconheça os sinais da tuberculose",
    iconName: "Thermometer",
    status: "Essencial",
    theme: "danger",
    order: 1,
  },
  {
    title: "Transmissão",
    description: "Como a tuberculose é transmitida",
    iconName: "Droplets",
    status: "Importante",
    theme: "info",
    order: 2,
  },
  {
    title: "Diagnóstico",
    description: "Métodos diagnósticos e interpretação",
    iconName: "Microscope",
    status: "Fundamental",
    theme: "blue",
    order: 3,
  },
  {
    title: "Sobre o Tratamento",
    description: "Informações sobre o tratamento",
    iconName: "Stethoscope",
    status: "Fundamental",
    theme: "success",
    order: 4,
  },
  {
    title: "Reações Adversas",
    description: "Possíveis reações aos medicamentos",
    iconName: "AlertTriangle",
    status: "Atenção",
    theme: "warning",
    order: 5,
  },
  {
    title: "Interações Medicamentosas",
    description: "Interações com outros medicamentos",
    iconName: "Pill",
    status: "Cuidado",
    theme: "purple",
    order: 6,
  },
  {
    title: "Reações da Tuberculose",
    description: "Como o corpo reage à doença",
    iconName: "Virus",
    status: "Informativo",
    theme: "orange",
    order: 7,
  },
  {
    title: "Dicas de Autocuidado",
    description: "Cuidados durante o tratamento",
    iconName: "Heart",
    status: "Prático",
    theme: "pink",
    order: 8,
  },
  {
    title: "Prevenção",
    description: "Como prevenir a tuberculose",
    iconName: "ShieldAlert",
    status: "Preventivo",
    theme: "teal",
    order: 9,
  },
  {
    title: "TB-HIV (Coinfecção)",
    description: "Manejo da coinfecção tuberculose-HIV",
    iconName: "Heart",
    status: "Especializado",
    theme: "red",
    order: 10,
  },
  {
    title: "Epidemiologia",
    description: "Dados epidemiológicos e contexto",
    iconName: "BarChart3",
    status: "Contextual",
    theme: "blue",
    order: 11,
  },
];

async function populateInfoCards() {
  try {
    console.log('Iniciando população da coleção infoCards...');

    const batch = db.batch();

    infoCardsData.forEach((card, index) => {
      const docRef = db.collection('infoCards').doc(`card_${index + 1}`);
      batch.set(docRef, {
        ...card,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await batch.commit();

    console.log('✅ Coleção infoCards populada com sucesso!');
    console.log(`📊 Total de documentos criados: ${infoCardsData.length}`);

    // Verificar se os dados foram inseridos
    const snapshot = await db.collection('infoCards').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na coleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a coleção:', error);
  }
}

async function clearCollection() {
  try {
    console.log('Limpando coleção infoCards...');

    const snapshot = await db.collection('infoCards').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('🗑️ Coleção limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a coleção:', error);
  }
}

async function listInfoCards() {
  try {
    console.log('📋 Listando documentos da coleção infoCards:');

    const snapshot = await db.collection('infoCards')
      .orderBy('order')
      .get();

    if (snapshot.empty) {
      console.log('Nenhum documento encontrado.');
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`${data.order}. ${data.title} - ${data.status} (${data.theme})`);
    });

  } catch (error) {
    console.error('❌ Erro ao listar documentos:', error);
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'populate':
      await populateInfoCards();
      break;
    case 'clear':
      await clearCollection();
      break;
    case 'list':
      await listInfoCards();
      break;
    case 'reset':
      await clearCollection();
      await populateInfoCards();
      break;
    default:
      console.log('📖 Comandos disponíveis:');
      console.log('  populate - Popula a coleção com os dados');
      console.log('  clear    - Limpa todos os documentos da coleção');
      console.log('  list     - Lista todos os documentos da coleção');
      console.log('  reset    - Limpa e popula novamente a coleção');
      console.log('');
      console.log('💡 Exemplo: node populate-firestore.js populate');
  }

  process.exit(0);
}

main();