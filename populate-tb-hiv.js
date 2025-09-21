const { db } = require('./firebase-config');
const {
  interacoesMedicamentos,
  epidemiologia,
  cronogramaTARV,
  cuidadosEspeciais,
  iris,
  esquemasTerapeuticos,
  profilaxias,
  criteriosLaboratoriais,
  locaisAtendimento,
} = require('./data/tb-hiv-data');

async function populateTbHiv() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_10...');

    const batch = db.batch();

    // Referência para o card_10 (TB-HIV Coinfecção)
    const card10Ref = db.collection('infoCards').doc('card_10');

    // Interações medicamentosas
    const interacoesRef = card10Ref.collection('detalhes').doc('interacoes-medicamentos');
    batch.set(interacoesRef, {
      title: "Interações Medicamentosas",
      description: "Interações entre medicamentos para TB e antirretrovirais",
      order: 1,
      data: interacoesMedicamentos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Epidemiologia
    const epidemiologiaRef = card10Ref.collection('detalhes').doc('epidemiologia');
    batch.set(epidemiologiaRef, {
      title: "Epidemiologia",
      description: "Dados epidemiológicos da coinfecção TB-HIV",
      order: 2,
      data: epidemiologia,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Cronograma TARV
    const cronogramaRef = card10Ref.collection('detalhes').doc('cronograma-tarv');
    batch.set(cronogramaRef, {
      title: "Cronograma de Início do TARV",
      description: "Quando iniciar tratamento antirretroviral conforme CD4+",
      order: 3,
      data: cronogramaTARV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Cuidados especiais
    const cuidadosRef = card10Ref.collection('detalhes').doc('cuidados-especiais');
    batch.set(cuidadosRef, {
      title: "Cuidados Especiais",
      description: "Abordagens específicas para diagnóstico, tratamento e monitoramento",
      order: 4,
      data: cuidadosEspeciais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // IRIS (Síndrome Inflamatória de Reconstituição Imune)
    const irisRef = card10Ref.collection('detalhes').doc('iris');
    batch.set(irisRef, {
      title: "IRIS - Síndrome Inflamatória de Reconstituição Imune",
      description: "Tipos, manifestações e manejo da IRIS",
      order: 5,
      data: iris,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Esquemas terapêuticos
    const esquemasRef = card10Ref.collection('detalhes').doc('esquemas-terapeuticos');
    batch.set(esquemasRef, {
      title: "Esquemas Terapêuticos",
      description: "Esquemas de tratamento conforme ARV em uso",
      order: 6,
      data: esquemasTerapeuticos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Profilaxias
    const profilaxiasRef = card10Ref.collection('detalhes').doc('profilaxias');
    batch.set(profilaxiasRef, {
      title: "Profilaxias",
      description: "Profilaxias para infecções oportunistas",
      order: 7,
      data: profilaxias,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Critérios laboratoriais
    const criteriosRef = card10Ref.collection('detalhes').doc('criterios-laboratoriais');
    batch.set(criteriosRef, {
      title: "Critérios Laboratoriais",
      description: "Parâmetros laboratoriais para monitoramento",
      order: 8,
      data: criteriosLaboratoriais,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Locais de atendimento
    const locaisRef = card10Ref.collection('detalhes').doc('locais-atendimento');
    batch.set(locaisRef, {
      title: "Locais de Atendimento",
      description: "Organização da rede de cuidado para coinfecção TB-HIV",
      order: 9,
      data: locaisAtendimento,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_10!');
    console.log('📊 Documentos criados em infoCards/card_10/detalhes:');
    console.log('  - interacoes-medicamentos');
    console.log('  - epidemiologia');
    console.log('  - cronograma-tarv');
    console.log('  - cuidados-especiais');
    console.log('  - iris');
    console.log('  - esquemas-terapeuticos');
    console.log('  - profilaxias');
    console.log('  - criterios-laboratoriais');
    console.log('  - locais-atendimento');

    // Verificar se os dados foram inseridos
    const snapshot = await card10Ref.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clearTbHiv() {
  try {
    console.log('🗑️ Limpando subcoleção detalhes do card_10...');

    const card10Ref = db.collection('infoCards').doc('card_10');
    const snapshot = await card10Ref.collection('detalhes').get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✅ Subcoleção detalhes do card_10 limpa com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao limpar a subcoleção:', error);
  }
}

async function listTbHiv() {
  try {
    console.log('📋 Listando documentos da subcoleção detalhes do card_10:');

    const card10Ref = db.collection('infoCards').doc('card_10');
    const snapshot = await card10Ref.collection('detalhes')
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

async function getTbHivDetails() {
  try {
    console.log('🔍 Detalhes da subcoleção detalhes do card_10:');

    const card10Ref = db.collection('infoCards').doc('card_10');
    const snapshot = await card10Ref.collection('detalhes').get();

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
      await populateTbHiv();
      break;
    case 'clear':
      await clearTbHiv();
      break;
    case 'list':
      await listTbHiv();
      break;
    case 'details':
      await getTbHivDetails();
      break;
    case 'reset':
      await clearTbHiv();
      await populateTbHiv();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_10:');
      console.log('  populate - Popula a subcoleção com os dados');
      console.log('  clear    - Limpa todos os documentos da subcoleção');
      console.log('  list     - Lista todos os documentos da subcoleção');
      console.log('  details  - Mostra detalhes dos documentos');
      console.log('  reset    - Limpa e popula novamente a subcoleção');
      console.log('');
      console.log('💡 Exemplo: node populate-tb-hiv.js populate');
      console.log('🏗️ Estrutura: infoCards/card_10/detalhes/[documentos]');
  }

  process.exit(0);
}

main();