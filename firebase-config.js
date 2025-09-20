const admin = require('firebase-admin');

// Configuração do Firebase Admin SDK
// Você precisa baixar o arquivo de chave de serviço do Firebase Console
// e colocar o caminho correto aqui
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Substitua por seu project ID do Firebase
  projectId: 'tuberculoseapp-1e360'
});

const db = admin.firestore();

module.exports = { admin, db };