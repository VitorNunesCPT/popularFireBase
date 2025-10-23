# Perguntas Frequentes (FAQ)

## 📚 Índice
- [Geral](#geral)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Firebase](#firebase)
- [Estrutura de Dados](#estrutura-de-dados)
- [Performance](#performance)
- [Segurança](#segurança)

---

## Geral

### P: O que é este projeto?
**R:** É um sistema backend para um aplicativo de acompanhamento de tratamento de tuberculose, usando Firebase/Firestore. Inclui scripts de população de dados e funções prontas para integração com apps móveis.

### P: Para quem é este projeto?
**R:** Desenvolvedores que precisam criar um app de acompanhamento médico, especificamente para tuberculose, usando Firebase como backend.

### P: Preciso saber Firebase para usar?
**R:** Conhecimento básico ajuda, mas os scripts e funções já estão prontos. Siga o guia [SETUP.md](./SETUP.md) passo a passo.

### P: Qual tecnologia frontend posso usar?
**R:** Qualquer uma que suporte Firebase: React Native, Flutter, Vue, React, Angular, etc.

---

## Configuração

### P: Onde consigo o serviceAccountKey.json?
**R:**
1. Firebase Console → Configurações do projeto
2. Aba "Contas de serviço"
3. "Gerar nova chave privada"
4. Baixar e renomear para `serviceAccountKey.json`

### P: O serviceAccountKey.json deve ser commitado no Git?
**R:** **NÃO!** Nunca commite este arquivo. Ele já está no `.gitignore`.

### P: Erro "Cannot find module 'firebase-admin'"?
**R:** Execute `npm install` na raiz do projeto.

### P: Posso usar Firebase gratuito?
**R:** Sim! O plano Spark (gratuito) é suficiente para desenvolvimento e pequena escala.

---

## Desenvolvimento

### P: Como testo sem criar usuários reais?
**R:** Use `npm run user:create` para criar usuário de teste com dados fictícios.

### P: Posso modificar a estrutura de dados?
**R:** Sim, mas você precisará atualizar:
- Arquivos em `/data`
- Scripts `populate-*.js`
- Funções em `auth-integration.js`
- Regras do Firestore

### P: Como limpo os dados de teste?
**R:**
```bash
npm run user:clear        # Limpar usuários
npm run clear:infocards   # Limpar infoCards
```

### P: Como adiciono um novo campo ao perfil do usuário?
**R:**
1. Adicione em `auth-integration.js` na função `createUserProfile`
2. Atualize `data/usuarios-exemplo-data.js`
3. Execute `npm run user:reset` para recriar

---

## Firebase

### P: Qual a diferença entre Authentication e Firestore?
**R:**
- **Authentication:** Gerencia login/senha, gera UID
- **Firestore:** Armazena dados (perfis, medicamentos, etc)
- **Conexão:** UID do Auth é usado como chave no Firestore

### P: Por que usar subcoleções ao invés de arrays?
**R:**
- **Escalabilidade:** Arrays têm limite de 1MB por documento
- **Queries:** Subcoleções permitem queries complexas
- **Performance:** Buscar 1 item de 1000 é mais rápido em subcoleção

### P: O que é denormalização?
**R:** Duplicar dados para evitar JOINs. Exemplo: guardar `nomeMedicamento` em `registrosDeDose` ao invés de apenas a referência.

### P: Firestore cobra por quê?
**R:** Por operação (leitura, escrita, exclusão). Denormalização reduz leituras = reduz custo.

---

## Estrutura de Dados

### P: Por que `medicamentoRef` é string e não referência?
**R:** Por compatibilidade com diferentes SDKs. Você pode converter:
```javascript
// String para referência
const ref = db.doc(medicamentoRefString);

// Referência para string
const str = medicamentoRef.path;
```

### P: Como guardo hora sem data?
**R:** Guarde como string "HH:MM" no campo `horarios`. Para criar Timestamp completo:
```javascript
const [hora, min] = "08:00".split(':');
const timestamp = new Date();
timestamp.setHours(hora, min, 0, 0);
```

### P: Posso ter medicamentos com frequência semanal?
**R:** Sim! Campo `frequencia` suporta "diaria", "semanal", "personalizada". Implemente a lógica no app.

### P: Como funciona o calendário de sintomas?
**R:** Query todos os sintomas do mês, agrupe por dia, destaque dias com sintomas. Veja [DIAGRAMAS.md](./DIAGRAMAS.md) seção 9.

---

## Performance

### P: Quantas leituras consome carregar a tela de lembretes?
**R:** Depende:
- Buscar medicamentos: 5 leituras (se tiver 5 medicamentos)
- Verificar registros do dia: ~10 leituras (se tiver 10 horários)
- **Total:** ~15 leituras por carregamento

### P: Como reduzir custo de leituras?
**R:**
1. **Cache local:** Guardar dados no AsyncStorage
2. **Listeners em tempo real:** Só atualiza quando mudar
3. **Paginação:** Limitar queries com `.limit()`

### P: Posso usar cache offline?
**R:** Sim! Firestore tem cache automático:
```javascript
// Habilitar persistência (React Native)
await firestore().settings({ persistence: true });
```

---

## Segurança

### P: Como impeço usuários de ver dados de outros?
**R:** Com Firestore Rules:
```javascript
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
```

### P: Usuário não autenticado pode ver InfoCards?
**R:** Sim, é conteúdo público. Regra:
```javascript
match /infoCards/{cardId} {
  allow read: if true;  // Qualquer um pode ler
  allow write: if false; // Ninguém pode escrever
}
```

### P: Como protejo dados sensíveis?
**R:**
- **No transporte:** Firebase usa HTTPS automático
- **Em repouso:** Firebase criptografa automático
- **No código:** Nunca logue dados sensíveis

### P: Posso ter role-based access (admin, médico, paciente)?
**R:** Sim! Adicione campo `role` no perfil:
```javascript
match /users/{userId} {
  allow read: if request.auth.uid == userId;
  allow write: if request.auth.uid == userId
    || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

---

## Dúvidas Técnicas

### P: Como faço upload de foto de perfil?
**R:** Use Firebase Storage:
```javascript
import storage from '@react-native-firebase/storage';

const reference = storage().ref(`users/${userId}/profile.jpg`);
await reference.putFile(localPath);
const url = await reference.getDownloadURL();

// Salvar URL no Firestore
await updateUserProfile(userId, { fotoURL: url });
```

### P: Como implemento notificações push?
**R:** Use Firebase Cloud Messaging:
1. Salve FCM token no perfil do usuário
2. Use Cloud Functions para enviar notificações
3. Veja: https://rnfirebase.io/messaging/usage

### P: Como exporto dados do usuário (LGPD/GDPR)?
**R:**
```javascript
async function exportUserData(userId) {
  const profile = await getUserProfile(userId);
  const meds = await db.collection(`users/${userId}/medicamentos`).get();
  const sintomas = await db.collection(`users/${userId}/sintomas`).get();

  return {
    profile,
    medicamentos: meds.docs.map(d => d.data()),
    sintomas: sintomas.docs.map(d => d.data())
  };
}
```

### P: Posso adicionar dashboard para médicos?
**R:** Sim! Crie coleção `/medicos` e `/medicos/{medicoId}/pacientes` com referências. Use regras para controlar acesso.

---

## Troubleshooting

### P: "Permission denied" ao tentar ler dados
**R:** Verifique:
1. Usuário está autenticado (`user.uid` existe?)
2. Regras do Firestore permitem acesso
3. Path está correto

### P: Dados não aparecem em tempo real
**R:** Use listeners ao invés de `get()`:
```javascript
// ❌ Não atualiza
const snapshot = await db.collection('users').doc(userId).get();

// ✅ Atualiza em tempo real
const unsubscribe = db
  .collection('users')
  .doc(userId)
  .onSnapshot(doc => {
    console.log('Dados atualizados:', doc.data());
  });
```

### P: App fica lento ao carregar muitos dados
**R:**
1. Use paginação: `.limit(20)` + `.startAfter(lastDoc)`
2. Implemente "lazy loading"
3. Use cache local
4. Otimize queries (indexes)

### P: Como debugo queries do Firestore?
**R:**
```javascript
// Habilitar logs
firebase.firestore.setLogLevel('debug');

// Ver tempo de execução
console.time('query');
await db.collection('users').get();
console.timeEnd('query');
```

---

## Roadmap & Features

### P: Vai ter versão com notificações?
**R:** Está no roadmap! Fase 3 do projeto.

### P: Posso contribuir com código?
**R:** Sim! Veja [CONTRIBUTING.md](./CONTRIBUTING.md).

### P: Tem suporte para múltiplos idiomas?
**R:** Ainda não, mas os dados estão em PT-BR. Internacionalização pode ser adicionada.

### P: Funciona offline?
**R:** Parcialmente. Firebase tem cache offline, mas algumas operações requerem conexão.

---

## Mais Ajuda

- 📖 **Documentação:** Veja outros arquivos `.md` neste repositório
- 🐛 **Bugs:** [Abra uma issue](https://github.com/seu-usuario/popularFireBase/issues)
- 💬 **Dúvidas:** [GitHub Discussions](https://github.com/seu-usuario/popularFireBase/discussions)
- 📧 **Contato:** suporte@projeto.com.br

---

**Não encontrou sua pergunta?** [Abra uma issue](https://github.com/seu-usuario/popularFireBase/issues/new) e a adicionaremos aqui!
