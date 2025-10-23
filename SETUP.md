# Guia de Instalação e Configuração

> **Passo a passo completo para configurar o ambiente de desenvolvimento**

Este guia pressupõe que você está começando do zero. Siga cada passo com atenção.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js (v18 ou superior)

**Verificar se já está instalado:**
```bash
node --version
# Deve mostrar: v18.x.x ou superior
```

**Se não estiver instalado:**
- **Windows/Mac:** [Download do site oficial](https://nodejs.org/)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Mac (via Homebrew):**
  ```bash
  brew install node
  ```

### 2. Git

**Verificar se já está instalado:**
```bash
git --version
# Deve mostrar: git version 2.x.x
```

**Se não estiver instalado:**
- **Windows:** [Download do site oficial](https://git-scm.com/)
- **Mac:** `brew install git`
- **Linux:** `sudo apt-get install git`

### 3. Editor de Código

Recomendamos o **Visual Studio Code**: https://code.visualstudio.com/

**Extensões úteis para VS Code:**
- Firebase (Syntax Highlighting)
- Prettier (Formatação de código)
- ESLint (Linter para JavaScript)
- Markdown Preview Mermaid Support (Para ver diagramas)

---

## 🚀 Passo 1: Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/popularFireBase.git

# Entre na pasta do projeto
cd popularFireBase

# Verifique se está na pasta correta
ls -la
# Deve mostrar: README.md, package.json, firebase-config.js, etc.
```

---

## 📦 Passo 2: Instalar Dependências

```bash
# Instalar todas as dependências do Node.js
npm install

# Aguarde até ver algo como:
# "added 175 packages, and audited 176 packages in 3s"
```

**O que foi instalado?**
- `firebase-admin` - SDK do Firebase para Node.js (backend)
- Dependências secundárias necessárias

---

## 🔥 Passo 3: Configurar Firebase

### 3.1. Criar Projeto no Firebase

1. **Acesse:** https://console.firebase.google.com/
2. **Clique em:** "Adicionar projeto" (ou "Create a project")
3. **Nome do projeto:** `tratamento-tuberculose` (ou o nome que preferir)
4. **Google Analytics:** Pode desabilitar se for apenas para testes
5. **Clique em:** "Criar projeto"
6. **Aguarde:** Firebase criar o projeto (leva ~1 minuto)

### 3.2. Ativar Serviços Necessários

#### A) Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. **Modo de produção** ou **Modo de teste** (escolha "Modo de teste" para começar)
4. **Localização:** Escolha a mais próxima (ex: `southamerica-east1` para São Paulo)
5. Clique em **"Ativar"**

#### B) Authentication

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Começar"**
3. Na aba **"Sign-in method"**, ative:
   - ✅ **Email/Password** (clique em "Ativar" e salve)
   - ✅ **Google** (opcional, para login social)

### 3.3. Gerar Chave de Serviço (Service Account Key)

1. **Clique no ícone de engrenagem** ⚙️ (ao lado de "Visão geral do projeto")
2. Selecione **"Configurações do projeto"**
3. Vá na aba **"Contas de serviço"**
4. Clique em **"Gerar nova chave privada"**
5. **Confirme** clicando em "Gerar chave"
6. Um arquivo JSON será baixado (algo como: `tratamento-tuberculose-a1b2c3d4e5f6.json`)

### 3.4. Configurar o Arquivo de Credenciais

```bash
# Na pasta raiz do projeto, faça:

# 1. Renomeie o arquivo baixado para serviceAccountKey.json
mv ~/Downloads/tratamento-tuberculose-*.json ./serviceAccountKey.json

# 2. Verifique se o arquivo está no lugar certo
ls -la serviceAccountKey.json
# Deve mostrar: serviceAccountKey.json com tamanho ~2.3KB

# 3. IMPORTANTE: Verifique se está no .gitignore
cat .gitignore | grep serviceAccountKey
# Deve mostrar: serviceAccountKey.json
```

**⚠️ ATENÇÃO:** Este arquivo contém credenciais sensíveis! Nunca faça commit dele no Git.

### 3.5. Atualizar firebase-config.js

Abra o arquivo `firebase-config.js` e verifique se está assim:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://SEU-PROJECT-ID.firebaseio.com" // ← Opcional
});

const db = admin.firestore();

module.exports = { db, admin };
```

**Onde encontrar o PROJECT_ID?**
- No Firebase Console, em "Configurações do projeto"
- Ou no próprio arquivo `serviceAccountKey.json`, campo `"project_id"`

---

## ✅ Passo 4: Testar a Configuração

Vamos testar se tudo está funcionando:

```bash
# Teste 1: Verificar sintaxe dos scripts
node -c populate-firestore.js
node -c populate-usuarios.js
node -c auth-integration.js

# Se nenhum erro aparecer, significa que a sintaxe está OK ✅

# Teste 2: Listar infoCards (deve estar vazio)
npm run list:infocards

# Deve mostrar:
# "📋 Listando todos os documentos em infoCards..."
# "❌ Nenhum documento encontrado."

# Teste 3: Popular infoCards com dados de teste
npm run populate:infocards

# Deve mostrar:
# "🔄 Iniciando população do Firestore..."
# "✅ Documento card_1 adicionado!"
# ... (11 cards)
# "🎉 Firestore populado com sucesso!"

# Teste 4: Listar novamente (agora deve ter 11 cards)
npm run list:infocards

# Deve mostrar:
# "✅ 11 documento(s) encontrado(s):"
# "1. Sinais e Sintomas (card_1)"
# ... (11 cards)
```

**🎉 Se chegou até aqui, está tudo funcionando!**

---

## 🧪 Passo 5: Popular Dados de Teste

Agora vamos popular o banco com dados completos:

### 5.1. Popular InfoCards Completo

```bash
# Popular TODOS os infoCards e suas subcoleções
npm run populate:all

# Aguarde... pode levar 30-60 segundos
# Vai popular:
# - 11 infoCards principais
# - ~70 documentos em subcoleções /detalhes
```

### 5.2. Criar Usuário de Teste

```bash
# Criar usuário com medicamentos, sintomas e registros
npm run user:create

# Deve mostrar:
# "🔄 Criando usuário de teste com dados completos..."
# "✅ Usuário criado: usuario_teste_001"
# "📋 Populando medicamentos..."
# "✅ 5 medicamentos adicionados"
# ... etc
```

### 5.3. Verificar no Firebase Console

1. Abra o Firebase Console: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em **"Firestore Database"**
4. Você deve ver:
   ```
   ✅ infoCards (11 documentos)
      ↳ card_1 → detalhes (8 documentos)
      ↳ card_2 → detalhes (7 documentos)
      ... etc

   ✅ users (1 documento)
      ↳ usuario_teste_001
          ↳ medicamentos (5 documentos)
          ↳ sintomas (7 documentos)
          ↳ registrosDeDose (15 documentos)
   ```

---

## 🔍 Passo 6: Explorar os Dados

Agora que tudo está populado, explore:

```bash
# Ver detalhes completos do usuário de teste
npm run user:details

# Deve mostrar:
# - Nome, email, telefone
# - Lista de 5 medicamentos
# - Lista de 7 sintomas
# - Últimos 10 registros de dose
# - Estatísticas de adesão (ex: 80%)

# Ver apenas medicamentos
npm run user:medicamentos

# Ver apenas sintomas
npm run user:sintomas

# Ver registros de dose (últimos 20)
npm run user:registros
```

---

## 🛠️ Passo 7: Comandos Úteis para Desenvolvimento

### Limpar Dados

```bash
# Limpar TUDO (infoCards + usuários)
npm run clear:infocards
npm run user:clear

# Ou limpar e recriar do zero
npm run reset:all      # Reseta infoCards
npm run user:reset     # Reseta usuário de teste
```

### Popular Subcoleções Individuais

```bash
# Popular apenas uma subcoleção específica
npm run populate:sinais        # card_1/detalhes
npm run populate:tratamento    # card_4/detalhes
npm run populate:tb-hiv        # card_10/detalhes
# ... etc (veja package.json para todos os comandos)
```

### Comandos Diretos (sem npm)

```bash
# Se preferir comandos diretos:

# InfoCards
node populate-firestore.js populate
node populate-firestore.js list
node populate-firestore.js clear

# Usuários
node populate-usuarios.js create
node populate-usuarios.js list
node populate-usuarios.js details usuario_teste_001
node populate-usuarios.js list-medicamentos usuario_teste_001
```

---

## 📱 Passo 8: Integrar com seu App

Agora que o backend está pronto, vamos conectar ao app mobile:

### 8.1. Obter Configurações do Firebase (Web/Mobile)

1. No Firebase Console, vá em **"Configurações do projeto"**
2. Role até **"Seus aplicativos"**
3. Clique no ícone correspondente:
   - 📱 **iOS** (se for React Native iOS)
   - 🤖 **Android** (se for React Native Android)
   - 🌐 **Web** (se for app web)

4. Siga as instruções para baixar:
   - **iOS:** `GoogleService-Info.plist`
   - **Android:** `google-services.json`
   - **Web:** Copie o objeto `firebaseConfig`

### 8.2. Copiar Funções para o App

No seu projeto do app (React Native, Flutter, etc):

```bash
# 1. Copie o arquivo de integração
cp /caminho/deste/repo/auth-integration.js /seu/app/src/services/firebase.js

# 2. Adapte os imports conforme seu framework
# Exemplo para React Native:
```

```javascript
// No React Native, trocar:
const { db } = require('./firebase-config');

// Por:
import firestore from '@react-native-firebase/firestore';
const db = firestore();
```

### 8.3. Exemplo de Uso no App

**Tela de Registro:**
```javascript
import { createUserProfile } from './services/firebase';
import auth from '@react-native-firebase/auth';

async function handleSignUp(email, password, nome) {
  try {
    // 1. Criar no Authentication
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // 2. Criar perfil no Firestore
    await createUserProfile(userCredential.user.uid, {
      nome: nome,
      email: email
    });

    console.log('✅ Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

**Tela de Adicionar Medicamento:**
```javascript
import { addMedicamento } from './services/firebase';
import auth from '@react-native-firebase/auth';

async function handleAddMedicamento(formData) {
  const user = auth().currentUser;

  await addMedicamento(user.uid, {
    nome: formData.nome,
    dosagem: formData.dosagem,
    frequencia: 'diaria',
    horarios: formData.horarios,
    dataInicio: new Date()
  });
}
```

---

## 🔐 Passo 9: Configurar Regras de Segurança

No Firebase Console, configure as regras de acesso:

### Firestore Rules

1. Vá em **"Firestore Database"** → aba **"Regras"**
2. Cole as regras abaixo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // InfoCards: Leitura pública, escrita apenas admin
    match /infoCards/{cardId} {
      allow read: if true;
      allow write: if false;

      match /detalhes/{detailId} {
        allow read: if true;
        allow write: if false;
      }
    }

    // Users: Cada usuário acessa apenas seus dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{subcollection}/{docId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```

3. Clique em **"Publicar"**

### Storage Rules (se usar fotos de perfil)

1. Vá em **"Storage"** → aba **"Regras"**
2. Cole as regras:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🧪 Passo 10: Testar no App

Checklist de testes:

- [ ] **Registro:** Criar nova conta
- [ ] **Login:** Entrar com email/senha
- [ ] **Perfil:** Ver dados do perfil
- [ ] **Medicamentos:** Adicionar, listar, editar, excluir
- [ ] **Sintomas:** Registrar sintoma e ver no calendário
- [ ] **Lembretes:** Ver lista de lembretes do dia
- [ ] **Marcar como tomado:** Checkbox funciona e persiste
- [ ] **InfoCards:** Carregar lista e ver detalhes
- [ ] **Taxa de adesão:** Calcular corretamente

---

## 🐛 Solução de Problemas Comuns

### Erro: "Cannot find module 'firebase-admin'"

**Causa:** Dependências não instaladas
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Cannot find module './serviceAccountKey.json'"

**Causa:** Arquivo de credenciais não está na raiz
**Solução:**
```bash
# Verificar se está no lugar certo
ls serviceAccountKey.json

# Se não estiver, baixe novamente do Firebase Console
```

### Erro: "Permission denied" ao popular Firestore

**Causa:** Regras de segurança muito restritivas
**Solução:**
- Os scripts usam Firebase Admin SDK, que ignora regras
- Verifique se o `serviceAccountKey.json` está correto
- Tente recriar a chave no Firebase Console

### Erro: "ECONNREFUSED" ou "Network error"

**Causa:** Sem conexão com internet ou firewall bloqueando
**Solução:**
```bash
# Testar conexão
ping firebase.google.com

# Verificar proxy/firewall
# Pode precisar configurar proxy no código
```

### Scripts não funcionam no Windows

**Causa:** Comandos com `&&` não funcionam no CMD
**Solução:**
```bash
# Use Git Bash ou PowerShell
# Ou execute comandos separadamente:
npm run clear:infocards
npm run populate:infocards
# (ao invés de usar reset:all que encadeia comandos)
```

### Dados não aparecem no Firebase Console

**Causa:** Cache do navegador
**Solução:**
- Recarregue a página (Ctrl+R / Cmd+R)
- Limpe o cache (Ctrl+Shift+R / Cmd+Shift+R)
- Feche e abra o Firebase Console novamente

---

## 📊 Monitoramento e Custos

### Ver Uso do Firebase

1. No Firebase Console, vá em **"Usage"** (Uso)
2. Monitore:
   - **Firestore:** Leituras, escritas, exclusões
   - **Authentication:** Usuários ativos
   - **Storage:** Espaço usado

### Plano Gratuito (Spark)

**Limites:**
- 50.000 leituras/dia
- 20.000 escritas/dia
- 20.000 exclusões/dia
- 1 GB de armazenamento
- 10 GB/mês de transferência

**Para desenvolvimento:** Mais que suficiente
**Para produção:** Considere Plano Blaze (pague conforme uso)

---

## ✅ Checklist Final

Antes de começar a desenvolver, confirme:

- [ ] Node.js instalado (v18+)
- [ ] Git instalado
- [ ] Repositório clonado
- [ ] `npm install` executado com sucesso
- [ ] Firebase projeto criado
- [ ] Firestore ativado
- [ ] Authentication ativado
- [ ] `serviceAccountKey.json` configurado
- [ ] `firebase-config.js` atualizado
- [ ] InfoCards populados
- [ ] Usuário de teste criado
- [ ] Dados visíveis no Firebase Console
- [ ] Regras de segurança configuradas
- [ ] `auth-integration.js` estudado

**✅ Tudo pronto? Você está pronto para desenvolver!**

---

## 🎓 Próximos Passos

1. **Leia:** [OVERVIEW.md](./OVERVIEW.md) - Entender o projeto
2. **Estude:** [DIAGRAMAS.md](./DIAGRAMAS.md) - Ver fluxos
3. **Consulte:** [API.md](./API.md) - Referência de funções
4. **Implemente:** Comece pelo fluxo de autenticação
5. **Teste:** Use dados de teste para validar

---

## 📞 Precisa de Ajuda?

- **Issues:** [GitHub Issues](https://github.com/seu-usuario/popularFireBase/issues)
- **FAQ:** [FAQ.md](./FAQ.md)
- **Discussões:** [GitHub Discussions](https://github.com/seu-usuario/popularFireBase/discussions)

---

**Boa sorte com o desenvolvimento!** 🚀
