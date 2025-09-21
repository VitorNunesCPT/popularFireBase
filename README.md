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

# Popular detalhes de diagnóstico (subcoleção do card_3)
npm run populate:diagnostico

# Popular detalhes de tratamento (subcoleção do card_4)
npm run populate:tratamento

# Popular detalhes de reações adversas (subcoleção do card_5)
npm run populate:reacoes

# Popular detalhes de interações medicamentosas (subcoleção do card_6)
npm run populate:interacoes

# Popular tudo de uma vez
npm run populate:all

# Listar documentos
npm run list:infocards
npm run list:sinais
npm run list:transmissao
npm run list:diagnostico
npm run list:tratamento
npm run list:reacoes
npm run list:interacoes

# Limpar coleções
npm run clear:infocards
npm run clear:sinais
npm run clear:transmissao
npm run clear:diagnostico
npm run clear:tratamento
npm run clear:reacoes
npm run clear:interacoes

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

# Diagnóstico (subcoleção do card_3)
node populate-diagnostico.js populate
node populate-diagnostico.js list
node populate-diagnostico.js clear
node populate-diagnostico.js details
node populate-diagnostico.js reset

# Tratamento (subcoleção do card_4)
node populate-tratamento.js populate
node populate-tratamento.js list
node populate-tratamento.js clear
node populate-tratamento.js details
node populate-tratamento.js reset

# Reações Adversas (subcoleção do card_5)
node populate-reacoes-adversas.js populate
node populate-reacoes-adversas.js list
node populate-reacoes-adversas.js clear
node populate-reacoes-adversas.js details
node populate-reacoes-adversas.js reset

# Interações Medicamentosas (subcoleção do card_6)
node populate-interacoes-medicamentosas.js populate
node populate-interacoes-medicamentosas.js list
node populate-interacoes-medicamentosas.js clear
node populate-interacoes-medicamentosas.js details
node populate-interacoes-medicamentosas.js reset
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

### Subcoleção `detalhes` do card_3 (Diagnóstico)
Estrutura: `infoCards/card_3/detalhes/[documentos]`

1. **metodos-laboratoriais** - 4 métodos (baciloscopia, TRM-TB, culturas)
2. **metodos-imunologicos** - 2 testes (PT, IGRA)
3. **metodos-imagem** - 2 exames (RX tórax, TC tórax)
4. **fluxograma-diagnostico** - Algoritmos por população (adulto, PVHIV, criança)
5. **diagnostico-diferencial** - Diagnósticos diferenciais por forma clínica
6. **biomarcadores** - 3 marcadores auxiliares (ADA pleural, liquórica, interferon-γ)
7. **algoritmo-tratamento** - 4 situações de decisão terapêutica
8. **criterios-especiais** - 3 populações específicas (crianças, PVHIV, contatos TB-DR)

### Subcoleção `detalhes` do card_4 (Tratamento)
Estrutura: `infoCards/card_4/detalhes/[documentos]`

1. **esquemas-basicos** - 4 esquemas padrão (adultos, crianças, formas graves)
2. **esquemas-tbdr** - 2 esquemas para TB drogarresistente (MDR, XDR)
3. **esquemas-iltb** - 4 esquemas para infecção latente (6H, 9H, 4R, 3HP)
4. **locais-tratamento** - 4 níveis de atenção (básica, secundária, terciária, hospitalar)
5. **modalidades-tdo** - 4 modalidades de TDO (domiciliar, unidade, compartilhado, institucional)
6. **monitoramento-cronico** - 4 parâmetros de acompanhamento (bacteriológico, clínico, radiológico, laboratorial)
7. **dosagens-especiais** - 5 dosagens e considerações especiais
8. **criterios-laboratoriais** - 4 exames e parâmetros de monitoramento

### Subcoleção `detalhes` do card_5 (Reações Adversas)
Estrutura: `infoCards/card_5/detalhes/[documentos]`

1. **reacoes-menores** - 6 reações comuns e menos graves
2. **reacoes-maiores** - 6 reações graves que requerem atenção especial
3. **fatores-risco** - 5 condições que aumentam o risco de reações
4. **estrategias-manejo** - Abordagens para reações menores e maiores
5. **frequencias-reacoes** - 6 incidências dos principais efeitos adversos
6. **dosagens-especiais** - 4 doses específicas para prevenção e manejo
7. **monitoramento-especial** - 4 parâmetros de acompanhamento para grupos de risco

### Subcoleção `detalhes` do card_6 (Interações Medicamentosas)
Estrutura: `infoCards/card_6/detalhes/[documentos]`

1. **tipos-interacoes** - Classificação por mecanismo (absorção, metabolismo, toxicidade)
2. **populacoes-especiais** - 4 grupos com maior risco (PVHIV, diabéticos, hepatopatas, nefropatas)
3. **estrategias-manejo** - 5 abordagens para prevenir e manejar interações
4. **criterios-monitoramento** - 4 parâmetros para acompanhamento de interações
5. **dosagens-especiais** - 4 ajustes de dose para evitar interações

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