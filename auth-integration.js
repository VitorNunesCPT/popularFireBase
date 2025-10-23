/**
 * auth-integration.js
 *
 * Este arquivo contém funções para integrar Firebase Authentication com a estrutura
 * de usuários no Firestore. Use estas funções no seu aplicativo (React Native, Flutter, Web)
 * para criar automaticamente o perfil do usuário quando ele se registra.
 */

const { db } = require('./firebase-config');

/**
 * Cria o perfil do usuário no Firestore após registro via Authentication
 *
 * QUANDO USAR: Chame esta função imediatamente após criar o usuário no Authentication
 * (após signUp com email/senha, Google, etc)
 *
 * @param {string} userId - UID do usuário vindo do Authentication (user.uid)
 * @param {object} userData - Dados do usuário para criar o perfil
 * @param {string} userData.nome - Nome completo do usuário
 * @param {string} userData.email - Email do usuário
 * @param {string} [userData.telefone] - Telefone (opcional)
 * @param {string} [userData.dataNascimento] - Data de nascimento no formato YYYY-MM-DD (opcional)
 * @param {string} [userData.fotoURL] - URL da foto de perfil (opcional, vem do Auth)
 *
 * @returns {Promise<void>}
 *
 * @example
 * // No seu app, após o registro:
 * const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 * await createUserProfile(userCredential.user.uid, {
 *   nome: "João Silva",
 *   email: userCredential.user.email,
 *   telefone: "+55 11 98765-4321",
 *   dataNascimento: "1985-03-15"
 * });
 */
async function createUserProfile(userId, userData) {
  try {
    console.log(`📝 Criando perfil do usuário ${userId} no Firestore...`);

    const userRef = db.collection('users').doc(userId);

    // Verifica se o usuário já existe
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      console.log('⚠️  Usuário já existe no Firestore. Atualizando dados...');
      await userRef.update({
        ...userData,
        atualizadoEm: new Date(),
      });
      console.log('✅ Perfil atualizado com sucesso!');
      return;
    }

    // Cria o perfil do usuário
    await userRef.set({
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone || null,
      dataNascimento: userData.dataNascimento || null,
      fotoURL: userData.fotoURL || null,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });

    console.log('✅ Perfil criado com sucesso!');
    console.log(`   - Nome: ${userData.nome}`);
    console.log(`   - Email: ${userData.email}`);

    // As subcoleções (medicamentos, sintomas, registrosDeDose) serão criadas conforme o usuário usar o app
    // Não precisamos criar documentos vazios nelas

  } catch (error) {
    console.error('❌ Erro ao criar perfil do usuário:', error);
    throw error; // Relança o erro para o app tratar
  }
}

/**
 * Busca o perfil completo do usuário
 *
 * @param {string} userId - UID do usuário
 * @returns {Promise<object|null>} Dados do usuário ou null se não existir
 */
async function getUserProfile(userId) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      console.log('❌ Usuário não encontrado.');
      return null;
    }

    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  } catch (error) {
    console.error('❌ Erro ao buscar perfil do usuário:', error);
    throw error;
  }
}

/**
 * Atualiza o perfil do usuário
 *
 * @param {string} userId - UID do usuário
 * @param {object} updates - Campos a serem atualizados
 * @returns {Promise<void>}
 */
async function updateUserProfile(userId, updates) {
  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.update({
      ...updates,
      atualizadoEm: new Date(),
    });

    console.log('✅ Perfil atualizado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil:', error);
    throw error;
  }
}

/**
 * Remove o perfil do usuário e TODAS as suas subcoleções
 * ATENÇÃO: Esta operação é irreversível!
 *
 * @param {string} userId - UID do usuário
 * @returns {Promise<void>}
 */
async function deleteUserProfile(userId) {
  try {
    console.log(`🗑️  Removendo perfil do usuário ${userId}...`);

    const userRef = db.collection('users').doc(userId);

    // Remove subcoleção de medicamentos
    const medSnapshot = await userRef.collection('medicamentos').get();
    const medBatch = db.batch();
    medSnapshot.docs.forEach((doc) => medBatch.delete(doc.ref));
    await medBatch.commit();
    console.log('   ✅ Medicamentos removidos');

    // Remove subcoleção de sintomas
    const sintSnapshot = await userRef.collection('sintomas').get();
    const sintBatch = db.batch();
    sintSnapshot.docs.forEach((doc) => sintBatch.delete(doc.ref));
    await sintBatch.commit();
    console.log('   ✅ Sintomas removidos');

    // Remove subcoleção de registros de dose
    const regSnapshot = await userRef.collection('registrosDeDose').get();
    const regBatch = db.batch();
    regSnapshot.docs.forEach((doc) => regBatch.delete(doc.ref));
    await regBatch.commit();
    console.log('   ✅ Registros de dose removidos');

    // Remove o documento do usuário
    await userRef.delete();
    console.log('   ✅ Perfil removido');

    console.log('✅ Usuário completamente removido do Firestore!');
  } catch (error) {
    console.error('❌ Erro ao remover usuário:', error);
    throw error;
  }
}

// ==================== FUNÇÕES DE MEDICAMENTO ====================

/**
 * Adiciona um medicamento ao usuário
 *
 * @param {string} userId - UID do usuário
 * @param {object} medicamentoData - Dados do medicamento
 * @returns {Promise<string>} ID do medicamento criado
 *
 * @example
 * await addMedicamento(userId, {
 *   nome: "Rifampicina",
 *   dosagem: "600mg",
 *   frequencia: "diaria",
 *   horarios: ["08:00", "20:00"],
 *   observacoes: "Tomar com alimentos",
 *   dataInicio: new Date("2025-10-01"),
 *   dataFim: new Date("2026-04-01")
 * });
 */
async function addMedicamento(userId, medicamentoData) {
  try {
    const userRef = db.collection('users').doc(userId);
    const medRef = userRef.collection('medicamentos').doc();

    await medRef.set({
      nome: medicamentoData.nome,
      dosagem: medicamentoData.dosagem,
      frequencia: medicamentoData.frequencia || 'diaria',
      horarios: medicamentoData.horarios || [],
      observacoes: medicamentoData.observacoes || '',
      dataInicio: medicamentoData.dataInicio || new Date(),
      dataFim: medicamentoData.dataFim || null,
      criadoEm: new Date(),
    });

    console.log('✅ Medicamento adicionado:', medRef.id);
    return medRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar medicamento:', error);
    throw error;
  }
}

/**
 * Adiciona um sintoma ao usuário
 *
 * @param {string} userId - UID do usuário
 * @param {object} sintomaData - Dados do sintoma
 * @returns {Promise<string>} ID do sintoma criado
 *
 * @example
 * await addSintoma(userId, {
 *   data: new Date(),
 *   descricao: "Tosse seca, febre",
 *   intensidade: "media",
 *   observacoes: "Piorou durante a noite"
 * });
 */
async function addSintoma(userId, sintomaData) {
  try {
    const userRef = db.collection('users').doc(userId);
    const sintRef = userRef.collection('sintomas').doc();

    await sintRef.set({
      data: sintomaData.data || new Date(),
      descricao: sintomaData.descricao,
      intensidade: sintomaData.intensidade || 'media', // baixa, media, alta
      observacoes: sintomaData.observacoes || '',
      criadoEm: new Date(),
    });

    console.log('✅ Sintoma registrado:', sintRef.id);
    return sintRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar sintoma:', error);
    throw error;
  }
}

/**
 * Registra uma dose de medicamento (tomado ou pulado)
 *
 * @param {string} userId - UID do usuário
 * @param {object} registroData - Dados do registro
 * @returns {Promise<string>} ID do registro criado
 *
 * @example
 * // Quando o usuário marca que tomou:
 * await addRegistroDose(userId, {
 *   medicamentoId: "med_001",
 *   nomeMedicamento: "Rifampicina",
 *   dosagem: "600mg",
 *   horarioAgendado: new Date("2025-10-23T08:00:00"),
 *   horarioTomado: new Date(), // agora
 *   status: "tomado"
 * });
 *
 * // Quando o usuário marca que pulou:
 * await addRegistroDose(userId, {
 *   medicamentoId: "med_001",
 *   nomeMedicamento: "Rifampicina",
 *   dosagem: "600mg",
 *   horarioAgendado: new Date("2025-10-23T20:00:00"),
 *   horarioTomado: null,
 *   status: "pulado"
 * });
 */
async function addRegistroDose(userId, registroData) {
  try {
    const userRef = db.collection('users').doc(userId);
    const regRef = userRef.collection('registrosDeDose').doc();

    await regRef.set({
      medicamentoRef: `/users/${userId}/medicamentos/${registroData.medicamentoId}`,
      nomeMedicamento: registroData.nomeMedicamento,
      dosagem: registroData.dosagem,
      horarioAgendado: registroData.horarioAgendado,
      horarioTomado: registroData.horarioTomado || null,
      status: registroData.status, // "tomado" ou "pulado"
    });

    console.log('✅ Registro de dose criado:', regRef.id);
    return regRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar registro de dose:', error);
    throw error;
  }
}

// ==================== EXPORTS ====================

module.exports = {
  // Gerenciamento de perfil
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,

  // Subcoleções
  addMedicamento,
  addSintoma,
  addRegistroDose,
};

// ==================== EXEMPLOS DE USO ====================

/**
 * EXEMPLO 1: Registro de novo usuário (no seu app)
 *
 * // No seu React Native / Flutter / Web app:
 * import { createUserWithEmailAndPassword } from 'firebase/auth';
 * import { createUserProfile } from './auth-integration';
 *
 * async function handleSignUp(email, password, nome) {
 *   try {
 *     // 1. Cria no Authentication
 *     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 *
 *     // 2. Cria perfil no Firestore
 *     await createUserProfile(userCredential.user.uid, {
 *       nome: nome,
 *       email: email,
 *       telefone: null, // preencher depois no perfil
 *       dataNascimento: null
 *     });
 *
 *     console.log('✅ Usuário criado com sucesso!');
 *     // Redirecionar para home/onboarding
 *   } catch (error) {
 *     console.error('Erro no registro:', error);
 *   }
 * }
 */

/**
 * EXEMPLO 2: Login com Google (cria perfil se não existir)
 *
 * async function handleGoogleSignIn() {
 *   try {
 *     const result = await signInWithPopup(auth, googleProvider);
 *     const user = result.user;
 *
 *     // Verifica se já tem perfil no Firestore
 *     const profile = await getUserProfile(user.uid);
 *
 *     if (!profile) {
 *       // Primeira vez, cria o perfil
 *       await createUserProfile(user.uid, {
 *         nome: user.displayName,
 *         email: user.email,
 *         fotoURL: user.photoURL
 *       });
 *     }
 *
 *     // Usuário autenticado e com perfil criado
 *   } catch (error) {
 *     console.error('Erro no login:', error);
 *   }
 * }
 */

/**
 * EXEMPLO 3: Adicionar medicamento na tela "Novo Lembrete"
 *
 * async function handleAddMedicamento(userId, formData) {
 *   await addMedicamento(userId, {
 *     nome: formData.nomeMedicamento,
 *     dosagem: formData.dosagem,
 *     frequencia: "diaria",
 *     horarios: formData.horarios, // ["08:00", "20:00"]
 *     observacoes: formData.observacoes,
 *     dataInicio: new Date(),
 *     dataFim: null // tratamento contínuo
 *   });
 * }
 */

/**
 * EXEMPLO 4: Registrar sintoma na tela "Registrar Sintoma"
 *
 * async function handleAddSintoma(userId, formData) {
 *   await addSintoma(userId, {
 *     data: new Date(), // ou data selecionada pelo usuário
 *     descricao: formData.descricao,
 *     intensidade: formData.intensidade, // "baixa", "media", "alta"
 *     observacoes: formData.observacoes
 *   });
 * }
 */

/**
 * EXEMPLO 5: Marcar medicamento como tomado
 *
 * async function handleMarkAsTaken(userId, medicamento, horarioAgendado) {
 *   await addRegistroDose(userId, {
 *     medicamentoId: medicamento.id,
 *     nomeMedicamento: medicamento.nome,
 *     dosagem: medicamento.dosagem,
 *     horarioAgendado: horarioAgendado,
 *     horarioTomado: new Date(), // agora
 *     status: "tomado"
 *   });
 * }
 */
