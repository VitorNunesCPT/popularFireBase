const { db } = require('./firebase-config');
const {
  usuarioTeste,
  medicamentosExemplo,
  sintomasExemplo,
  registrosDoseExemplo,
} = require('./data/usuarios-exemplo-data');

// ==================== FUNÇÕES DE USUÁRIO ====================

/**
 * Cria um usuário de teste com todas as subcoleções populadas
 */
async function createUserWithData() {
  try {
    console.log('🔄 Criando usuário de teste com dados completos...\n');

    // Define o ID do usuário de teste
    const userId = 'usuario_teste_001';
    const userRef = db.collection('users').doc(userId);

    // Cria o documento do usuário
    await userRef.set({
      ...usuarioTeste,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });

    console.log('✅ Usuário criado:', userId);
    console.log(`   Nome: ${usuarioTeste.nome}`);
    console.log(`   Email: ${usuarioTeste.email}\n`);

    // Popula medicamentos
    console.log('📋 Populando medicamentos...');
    const batch1 = db.batch();
    medicamentosExemplo.forEach((med) => {
      const medRef = userRef.collection('medicamentos').doc(med.id);
      const { id, ...medData } = med;
      batch1.set(medRef, {
        ...medData,
        dataInicio: new Date(medData.dataInicio),
        dataFim: medData.dataFim ? new Date(medData.dataFim) : null,
        criadoEm: new Date(),
      });
    });
    await batch1.commit();
    console.log(`✅ ${medicamentosExemplo.length} medicamentos adicionados\n`);

    // Popula sintomas
    console.log('📋 Populando sintomas...');
    const batch2 = db.batch();
    sintomasExemplo.forEach((sint) => {
      const sintRef = userRef.collection('sintomas').doc(sint.id);
      const { id, ...sintData } = sint;
      batch2.set(sintRef, {
        ...sintData,
        data: new Date(sintData.data),
        criadoEm: new Date(sintData.criadoEm),
      });
    });
    await batch2.commit();
    console.log(`✅ ${sintomasExemplo.length} sintomas registrados\n`);

    // Popula registros de dose
    console.log('📋 Populando registros de dose...');
    const batch3 = db.batch();
    registrosDoseExemplo.forEach((reg) => {
      const regRef = userRef.collection('registrosDeDose').doc(reg.id);
      const { id, ...regData } = reg;
      batch3.set(regRef, {
        ...regData,
        medicamentoRef: `/users/${userId}/medicamentos/${regData.medicamentoRef}`,
        horarioAgendado: new Date(regData.horarioAgendado),
        horarioTomado: regData.horarioTomado ? new Date(regData.horarioTomado) : null,
      });
    });
    await batch3.commit();
    console.log(`✅ ${registrosDoseExemplo.length} registros de dose adicionados\n`);

    console.log('🎉 Usuário completo criado com sucesso!');
    console.log(`\n📊 Resumo:`);
    console.log(`   - Usuário: ${userId}`);
    console.log(`   - Medicamentos: ${medicamentosExemplo.length}`);
    console.log(`   - Sintomas: ${sintomasExemplo.length}`);
    console.log(`   - Registros: ${registrosDoseExemplo.length}`);
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
  }
}

/**
 * Lista todos os usuários
 */
async function listUsers() {
  try {
    console.log('📋 Listando todos os usuários...\n');

    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum usuário encontrado.');
      return;
    }

    console.log(`✅ ${snapshot.size} usuário(s) encontrado(s):\n`);

    for (const doc of snapshot.docs) {
      const data = doc.data();
      console.log(`📌 ID: ${doc.id}`);
      console.log(`   Nome: ${data.nome}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Telefone: ${data.telefone || 'Não informado'}`);

      // Conta subcoleções
      const medCount = (await doc.ref.collection('medicamentos').get()).size;
      const sintCount = (await doc.ref.collection('sintomas').get()).size;
      const regCount = (await doc.ref.collection('registrosDeDose').get()).size;

      console.log(`   Medicamentos: ${medCount}`);
      console.log(`   Sintomas: ${sintCount}`);
      console.log(`   Registros: ${regCount}`);
      console.log('');
    }
  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error);
  }
}

/**
 * Exibe detalhes completos de um usuário
 */
async function getUserDetails(userId = 'usuario_teste_001') {
  try {
    console.log(`🔍 Buscando detalhes do usuário: ${userId}\n`);

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const userData = userDoc.data();
    console.log('👤 DADOS DO USUÁRIO:');
    console.log(`   Nome: ${userData.nome}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Data Nascimento: ${userData.dataNascimento}`);
    console.log(`   Telefone: ${userData.telefone}\n`);

    // Lista medicamentos
    console.log('💊 MEDICAMENTOS:');
    const medSnapshot = await userDoc.ref.collection('medicamentos').orderBy('criadoEm').get();
    if (medSnapshot.empty) {
      console.log('   (nenhum medicamento cadastrado)\n');
    } else {
      medSnapshot.forEach((doc, index) => {
        const med = doc.data();
        console.log(`   ${index + 1}. ${med.nome} - ${med.dosagem}`);
        console.log(`      Frequência: ${med.frequencia}`);
        console.log(`      Horários: ${med.horarios.join(', ')}`);
        console.log(`      Período: ${med.dataInicio.toDate().toLocaleDateString('pt-BR')} até ${med.dataFim ? med.dataFim.toDate().toLocaleDateString('pt-BR') : 'indeterminado'}`);
      });
      console.log('');
    }

    // Lista sintomas
    console.log('🩺 SINTOMAS REGISTRADOS:');
    const sintSnapshot = await userDoc.ref.collection('sintomas').orderBy('data', 'desc').get();
    if (sintSnapshot.empty) {
      console.log('   (nenhum sintoma registrado)\n');
    } else {
      sintSnapshot.forEach((doc, index) => {
        const sint = doc.data();
        console.log(`   ${index + 1}. ${sint.data.toDate().toLocaleDateString('pt-BR')} - Intensidade: ${sint.intensidade}`);
        console.log(`      ${sint.descricao}`);
        if (sint.observacoes) {
          console.log(`      Obs: ${sint.observacoes}`);
        }
      });
      console.log('');
    }

    // Lista registros de dose
    console.log('📝 REGISTROS DE MEDICAÇÃO (últimos 10):');
    const regSnapshot = await userDoc.ref
      .collection('registrosDeDose')
      .orderBy('horarioAgendado', 'desc')
      .limit(10)
      .get();

    if (regSnapshot.empty) {
      console.log('   (nenhum registro encontrado)\n');
    } else {
      regSnapshot.forEach((doc, index) => {
        const reg = doc.data();
        const statusIcon = reg.status === 'tomado' ? '✅' : '❌';
        const agendado = reg.horarioAgendado.toDate();
        const tomado = reg.horarioTomado ? reg.horarioTomado.toDate() : null;

        console.log(`   ${index + 1}. ${statusIcon} ${reg.nomeMedicamento} - ${reg.dosagem}`);
        console.log(`      Agendado: ${agendado.toLocaleString('pt-BR')}`);
        if (tomado) {
          console.log(`      Tomado: ${tomado.toLocaleString('pt-BR')}`);
        } else {
          console.log(`      Status: Pulado`);
        }
      });
      console.log('');
    }

    // Estatísticas
    const totalRegistros = (await userDoc.ref.collection('registrosDeDose').get()).size;
    const tomados = (
      await userDoc.ref.collection('registrosDeDose').where('status', '==', 'tomado').get()
    ).size;
    const pulados = totalRegistros - tomados;
    const aderencia = totalRegistros > 0 ? ((tomados / totalRegistros) * 100).toFixed(1) : 0;

    console.log('📊 ESTATÍSTICAS:');
    console.log(`   Total de registros: ${totalRegistros}`);
    console.log(`   Doses tomadas: ${tomados}`);
    console.log(`   Doses puladas: ${pulados}`);
    console.log(`   Taxa de adesão: ${aderencia}%`);
  } catch (error) {
    console.error('❌ Erro ao buscar detalhes do usuário:', error);
  }
}

/**
 * Remove todos os usuários
 */
async function clearAllUsers() {
  try {
    console.log('🗑️  Removendo todos os usuários...\n');

    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum usuário para remover.');
      return;
    }

    let totalDeleted = 0;

    for (const userDoc of snapshot.docs) {
      console.log(`   Removendo usuário: ${userDoc.id}...`);

      // Remove subcoleções
      const medSnapshot = await userDoc.ref.collection('medicamentos').get();
      const medBatch = db.batch();
      medSnapshot.docs.forEach((doc) => medBatch.delete(doc.ref));
      await medBatch.commit();

      const sintSnapshot = await userDoc.ref.collection('sintomas').get();
      const sintBatch = db.batch();
      sintSnapshot.docs.forEach((doc) => sintBatch.delete(doc.ref));
      await sintBatch.commit();

      const regSnapshot = await userDoc.ref.collection('registrosDeDose').get();
      const regBatch = db.batch();
      regSnapshot.docs.forEach((doc) => regBatch.delete(doc.ref));
      await regBatch.commit();

      // Remove o usuário
      await userDoc.ref.delete();
      totalDeleted++;
    }

    console.log(`\n✅ ${totalDeleted} usuário(s) removido(s) com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao remover usuários:', error);
  }
}

// ==================== FUNÇÕES DE MEDICAMENTO ====================

/**
 * Adiciona um medicamento a um usuário
 */
async function addMedicamento(userId, medicamentoData) {
  try {
    console.log(`💊 Adicionando medicamento ao usuário ${userId}...\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const medRef = userRef.collection('medicamentos').doc();
    await medRef.set({
      ...medicamentoData,
      dataInicio: new Date(medicamentoData.dataInicio),
      dataFim: medicamentoData.dataFim ? new Date(medicamentoData.dataFim) : null,
      criadoEm: new Date(),
    });

    console.log('✅ Medicamento adicionado com sucesso!');
    console.log(`   ID: ${medRef.id}`);
    console.log(`   Nome: ${medicamentoData.nome}`);
    console.log(`   Dosagem: ${medicamentoData.dosagem}`);
  } catch (error) {
    console.error('❌ Erro ao adicionar medicamento:', error);
  }
}

/**
 * Lista medicamentos de um usuário
 */
async function listMedicamentos(userId = 'usuario_teste_001') {
  try {
    console.log(`💊 Medicamentos do usuário ${userId}:\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const snapshot = await userRef.collection('medicamentos').orderBy('criadoEm').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum medicamento encontrado.');
      return;
    }

    console.log(`✅ ${snapshot.size} medicamento(s) encontrado(s):\n`);

    snapshot.forEach((doc, index) => {
      const med = doc.data();
      console.log(`${index + 1}. ${med.nome} - ${med.dosagem}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Frequência: ${med.frequencia}`);
      console.log(`   Horários: ${med.horarios.join(', ')}`);
      console.log(`   Início: ${med.dataInicio.toDate().toLocaleDateString('pt-BR')}`);
      console.log(
        `   Fim: ${med.dataFim ? med.dataFim.toDate().toLocaleDateString('pt-BR') : 'Indeterminado'}`
      );
      if (med.observacoes) {
        console.log(`   Obs: ${med.observacoes}`);
      }
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro ao listar medicamentos:', error);
  }
}

// ==================== FUNÇÕES DE SINTOMA ====================

/**
 * Adiciona um sintoma a um usuário
 */
async function addSintoma(userId, sintomaData) {
  try {
    console.log(`🩺 Adicionando sintoma ao usuário ${userId}...\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const sintRef = userRef.collection('sintomas').doc();
    await sintRef.set({
      ...sintomaData,
      data: new Date(sintomaData.data),
      criadoEm: new Date(),
    });

    console.log('✅ Sintoma registrado com sucesso!');
    console.log(`   ID: ${sintRef.id}`);
    console.log(`   Data: ${sintomaData.data}`);
    console.log(`   Intensidade: ${sintomaData.intensidade}`);
  } catch (error) {
    console.error('❌ Erro ao adicionar sintoma:', error);
  }
}

/**
 * Lista sintomas de um usuário
 */
async function listSintomas(userId = 'usuario_teste_001') {
  try {
    console.log(`🩺 Sintomas do usuário ${userId}:\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const snapshot = await userRef.collection('sintomas').orderBy('data', 'desc').get();

    if (snapshot.empty) {
      console.log('❌ Nenhum sintoma encontrado.');
      return;
    }

    console.log(`✅ ${snapshot.size} sintoma(s) encontrado(s):\n`);

    snapshot.forEach((doc, index) => {
      const sint = doc.data();
      console.log(`${index + 1}. ${sint.data.toDate().toLocaleDateString('pt-BR')}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Intensidade: ${sint.intensidade}`);
      console.log(`   Descrição: ${sint.descricao}`);
      if (sint.observacoes) {
        console.log(`   Observações: ${sint.observacoes}`);
      }
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro ao listar sintomas:', error);
  }
}

// ==================== FUNÇÕES DE REGISTRO DE DOSE ====================

/**
 * Adiciona um registro de dose a um usuário
 */
async function addRegistroDose(userId, registroData) {
  try {
    console.log(`📝 Adicionando registro de dose ao usuário ${userId}...\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const regRef = userRef.collection('registrosDeDose').doc();
    await regRef.set({
      ...registroData,
      medicamentoRef: `/users/${userId}/medicamentos/${registroData.medicamentoRef}`,
      horarioAgendado: new Date(registroData.horarioAgendado),
      horarioTomado: registroData.horarioTomado ? new Date(registroData.horarioTomado) : null,
    });

    console.log('✅ Registro adicionado com sucesso!');
    console.log(`   ID: ${regRef.id}`);
    console.log(`   Medicamento: ${registroData.nomeMedicamento}`);
    console.log(`   Status: ${registroData.status}`);
  } catch (error) {
    console.error('❌ Erro ao adicionar registro:', error);
  }
}

/**
 * Lista registros de dose de um usuário
 */
async function listRegistros(userId = 'usuario_teste_001', limit = 20) {
  try {
    console.log(`📝 Registros de dose do usuário ${userId} (últimos ${limit}):\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return;
    }

    const snapshot = await userRef
      .collection('registrosDeDose')
      .orderBy('horarioAgendado', 'desc')
      .limit(limit)
      .get();

    if (snapshot.empty) {
      console.log('❌ Nenhum registro encontrado.');
      return;
    }

    console.log(`✅ ${snapshot.size} registro(s) encontrado(s):\n`);

    snapshot.forEach((doc, index) => {
      const reg = doc.data();
      const statusIcon = reg.status === 'tomado' ? '✅' : '❌';

      console.log(`${index + 1}. ${statusIcon} ${reg.nomeMedicamento} - ${reg.dosagem}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Agendado: ${reg.horarioAgendado.toDate().toLocaleString('pt-BR')}`);
      if (reg.horarioTomado) {
        console.log(`   Tomado: ${reg.horarioTomado.toDate().toLocaleString('pt-BR')}`);
      } else {
        console.log(`   Status: Pulado`);
      }
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro ao listar registros:', error);
  }
}

// ==================== FUNÇÃO PRINCIPAL ====================

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const userId = args[1] || 'usuario_teste_001';

  switch (command) {
    case 'create':
      await createUserWithData();
      break;

    case 'list':
      await listUsers();
      break;

    case 'details':
      await getUserDetails(userId);
      break;

    case 'clear':
      await clearAllUsers();
      break;

    case 'reset':
      await clearAllUsers();
      await createUserWithData();
      break;

    case 'list-medicamentos':
      await listMedicamentos(userId);
      break;

    case 'list-sintomas':
      await listSintomas(userId);
      break;

    case 'list-registros':
      const limit = parseInt(args[2]) || 20;
      await listRegistros(userId, limit);
      break;

    default:
      console.log('📖 Comandos disponíveis para gerenciar usuários e subcoleções:\n');
      console.log('USUÁRIOS:');
      console.log('  node populate-usuarios.js create');
      console.log('      → Cria usuário de teste com dados completos\n');
      console.log('  node populate-usuarios.js list');
      console.log('      → Lista todos os usuários\n');
      console.log('  node populate-usuarios.js details [userId]');
      console.log('      → Exibe detalhes completos de um usuário\n');
      console.log('  node populate-usuarios.js clear');
      console.log('      → Remove todos os usuários e suas subcoleções\n');
      console.log('  node populate-usuarios.js reset');
      console.log('      → Limpa tudo e recria usuário de teste\n');
      console.log('SUBCOLEÇÕES:');
      console.log('  node populate-usuarios.js list-medicamentos [userId]');
      console.log('      → Lista medicamentos do usuário\n');
      console.log('  node populate-usuarios.js list-sintomas [userId]');
      console.log('      → Lista sintomas do usuário\n');
      console.log('  node populate-usuarios.js list-registros [userId] [limit]');
      console.log('      → Lista registros de dose do usuário\n');
      console.log('📌 Nota: Se userId não for especificado, usa "usuario_teste_001"');
  }

  process.exit(0);
}

main();
