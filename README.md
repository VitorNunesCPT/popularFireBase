# Popular Firebase - Projeto de População do Firestore

> **Sistema de Acompanhamento de Tratamento de Tuberculose**
>
> Backend Firebase + Scripts de População + Funções de Integração

Este projeto permite popular o banco de dados Firestore com:
1. **Dados educacionais** - Coleção `infoCards` sobre tuberculose (conteúdo estático)
2. **Dados de usuários** - Sistema de acompanhamento de tratamento com medicamentos, sintomas e registros de dose

---

## 📚 Documentação Completa

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[OVERVIEW.md](./OVERVIEW.md)** | Visão geral do projeto, arquitetura e conceitos | 🆕 Primeira vez no projeto |
| **[SETUP.md](./SETUP.md)** | Guia passo a passo de instalação | 🔧 Configuração inicial |
| **[DIAGRAMAS.md](./DIAGRAMAS.md)** | Fluxos completos em Mermaid | 🎨 Entender lógica e fluxos |
| **[API.md](./API.md)** | Referência de funções | 💻 Durante desenvolvimento |
| **[FAQ.md](./FAQ.md)** | Perguntas frequentes | ❓ Dúvidas comuns |
| **README.md** | Este arquivo - Referência rápida de comandos | 📖 Consulta diária |

---

## 🚀 Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar Firebase (veja SETUP.md)
# - Criar projeto no Firebase Console
# - Baixar serviceAccountKey.json
# - Colocar na raiz do projeto

# 3. Testar
npm run populate:infocards
npm run user:create

# 4. Pronto! Dados estão no Firestore
```

**Primeira vez?** Leia [SETUP.md](./SETUP.md) para guia completo.

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

### Estrutura do Banco de Dados

O Firestore está organizado em duas estruturas principais:

#### 1. InfoCards (Conteúdo Estático - Raiz do Firestore)
```
/infoCards/{cardId}
  └── /detalhes/{docId}
```
Contém informações educacionais sobre tuberculose, compartilhadas por todos os usuários.

#### 2. Usuários (Dados Dinâmicos - Por Usuário)
```
/users/{userId}
  ├── (dados do perfil: nome, email, dataNascimento, telefone)
  ├── /medicamentos/{medId}
  │     └── (nome, dosagem, frequencia, horarios[], dataInicio, dataFim, observacoes)
  ├── /sintomas/{sintomaId}
  │     └── (data, descricao, intensidade, observacoes)
  └── /registrosDeDose/{registroId}
        └── (medicamentoRef, nomeMedicamento, dosagem, horarioAgendado, horarioTomado, status)
```

---

## Comandos - InfoCards (Tuberculose)

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

# Popular detalhes de reações da tuberculose (subcoleção do card_7)
npm run populate:reacoes-tb

# Popular detalhes de autocuidado (subcoleção do card_8)
npm run populate:autocuidado

# Popular detalhes de prevenção (subcoleção do card_9)
npm run populate:prevencao

# Popular detalhes de TB-HIV (subcoleção do card_10)
npm run populate:tb-hiv

# Popular detalhes de epidemiologia (subcoleção do card_11)
npm run populate:epidemiologia

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
npm run list:reacoes-tb
npm run list:autocuidado
npm run list:prevencao
npm run list:tb-hiv
npm run list:epidemiologia

# Limpar coleções
npm run clear:infocards
npm run clear:sinais
npm run clear:transmissao
npm run clear:diagnostico
npm run clear:tratamento
npm run clear:reacoes
npm run clear:interacoes
npm run clear:reacoes-tb
npm run clear:autocuidado
npm run clear:prevencao
npm run clear:tb-hiv
npm run clear:epidemiologia

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

# Reações da Tuberculose (subcoleção do card_7)
node populate-reacoes-tuberculose.js populate
node populate-reacoes-tuberculose.js list
node populate-reacoes-tuberculose.js clear
node populate-reacoes-tuberculose.js details
node populate-reacoes-tuberculose.js reset

# Autocuidado (subcoleção do card_8)
node populate-autocuidado.js populate
node populate-autocuidado.js list
node populate-autocuidado.js clear
node populate-autocuidado.js details
node populate-autocuidado.js reset

# Prevenção (subcoleção do card_9)
node populate-prevencao.js populate
node populate-prevencao.js list
node populate-prevencao.js clear
node populate-prevencao.js details
node populate-prevencao.js reset

# TB-HIV (subcoleção do card_10)
node populate-tb-hiv.js populate
node populate-tb-hiv.js list
node populate-tb-hiv.js clear
node populate-tb-hiv.js details
node populate-tb-hiv.js reset

# Epidemiologia (subcoleção do card_11)
node populate-epidemiologia.js populate
node populate-epidemiologia.js list
node populate-epidemiologia.js clear
node populate-epidemiologia.js details
node populate-epidemiologia.js reset
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

### Subcoleção `detalhes` do card_7 (Reações da Tuberculose)
Estrutura: `infoCards/card_7/detalhes/[documentos]`

1. **reacoes-medicamentos** - Efeitos adversos (menores e maiores) aos medicamentos
2. **eventos-vacina** - 5 eventos adversos da vacinação BCG
3. **populacoes-risco** - 5 grupos com maior risco de reações adversas
4. **dosagens-vitamina** - 4 dosagens de piridoxina para prevenção
5. **criterios-monitoramento** - 4 parâmetros para acompanhamento de reações

### Subcoleção `detalhes` do card_8 (Dicas de Autocuidado)
Estrutura: `infoCards/card_8/detalhes/[documentos]`

1. **acoes-cuidado** - 4 categorias de práticas essenciais (coleta, adesao, monitoramento, controle)
2. **importancia** - 5 aspectos sobre a importância do autocuidado
3. **locais-tempos** - 4 orientações sobre onde e quando praticar
4. **dosagens** - 3 doses importantes de medicamentos
5. **sinais-alerta** - 8 sintomas que requerem atenção médica

### Subcoleção `detalhes` do card_9 (Prevenção)
Estrutura: `infoCards/card_9/detalhes/[documentos]`

1. **estrategias** - 6 principais abordagens para prevenir a tuberculose
2. **locais** - 7 ambientes onde as medidas preventivas são aplicadas
3. **momentos** - 7 momentos para aplicar as medidas preventivas
4. **responsaveis** - 6 atores envolvidos na prevenção
5. **implementacao** - 8 formas de operacionalizar as medidas
6. **metas** - 6 objetivos quantitativos para prevenção

### Subcoleção `detalhes` do card_10 (TB-HIV Coinfecção)
Estrutura: `infoCards/card_10/detalhes/[documentos]`

1. **interacoes-medicamentos** - Interações entre rifampicina/rifabutina e antirretrovirais
2. **epidemiologia** - 4 aspectos epidemiológicos da coinfecção TB-HIV
3. **cronograma-tarv** - 4 critérios para início do TARV conforme CD4+
4. **cuidados-especiais** - Abordagens para diagnóstico, tratamento e monitoramento
5. **iris** - 3 tipos de Síndrome Inflamatória de Reconstituição Imune
6. **esquemas-terapeuticos** - 4 esquemas de tratamento conforme ARV
7. **profilaxias** - 4 profilaxias para infecções oportunistas
8. **criterios-laboratoriais** - 4 parâmetros laboratoriais para monitoramento
9. **locais-atendimento** - 4 níveis de atenção para coinfecção TB-HIV

### Subcoleção `detalhes` do card_11 (Epidemiologia)
Estrutura: `infoCards/card_11/detalhes/[documentos]`

1. **dados-nacionais-2023** - Indicadores principais do Brasil (incidência, mortalidade, coinfecção HIV, TB-DR)
2. **dados-regionais** - 5 regiões brasileiras com ranking e tendências
3. **tendencias-historicas** - Série histórica 2014-2023 dos principais indicadores
4. **indicadores-controle** - 6 indicadores de desempenho do programa (cura, abandono, óbito, etc.)
5. **populacoes-vulneraveis** - 4 grupos de alto risco (população de rua, PPL, indígenas, PVHIV)
6. **determinantes-sociais** - 5 fatores socioeconômicos associados à TB
7. **metas-end-tb** - Progresso em direção às metas da Estratégia End TB (2015-2035)
8. **comparacao-internacional** - Posição do Brasil entre os 10 países com maior carga

---

## 🔐 Integração com Firebase Authentication

### ⚡ Fluxo Recomendado:

**No seu aplicativo**, a estrutura de usuários no Firestore deve ser criada automaticamente quando o usuário se registra via Firebase Authentication.

### 📋 Como Funciona:

1. **Usuário se registra** → Firebase Authentication cria UID
2. **App cria perfil** → Usa UID como ID do documento em `/users/{uid}`
3. **Durante uso** → App adiciona medicamentos, sintomas e registros

### 💻 Implementação no App:

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from './auth-integration';

// 1. Registro via Authentication
async function handleSignUp(email, password, nome) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // 2. Cria perfil no Firestore (UID do Auth = ID do documento)
  await createUserProfile(userCredential.user.uid, {
    nome: nome,
    email: email,
    telefone: null,
    dataNascimento: null
  });
}
```

### 🛠️ Funções Disponíveis (`auth-integration.js`):

**Gerenciamento de Perfil:**
- `createUserProfile(userId, userData)` - Cria perfil após registro
- `getUserProfile(userId)` - Busca perfil completo
- `updateUserProfile(userId, updates)` - Atualiza dados
- `deleteUserProfile(userId)` - Remove usuário e subcoleções

**Adicionar Dados (durante uso do app):**
- `addMedicamento(userId, medicamentoData)` - Tela "Novo Lembrete"
- `addSintoma(userId, sintomaData)` - Tela "Registrar Sintoma"
- `addRegistroDose(userId, registroData)` - Marcar como tomado/pulado

### 📱 Exemplos Práticos:

**Tela "Novo Lembrete":**
```javascript
await addMedicamento(user.uid, {
  nome: "Rifampicina",
  dosagem: "600mg",
  frequencia: "diaria",
  horarios: ["08:00", "20:00"],
  dataInicio: new Date()
});
```

**Tela "Registrar Sintoma":**
```javascript
await addSintoma(user.uid, {
  data: new Date(),
  descricao: "Tosse seca, febre",
  intensidade: "media"
});
```

**Marcar medicamento como tomado:**
```javascript
await addRegistroDose(user.uid, {
  medicamentoId: medicamento.id,
  nomeMedicamento: medicamento.nome,
  dosagem: medicamento.dosagem,
  horarioAgendado: new Date("2025-10-23T08:00:00"),
  horarioTomado: new Date(),
  status: "tomado"
});
```

📄 **Veja exemplos completos em:** [`auth-integration.js`](./auth-integration.js)

---

## Comandos - Usuários (Testes e Desenvolvimento)

⚠️ **Nota:** Os comandos abaixo são apenas para TESTE local. No app real, use as funções do `auth-integration.js`.

### Comandos via NPM Scripts:

```bash
# Criar usuário de teste com todos os dados
npm run user:create

# Listar todos os usuários
npm run user:list

# Ver detalhes completos de um usuário
npm run user:details

# Listar medicamentos do usuário
npm run user:medicamentos

# Listar sintomas do usuário
npm run user:sintomas

# Listar registros de dose do usuário
npm run user:registros

# Limpar todos os usuários
npm run user:clear

# Reset (limpa e recria usuário de teste)
npm run user:reset
```

### Comandos diretos:

```bash
# Gerenciar usuários
node populate-usuarios.js create
node populate-usuarios.js list
node populate-usuarios.js details [userId]
node populate-usuarios.js clear
node populate-usuarios.js reset

# Listar subcoleções
node populate-usuarios.js list-medicamentos [userId]
node populate-usuarios.js list-sintomas [userId]
node populate-usuarios.js list-registros [userId] [limit]

# Se userId não for especificado, usa "usuario_teste_001"
# Se limit não for especificado, usa 20
```

### Dados de Exemplo Incluídos:

Ao executar `npm run user:create`, o sistema cria:

**Usuário:**
- João Silva (usuario_teste_001)
- Email: joao.silva@exemplo.com

**5 Medicamentos:**
1. Rifampicina 600mg - 2x ao dia (08:00, 20:00)
2. Isoniazida 300mg - 1x ao dia (08:00)
3. Pirazinamida 1500mg - 1x ao dia (08:00)
4. Etambutol 1200mg - 1x ao dia (08:00)
5. Vitamina B6 50mg - 1x ao dia (08:00)

**7 Sintomas registrados** ao longo de uma semana (15/10 a 22/10):
- Tosse, febre, sudorese noturna, dor no peito, cansaço
- Com diferentes intensidades (baixa, média, alta)

**15 Registros de dose:**
- Histórico de medicamentos tomados e pulados
- Diferentes horários e status

### Estrutura das Subcoleções:

#### Medicamentos (`/users/{userId}/medicamentos/{medId}`)
- `nome`: Nome do medicamento
- `dosagem`: Dose (ex: "600mg")
- `frequencia`: Tipo de frequência ("diaria", "semanal", "personalizada")
- `horarios`: Array de horários (ex: ["08:00", "20:00"])
- `observacoes`: Observações importantes
- `dataInicio`: Timestamp de início do tratamento
- `dataFim`: Timestamp de fim (pode ser null)
- `criadoEm`: Timestamp de criação

#### Sintomas (`/users/{userId}/sintomas/{sintomaId}`)
- `data`: Timestamp da data do sintoma
- `descricao`: Descrição do sintoma
- `intensidade`: "baixa", "media" ou "alta"
- `observacoes`: Observações adicionais
- `criadoEm`: Timestamp de criação do registro

#### Registros de Dose (`/users/{userId}/registrosDeDose/{registroId}`)
- `medicamentoRef`: Referência ao documento do medicamento
- `nomeMedicamento`: Nome (denormalizado para exibição)
- `dosagem`: Dosagem (denormalizado)
- `horarioAgendado`: Timestamp do horário previsto
- `horarioTomado`: Timestamp de quando foi tomado (null se pulado)
- `status`: "tomado" ou "pulado"

---

## Estrutura dos InfoCards

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