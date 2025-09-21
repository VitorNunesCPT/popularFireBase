# Popular Firebase - Projeto de População do Firestore

Este projeto permite popular o banco de dados Firestore com dados da coleção `infoCards` sobre tuberculose.

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Firebase
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Vá em "Configurações do projeto" > "Contas de serviço"
4. Clique em "Gerar nova chave privada"
5. Baixe o arquivo JSON e renomeie para `serviceAccountKey.json`
6. Coloque o arquivo na raiz do projeto

### 3. Atualizar configuração
Edite o arquivo `firebase-config.js` e substitua `'seu-project-id'` pelo ID do seu projeto Firebase.

## Como usar

### Comandos via NPM Scripts:

```bash
# Popular apenas infoCards
npm run populate:infocards

# Popular detalhes dos sinais e sintomas (subcoleção do card_1)
npm run populate:sinais

# Popular detalhes de transmissão (subcoleção do card_2)
npm run populate:transmissao

# Popular tudo de uma vez
npm run populate:all

# Listar documentos
npm run list:infocards
npm run list:sinais
npm run list:transmissao

# Limpar coleções
npm run clear:infocards
npm run clear:sinais
npm run clear:transmissao

# Reset completo (limpa tudo e popula novamente)
npm run reset:all
```

### Comandos diretos:

```bash
# InfoCards
node populate-firestore.js populate
node populate-firestore.js list
node populate-firestore.js clear
node populate-firestore.js reset

# Sinais e Sintomas (subcoleção do card_1)
node populate-sinais-sintomas.js populate
node populate-sinais-sintomas.js list
node populate-sinais-sintomas.js clear
node populate-sinais-sintomas.js details
node populate-sinais-sintomas.js reset

# Transmissão (subcoleção do card_2)
node populate-transmissao.js populate
node populate-transmissao.js list
node populate-transmissao.js clear
node populate-transmissao.js details
node populate-transmissao.js reset
```

## Estrutura dos dados

### Coleção `infoCards`
Contém 11 documentos principais sobre tuberculose:

1. **Sinais e Sintomas** - Essencial (danger) → `card_1`
2. **Transmissão** - Importante (info) → `card_2`
3. **Diagnóstico** - Fundamental (blue) → `card_3`
4. **Sobre o Tratamento** - Fundamental (success) → `card_4`
5. **Reações Adversas** - Atenção (warning) → `card_5`
6. **Interações Medicamentosas** - Cuidado (purple) → `card_6`
7. **Reações da Tuberculose** - Informativo (orange) → `card_7`
8. **Dicas de Autocuidado** - Prático (pink) → `card_8`
9. **Prevenção** - Preventivo (teal) → `card_9`
10. **TB-HIV (Coinfecção)** - Especializado (red) → `card_10`
11. **Epidemiologia** - Contextual (blue) → `card_11`

### Subcoleção `detalhes` do card_1 (Sinais e Sintomas)
Estrutura: `infoCards/card_1/detalhes/[documentos]`

1. **sintomas-classicos** - 4 sintomas principais com frequência
2. **sintomas-formas** - Sintomas por forma clínica (primária, secundária, miliar)
3. **sintomas-pvhiv** - 4 sintomas para rastreamento em PVHIV
4. **locais-avaliacao** - 5 locais de busca ativa
5. **criterios-sr** - 5 critérios por população
6. **exames-complementares** - 5 exames diagnósticos
7. **monitoramento-tratamento** - 4 parâmetros de acompanhamento
8. **sinais-alerta** - 5 situações de emergência

### Subcoleção `detalhes` do card_2 (Transmissão)
Estrutura: `infoCards/card_2/detalhes/[documentos]`

1. **mecanismo-transmissao** - 4 etapas do processo de transmissão
2. **fatores-risco** - 5 fatores que aumentam o risco
3. **locais-risco** - 5 ambientes de alto risco
4. **medidas-controle** - Estratégias administrativas, ambientais e de proteção
5. **cronologia-transmissao** - Evolução da transmissibilidade durante tratamento
6. **criterios-quantitativos** - 5 parâmetros numéricos para avaliação
7. **populacoes-vulneraveis** - 5 grupos com maior risco de exposição

### Campos dos documentos
- `title`: Título do card/documento
- `description`: Descrição do conteúdo
- `iconName`: Nome do ícone (Lucide React) - apenas infoCards
- `status`: Status/categoria do card
- `theme`: Tema de cores - apenas infoCards
- `order`: Ordem de exibição
- `data`: Array com os dados específicos - apenas subcoleção
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Segurança

⚠️ **IMPORTANTE**: Nunca commite o arquivo `serviceAccountKey.json` no Git. Este arquivo contém credenciais sensíveis.

Adicione ao seu `.gitignore`:
```
serviceAccountKey.json
```