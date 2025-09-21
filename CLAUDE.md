# Guia Claude - Criação de Novos Cards Firebase

Este arquivo contém instruções padronizadas para facilitar a criação de novos cards no projeto Firebase de tuberculose.

## Processo Padrão para Criação de Novo Card

### 1. Estrutura de Dados
Primeiro, defina a estrutura dos dados seguindo este padrão:

```javascript
// Exemplo de estrutura para card_X
const dadosExemplo = [
  {
    campo1: "valor",
    campo2: "descrição",
    campo3: ["item1", "item2", "item3"],
  },
  // ... mais objetos
];

const outrosDados = {
  categoria1: [
    {
      titulo: "Título",
      descricao: "Descrição detalhada",
      dados: ["dado1", "dado2"],
    },
  ],
  categoria2: [
    // ... estrutura similar
  ],
};
```

### 2. TodoList Padrão
Sempre crie esta sequência de todos ao iniciar um novo card:

```javascript
[
  {
    content: "Criar arquivo de dados para [NOME_CARD] (card_X)",
    status: "in_progress",
    activeForm: "Criando arquivo de dados para [NOME_CARD] (card_X)"
  },
  {
    content: "Criar script para popular subcoleção de [NOME_CARD]",
    status: "pending",
    activeForm: "Criando script para popular subcoleção de [NOME_CARD]"
  },
  {
    content: "Atualizar package.json com novos scripts",
    status: "pending",
    activeForm: "Atualizando package.json com novos scripts"
  },
  {
    content: "Atualizar README.md com documentação do card_X",
    status: "pending",
    activeForm: "Atualizando README.md com documentação do card_X"
  }
]
```

### 3. Arquivos a Criar/Atualizar

#### 3.1 Arquivo de Dados: `/data/[nome-card]-data.js`
```javascript
// Dados detalhados sobre [tema do card]

const dados1 = [
  // estrutura de dados
];

const dados2 = {
  // estrutura de dados
};

// ... outros dados

module.exports = {
  dados1,
  dados2,
  // ... exports
};
```

#### 3.2 Script de População: `/populate-[nome-card].js`
```javascript
const { db } = require('./firebase-config');
const {
  dados1,
  dados2,
  // ... imports
} = require('./data/[nome-card]-data');

async function populate[NomeCard]() {
  try {
    console.log('🔄 Iniciando população da subcoleção em card_X...');

    const batch = db.batch();
    const cardXRef = db.collection('infoCards').doc('card_X');

    // Para cada tipo de dados, criar um documento
    const dados1Ref = cardXRef.collection('detalhes').doc('nome-documento-1');
    batch.set(dados1Ref, {
      title: "Título do Documento",
      description: "Descrição do conteúdo",
      order: 1,
      data: dados1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // ... repetir para outros dados

    await batch.commit();

    console.log('✅ Subcoleção detalhes populada com sucesso em card_X!');
    console.log('📊 Documentos criados em infoCards/card_X/detalhes:');
    // ... listar documentos

    // Verificação
    const snapshot = await cardXRef.collection('detalhes').get();
    console.log(`🔍 Verificação: ${snapshot.size} documentos encontrados na subcoleção`);

  } catch (error) {
    console.error('❌ Erro ao popular a subcoleção:', error);
  }
}

async function clear[NomeCard]() {
  // função de limpeza padrão
}

async function list[NomeCard]() {
  // função de listagem padrão
}

async function get[NomeCard]Details() {
  // função de detalhes padrão
}

// Função principal com switch/case padrão
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'populate':
      await populate[NomeCard]();
      break;
    case 'clear':
      await clear[NomeCard]();
      break;
    case 'list':
      await list[NomeCard]();
      break;
    case 'details':
      await get[NomeCard]Details();
      break;
    case 'reset':
      await clear[NomeCard]();
      await populate[NomeCard]();
      break;
    default:
      console.log('📖 Comandos disponíveis para subcoleção detalhes do card_X:');
      // ... help padrão
  }

  process.exit(0);
}

main();
```

#### 3.3 Atualizar package.json
Adicionar os scripts seguindo o padrão:
```json
{
  "scripts": {
    "populate:[nome-card]": "node populate-[nome-card].js populate",
    "list:[nome-card]": "node populate-[nome-card].js list",
    "clear:[nome-card]": "node populate-[nome-card].js clear",
    // Atualizar populate:all, reset:all
  }
}
```

#### 3.4 Atualizar README.md
Adicionar documentação seguindo o padrão:
```markdown
# Popular detalhes de [Nome Card] (subcoleção do card_X)
npm run populate:[nome-card]

# Comandos diretos
node populate-[nome-card].js populate
node populate-[nome-card].js list
node populate-[nome-card].js clear
node populate-[nome-card].js details
node populate-[nome-card].js reset

### Subcoleção `detalhes` do card_X ([Nome Card])
Estrutura: `infoCards/card_X/detalhes/[documentos]`

1. **documento-1** - Descrição do documento 1
2. **documento-2** - Descrição do documento 2
// ... outros documentos
```

## Checklist de Criação de Novo Card

- [ ] Analisar dados fornecidos pelo usuário
- [ ] Criar TodoList com 4 itens padrão
- [ ] Criar arquivo `/data/[nome-card]-data.js`
- [ ] Criar arquivo `/populate-[nome-card].js`
- [ ] Atualizar `package.json` com novos scripts
- [ ] Atualizar `README.md` com documentação
- [ ] Marcar todos os todos como completed
- [ ] Verificar se todos os arquivos foram criados corretamente

## Padrões de Nomenclatura

- **Arquivos de dados:** `[nome-tema]-data.js` (ex: `sinais-sintomas-data.js`)
- **Scripts de população:** `populate-[nome-tema].js` (ex: `populate-sinais-sintomas.js`)
- **Scripts NPM:** `[acao]:[nome-tema]` (ex: `populate:sinais`)
- **Documentos Firestore:** `[nome-descritivo]` (ex: `sintomas-classicos`)
- **Card IDs:** `card_X` onde X é o número sequencial

## Estrutura Firestore Padrão

```
infoCards/
├── card_1/
│   └── detalhes/
│       ├── documento-1
│       ├── documento-2
│       └── ...
├── card_2/
│   └── detalhes/
│       └── ...
└── ...
```

## Campos Obrigatórios nos Documentos

Todos os documentos na subcoleção `detalhes` devem ter:
- `title`: Título do documento
- `description`: Descrição do conteúdo
- `order`: Ordem de exibição (número)
- `data`: Array ou objeto com os dados específicos
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Observações Importantes

1. Sempre use batch operations para eficiência
2. Inclua logs informativos durante o processo
3. Implemente verificação pós-inserção
4. Mantenha consistência na nomenclatura
5. Documente adequadamente cada novo card
6. Teste todos os comandos (populate, list, clear, details, reset)
7. Atualize sempre o script `populate:all` e `reset:all`