# Diagramas de Fluxo - Sistema de Acompanhamento de Tratamento

Este documento contém todos os diagramas de fluxo da aplicação, organizados por domínio.

---

## 📊 Índice

1. [Arquitetura Geral do Sistema](#1-arquitetura-geral-do-sistema)
2. [Estrutura de Dados Firestore](#2-estrutura-de-dados-firestore)
3. [Fluxo de Autenticação e Registro](#3-fluxo-de-autenticação-e-registro)
4. [Fluxo de Medicamentos](#4-fluxo-de-medicamentos)
5. [Fluxo de Sintomas](#5-fluxo-de-sintomas)
6. [Fluxo de Registros de Dose](#6-fluxo-de-registros-de-dose)
7. [Fluxo de InfoCards (Conteúdo Educacional)](#7-fluxo-de-infocards-conteúdo-educacional)
8. [Fluxo de Lembretes de Medicação](#8-fluxo-de-lembretes-de-medicação)
9. [Fluxo de Calendário de Sintomas](#9-fluxo-de-calendário-de-sintomas)

---

## 1. Arquitetura Geral do Sistema

```mermaid
graph TB
    subgraph "Frontend - Aplicativo Móvel"
        A[Telas do App]
        B[Firebase SDK]
    end

    subgraph "Firebase Services"
        C[Firebase Authentication]
        D[Cloud Firestore]
    end

    subgraph "Firestore Collections"
        E[/users/{uid}]
        F[/infoCards]
        G[/users/{uid}/medicamentos]
        H[/users/{uid}/sintomas]
        I[/users/{uid}/registrosDeDose]
    end

    A -->|Auth Operations| B
    B -->|createUser/signIn| C
    B -->|CRUD Operations| D
    D --> E
    D --> F
    E --> G
    E --> H
    E --> I

    style C fill:#4285f4
    style D fill:#ffca28
    style E fill:#34a853
    style F fill:#ea4335
    style G fill:#fbbc04
    style H fill:#34a853
    style I fill:#ea4335
```

---

## 2. Estrutura de Dados Firestore

```mermaid
erDiagram
    USERS ||--o{ MEDICAMENTOS : "possui"
    USERS ||--o{ SINTOMAS : "registra"
    USERS ||--o{ REGISTROS_DOSE : "tem"
    MEDICAMENTOS ||--o{ REGISTROS_DOSE : "referencia"

    USERS {
        string uid PK
        string nome
        string email
        string telefone
        string dataNascimento
        string fotoURL
        timestamp criadoEm
        timestamp atualizadoEm
    }

    MEDICAMENTOS {
        string id PK
        string userId FK
        string nome
        string dosagem
        string frequencia
        array horarios
        string observacoes
        timestamp dataInicio
        timestamp dataFim
        timestamp criadoEm
    }

    SINTOMAS {
        string id PK
        string userId FK
        timestamp data
        string descricao
        string intensidade
        string observacoes
        timestamp criadoEm
    }

    REGISTROS_DOSE {
        string id PK
        string userId FK
        string medicamentoRef FK
        string nomeMedicamento
        string dosagem
        timestamp horarioAgendado
        timestamp horarioTomado
        string status
    }

    INFOCARDS {
        string id PK
        string title
        string description
        string iconName
        string theme
        int order
        timestamp criadoEm
        timestamp atualizadoEm
    }

    INFOCARDS ||--o{ DETALHES : "contém"

    DETALHES {
        string id PK
        string cardId FK
        string title
        string description
        int order
        object data
        timestamp criadoEm
        timestamp atualizadoEm
    }
```

---

## 3. Fluxo de Autenticação e Registro

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant FA as Firebase Auth
    participant FS as Firestore

    Note over U,FS: FLUXO DE REGISTRO

    U->>A: Preenche formulário de registro
    U->>A: Clica em "Registrar"
    A->>FA: createUserWithEmailAndPassword(email, password)

    alt Registro bem-sucedido
        FA-->>A: Retorna user (com UID)
        A->>FS: createUserProfile(user.uid, {nome, email})
        FS->>FS: Cria documento /users/{uid}
        FS-->>A: Perfil criado com sucesso
        A-->>U: Redireciona para Home/Onboarding
    else Erro no registro
        FA-->>A: Erro (email já existe, senha fraca, etc)
        A-->>U: Exibe mensagem de erro
    end

    Note over U,FS: FLUXO DE LOGIN

    U->>A: Insere email e senha
    U->>A: Clica em "Entrar"
    A->>FA: signInWithEmailAndPassword(email, password)

    alt Login bem-sucedido
        FA-->>A: Retorna user autenticado
        A->>FS: getUserProfile(user.uid)
        FS-->>A: Retorna dados do perfil
        A-->>U: Redireciona para Home
    else Erro no login
        FA-->>A: Erro (credenciais inválidas)
        A-->>U: Exibe mensagem de erro
    end

    Note over U,FS: FLUXO DE LOGIN COM GOOGLE

    U->>A: Clica em "Entrar com Google"
    A->>FA: signInWithPopup(googleProvider)
    FA-->>A: Retorna user do Google
    A->>FS: getUserProfile(user.uid)

    alt Perfil já existe
        FS-->>A: Retorna perfil existente
        A-->>U: Redireciona para Home
    else Primeiro acesso (perfil não existe)
        A->>FS: createUserProfile(user.uid, {nome, email, fotoURL})
        FS-->>A: Perfil criado
        A-->>U: Redireciona para Onboarding
    end
```

---

## 4. Fluxo de Medicamentos

```mermaid
flowchart TD
    Start([Usuário acessa tela de Medicamentos]) --> CheckAuth{Usuário autenticado?}

    CheckAuth -->|Não| Login[Redirecionar para Login]
    CheckAuth -->|Sim| LoadMed[Carregar medicamentos do Firestore]

    LoadMed --> Query["Query: /users/{uid}/medicamentos"]
    Query --> Display[Exibir lista de medicamentos]

    Display --> UserAction{Ação do usuário}

    UserAction -->|Adicionar novo| FormAdd[Tela: Novo Lembrete]
    UserAction -->|Editar| FormEdit[Tela: Editar Medicamento]
    UserAction -->|Excluir| ConfirmDelete{Confirmar exclusão?}
    UserAction -->|Voltar| End([Fim])

    FormAdd --> FillForm[Preencher formulário]
    FillForm --> ValidateAdd{Dados válidos?}
    ValidateAdd -->|Não| ShowErrorAdd[Mostrar erros de validação]
    ShowErrorAdd --> FillForm
    ValidateAdd -->|Sim| SaveAdd["addMedicamento(uid, data)"]
    SaveAdd --> CreateDoc["Criar documento em /users/{uid}/medicamentos"]
    CreateDoc --> SuccessAdd[Mostrar mensagem de sucesso]
    SuccessAdd --> LoadMed

    FormEdit --> UpdateForm[Atualizar formulário]
    UpdateForm --> ValidateEdit{Dados válidos?}
    ValidateEdit -->|Não| ShowErrorEdit[Mostrar erros]
    ShowErrorEdit --> UpdateForm
    ValidateEdit -->|Sim| SaveEdit["updateMedicamento(uid, medId, data)"]
    SaveEdit --> UpdateDoc["Atualizar documento"]
    UpdateDoc --> SuccessEdit[Mensagem de sucesso]
    SuccessEdit --> LoadMed

    ConfirmDelete -->|Não| Display
    ConfirmDelete -->|Sim| Delete["deleteMedicamento(uid, medId)"]
    Delete --> DeleteDoc["Excluir documento"]
    DeleteDoc --> SuccessDelete[Mensagem de sucesso]
    SuccessDelete --> LoadMed

    style Start fill:#4285f4,color:#fff
    style End fill:#34a853,color:#fff
    style SaveAdd fill:#fbbc04
    style CreateDoc fill:#ea4335,color:#fff
    style Query fill:#34a853,color:#fff
```

### Estrutura do Formulário "Novo Lembrete"

```mermaid
graph LR
    A[Formulário: Novo Lembrete] --> B[Nome do Medicamento]
    A --> C[Dosagem]
    A --> D[Frequência]
    A --> E[Horários]
    A --> F[Data de Início]
    A --> G[Data de Fim opcional]
    A --> H[Observações]

    D --> D1[Diária]
    D --> D2[Semanal]
    D --> D3[Personalizada]

    E --> E1[Adicionar Horário]
    E1 --> E2[Lista de Horários]
    E2 --> E3[08:00, 20:00]

    B & C & D & E & F --> I{Validar}
    I -->|Válido| J[Salvar no Firestore]
    I -->|Inválido| K[Mostrar Erros]

    style A fill:#4285f4,color:#fff
    style J fill:#34a853,color:#fff
    style K fill:#ea4335,color:#fff
```

---

## 5. Fluxo de Sintomas

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant FS as Firestore

    Note over U,FS: REGISTRAR SINTOMA

    U->>A: Acessa "Registrar Sintoma"
    A->>A: Carrega formulário vazio
    A-->>U: Exibe formulário

    U->>A: Preenche descrição
    U->>A: Seleciona intensidade (baixa/média/alta)
    U->>A: Adiciona observações (opcional)
    U->>A: Clica em "Salvar"

    A->>A: Valida dados do formulário

    alt Dados válidos
        A->>FS: addSintoma(uid, {data, descricao, intensidade, observacoes})
        FS->>FS: Cria documento em /users/{uid}/sintomas
        FS-->>A: Sintoma registrado com ID
        A-->>U: Mensagem: "Sintoma registrado com sucesso!"
        A->>A: Limpa formulário
        A-->>U: Volta para tela anterior ou Calendário
    else Dados inválidos
        A-->>U: Exibe erros de validação
    end

    Note over U,FS: VISUALIZAR SINTOMAS (CALENDÁRIO)

    U->>A: Acessa "Calendário de Sintomas"
    A->>FS: Query: /users/{uid}/sintomas where data >= mesAtual.inicio AND data <= mesAtual.fim
    FS-->>A: Retorna sintomas do mês
    A->>A: Processa dados (agrupa por dia)
    A-->>U: Exibe calendário com dias destacados

    U->>A: Clica em dia específico
    A->>FS: Query: /users/{uid}/sintomas where data == diaSelecionado
    FS-->>A: Retorna sintomas do dia
    A-->>U: Exibe detalhes dos sintomas

    Note over U,FS: EDITAR/EXCLUIR SINTOMA

    U->>A: Clica em "Editar sintoma"
    A-->>U: Exibe formulário preenchido
    U->>A: Modifica dados e salva
    A->>FS: updateSintoma(uid, sintomaId, updates)
    FS-->>A: Sintoma atualizado
    A-->>U: Mensagem de sucesso

    U->>A: Clica em "Excluir sintoma"
    A-->>U: Confirma exclusão
    U->>A: Confirma
    A->>FS: deleteSintoma(uid, sintomaId)
    FS-->>A: Sintoma excluído
    A-->>U: Mensagem de sucesso
```

### Fluxograma do Calendário de Sintomas

```mermaid
flowchart TD
    Start([Abrir Calendário]) --> LoadMonth[Carregar mês atual]
    LoadMonth --> QueryFS["Query Firestore: sintomas do mês"]
    QueryFS --> ProcessData[Processar dados por dia]
    ProcessData --> RenderCal[Renderizar calendário]

    RenderCal --> HighlightDays[Destacar dias com sintomas]
    HighlightDays --> WaitAction{Ação do usuário}

    WaitAction -->|Navegar mês anterior| PrevMonth[Mês anterior]
    WaitAction -->|Navegar mês seguinte| NextMonth[Mês seguinte]
    WaitAction -->|Clicar em dia| SelectDay[Dia selecionado]
    WaitAction -->|Voltar| End([Fim])

    PrevMonth --> LoadMonth
    NextMonth --> LoadMonth

    SelectDay --> HasSymptoms{Tem sintomas?}
    HasSymptoms -->|Sim| ShowDetails[Exibir detalhes dos sintomas]
    HasSymptoms -->|Não| ShowEmpty[Mostrar: Nenhum sintoma registrado]

    ShowDetails --> DetailActions{Ação}
    DetailActions -->|Editar| EditSymptom[Editar sintoma]
    DetailActions -->|Excluir| DeleteSymptom[Excluir sintoma]
    DetailActions -->|Fechar| RenderCal

    ShowEmpty --> AddOption{Registrar sintoma?}
    AddOption -->|Sim| AddSymptom[Formulário de registro]
    AddOption -->|Não| RenderCal

    EditSymptom --> SaveEdit[Salvar alterações]
    SaveEdit --> RenderCal

    DeleteSymptom --> ConfirmDel{Confirmar?}
    ConfirmDel -->|Sim| DeleteFS[Excluir do Firestore]
    ConfirmDel -->|Não| ShowDetails
    DeleteFS --> RenderCal

    AddSymptom --> SaveNew[Salvar novo sintoma]
    SaveNew --> RenderCal

    style Start fill:#4285f4,color:#fff
    style End fill:#34a853,color:#fff
    style QueryFS fill:#ea4335,color:#fff
    style ShowDetails fill:#fbbc04
```

---

## 6. Fluxo de Registros de Dose

```mermaid
stateDiagram-v2
    [*] --> CarregarLembretes: Abrir tela "Lembretes de Medicação"

    CarregarLembretes --> BuscarMedicamentos: Query /users/{uid}/medicamentos
    BuscarMedicamentos --> GerarLembretes: Para cada medicamento

    GerarLembretes --> CalcularHorarios: Calcular horários do dia baseado em frequência
    CalcularHorarios --> VerificarRegistros: Query /users/{uid}/registrosDeDose

    VerificarRegistros --> ExibirLista: Renderizar lista

    state ExibirLista {
        [*] --> Pendente: Horário ainda não chegou
        [*] --> Atrasado: Horário passou e não foi marcado
        [*] --> Tomado: Registro existe com status "tomado"
        [*] --> Pulado: Registro existe com status "pulado"
    }

    ExibirLista --> AguardandoAcao: Exibir lembretes

    AguardandoAcao --> MarcarComoTomado: Usuário marca checkbox
    AguardandoAcao --> MarcarComoPulado: Usuário marca como pulado
    AguardandoAcao --> VisualizarDetalhes: Usuário clica no lembrete
    AguardandoAcao --> [*]: Usuário sai da tela

    MarcarComoTomado --> CriarRegistroTomado: addRegistroDose()
    CriarRegistroTomado --> SalvarFirestore1: Criar doc com status "tomado"
    SalvarFirestore1 --> AtualizarUI1: Atualizar interface
    AtualizarUI1 --> AguardandoAcao

    MarcarComoPulado --> CriarRegistroPulado: addRegistroDose()
    CriarRegistroPulado --> SalvarFirestore2: Criar doc com status "pulado"
    SalvarFirestore2 --> AtualizarUI2: Atualizar interface
    AtualizarUI2 --> AguardandoAcao

    VisualizarDetalhes --> ExibirDetalhes: Mostrar info do medicamento
    ExibirDetalhes --> AguardandoAcao: Fechar detalhes
```

### Sequência Detalhada: Marcar como Tomado

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface
    participant App as Lógica do App
    participant FS as Firestore

    Note over U,FS: Usuário marca medicamento como tomado

    U->>UI: Clica no checkbox do lembrete
    UI->>UI: Desabilita checkbox (loading)
    UI->>App: handleMarkAsTaken(medicamento, horario)

    App->>App: Prepara dados do registro
    Note right of App: {<br/>medicamentoId: "med_001",<br/>nomeMedicamento: "Rifampicina",<br/>dosagem: "600mg",<br/>horarioAgendado: "2025-10-23T08:00",<br/>horarioTomado: now(),<br/>status: "tomado"<br/>}

    App->>FS: addRegistroDose(uid, registroData)
    FS->>FS: Cria documento em /users/{uid}/registrosDeDose

    alt Sucesso
        FS-->>App: Registro criado (retorna ID)
        App->>App: Atualiza estado local
        App-->>UI: Sucesso
        UI->>UI: Marca checkbox como checked
        UI->>UI: Atualiza estilo (verde, ícone de check)
        UI-->>U: Feedback visual (animação)
        UI-->>U: Toast: "Medicamento registrado!"
    else Erro
        FS-->>App: Erro (sem conexão, etc)
        App-->>UI: Erro
        UI->>UI: Restaura checkbox desmarcado
        UI-->>U: Toast: "Erro ao registrar. Tente novamente."
    end

    Note over U,FS: Cálculo de adesão em tempo real

    App->>FS: Query: count tomados vs total
    FS-->>App: Retorna contagens
    App->>App: Calcula: (tomados / total) * 100
    App-->>UI: Atualiza indicador de adesão
    UI-->>U: Exibe: "Taxa de adesão: 85%"
```

---

## 7. Fluxo de InfoCards (Conteúdo Educacional)

```mermaid
flowchart TD
    Start([Usuário acessa InfoCards]) --> LoadCards["Query: /infoCards orderBy order"]
    LoadCards --> CacheCheck{Dados em cache?}

    CacheCheck -->|Sim| DisplayCache[Exibir do cache]
    CacheCheck -->|Não| FetchFS[Buscar do Firestore]

    FetchFS --> SaveCache[Salvar em cache local]
    SaveCache --> DisplayCards[Exibir grid de cards]
    DisplayCache --> DisplayCards

    DisplayCards --> UserSelect{Usuário seleciona card}

    UserSelect -->|Clica em card| LoadDetails["Query: /infoCards/{cardId}/detalhes"]
    UserSelect -->|Volta| End([Fim])

    LoadDetails --> FetchDetails[Buscar subcoleção detalhes]
    FetchDetails --> DisplayDetails[Exibir detalhes do card]

    DisplayDetails --> DetailActions{Ação do usuário}
    DetailActions -->|Navegar entre abas| SwitchTab[Mudar aba/seção]
    DetailActions -->|Voltar| DisplayCards
    DetailActions -->|Compartilhar| Share[Compartilhar conteúdo]
    DetailActions -->|Favoritar| Favorite[Adicionar aos favoritos]

    SwitchTab --> DisplayDetails
    Share --> DisplayDetails
    Favorite --> SaveFavorite["Salvar em /users/{uid}/favoritos"]
    SaveFavorite --> DisplayDetails

    style Start fill:#4285f4,color:#fff
    style End fill:#34a853,color:#fff
    style LoadCards fill:#ea4335,color:#fff
    style DisplayCards fill:#fbbc04
```

### Cards Disponíveis

```mermaid
graph TD
    Root[InfoCards] --> Card1[Card 1: Sinais e Sintomas]
    Root --> Card2[Card 2: Transmissão]
    Root --> Card3[Card 3: Diagnóstico]
    Root --> Card4[Card 4: Tratamento]
    Root --> Card5[Card 5: Reações Adversas]
    Root --> Card6[Card 6: Interações Medicamentosas]
    Root --> Card7[Card 7: Reações da Tuberculose]
    Root --> Card8[Card 8: Autocuidado]
    Root --> Card9[Card 9: Prevenção]
    Root --> Card10[Card 10: TB-HIV]
    Root --> Card11[Card 11: Epidemiologia]

    Card1 --> Det1[8 documentos em /detalhes]
    Card2 --> Det2[7 documentos em /detalhes]
    Card3 --> Det3[8 documentos em /detalhes]
    Card4 --> Det4[8 documentos em /detalhes]
    Card5 --> Det5[7 documentos em /detalhes]
    Card6 --> Det6[5 documentos em /detalhes]
    Card7 --> Det7[5 documentos em /detalhes]
    Card8 --> Det8[5 documentos em /detalhes]
    Card9 --> Det9[6 documentos em /detalhes]
    Card10 --> Det10[9 documentos em /detalhes]
    Card11 --> Det11[8 documentos em /detalhes]

    style Root fill:#4285f4,color:#fff
    style Card1 fill:#ea4335,color:#fff
    style Card4 fill:#34a853,color:#fff
    style Card8 fill:#fbbc04
```

---

## 8. Fluxo de Lembretes de Medicação

```mermaid
flowchart TD
    Start([Abrir tela Lembretes]) --> CheckDate[Verificar data atual]
    CheckDate --> LoadMeds["Query: /users/{uid}/medicamentos"]

    LoadMeds --> FilterActive{Medicamentos ativos hoje?}
    FilterActive -->|Não| ShowEmpty[Exibir: Nenhum lembrete para hoje]
    FilterActive -->|Sim| ProcessMeds[Processar cada medicamento]

    ProcessMeds --> CheckFreq{Verificar frequência}

    CheckFreq -->|Diária| AllDays[Gerar lembretes para todos os horários]
    CheckFreq -->|Semanal| CheckDay{Dia da semana correto?}
    CheckFreq -->|Personalizada| CalcInterval[Calcular baseado em intervalo]

    CheckDay -->|Sim| AllDays
    CheckDay -->|Não| Skip[Pular este medicamento]
    CalcInterval --> AllDays

    AllDays --> ForEachTime[Para cada horário do medicamento]
    ForEachTime --> CreateReminder[Criar objeto de lembrete]

    CreateReminder --> CheckRegistry["Query: /users/{uid}/registrosDeDose<br/>where horarioAgendado == horarioAtual"]

    CheckRegistry --> HasRegistry{Registro existe?}
    HasRegistry -->|Sim| CheckStatus{Status?}
    HasRegistry -->|Não| SetPending[Status: Pendente]

    CheckStatus -->|tomado| SetTaken[Status: Tomado]
    CheckStatus -->|pulado| SetSkipped[Status: Pulado]

    SetPending --> AddToList[Adicionar à lista de lembretes]
    SetTaken --> AddToList
    SetSkipped --> AddToList
    Skip --> NextMed{Próximo medicamento?}

    AddToList --> NextTime{Próximo horário?}
    NextTime -->|Sim| ForEachTime
    NextTime -->|Não| NextMed

    NextMed -->|Sim| ProcessMeds
    NextMed -->|Não| SortList[Ordenar lista por horário]

    SortList --> GroupByTime[Agrupar por período]
    GroupByTime --> DisplayList[Exibir lista agrupada]

    DisplayList --> Group1[📅 Manhã 08:00-12:00]
    DisplayList --> Group2[📅 Tarde 12:00-18:00]
    DisplayList --> Group3[📅 Noite 18:00-00:00]

    Group1 & Group2 & Group3 --> RenderItems[Renderizar itens]
    RenderItems --> ShowStats[Exibir estatísticas do dia]
    ShowStats --> End([Aguardar interação])
    ShowEmpty --> End

    style Start fill:#4285f4,color:#fff
    style End fill:#34a853,color:#fff
    style LoadMeds fill:#ea4335,color:#fff
    style DisplayList fill:#fbbc04
```

### Componente de Lembrete Individual

```mermaid
stateDiagram-v2
    [*] --> Renderizar: Recebe props (medicamento, horário, status)

    Renderizar --> Pendente: status === 'pendente'
    Renderizar --> Tomado: status === 'tomado'
    Renderizar --> Pulado: status === 'pulado'
    Renderizar --> Atrasado: status === 'pendente' && horário passou

    state Pendente {
        [*] --> ExibirCheckbox
        [*] --> ExibirInfo
        ExibirCheckbox --> Desmarcado
        ExibirInfo --> Horario: 08:00
        ExibirInfo --> Nome: Rifampicina 600mg
        ExibirInfo --> BotaoPular
    }

    state Tomado {
        [*] --> CheckboxMarcado
        [*] --> EstiloVerde
        [*] --> IconeCheck
        IconeCheck --> HorarioTomado: Tomado às 08:05
    }

    state Pulado {
        [*] --> EstiloAmarelo
        [*] --> IconeX
        IconeX --> MotivoOpcional: "Esqueci"
    }

    state Atrasado {
        [*] --> EstiloVermelho
        [*] --> IconeAlerta
        [*] --> TextoAlerta: Horário passou!
    }

    Pendente --> AcaoMarcar: Usuário marca checkbox
    Pendente --> AcaoPular: Usuário clica "Pular"

    AcaoMarcar --> SalvandoTomado: Salvando no Firestore...
    AcaoPular --> SalvandoPulado: Salvando no Firestore...

    SalvandoTomado --> Tomado: Sucesso
    SalvandoPulado --> Pulado: Sucesso

    SalvandoTomado --> ErroTomado: Falha
    SalvandoPulado --> ErroPulado: Falha

    ErroTomado --> Pendente: Reverter
    ErroPulado --> Pendente: Reverter
```

---

## 9. Fluxo de Calendário de Sintomas

```mermaid
sequenceDiagram
    participant U as Usuário
    participant Cal as Componente Calendário
    participant App as Lógica do App
    participant FS as Firestore
    participant Cache as Cache Local

    Note over U,FS: CARREGAR CALENDÁRIO

    U->>Cal: Abre tela "Calendário"
    Cal->>App: requestMonthData(ano, mês)

    App->>Cache: Verificar cache do mês

    alt Dados em cache e recentes (< 5min)
        Cache-->>App: Retornar dados do cache
        App-->>Cal: Retornar sintomas do mês
    else Cache vazio ou desatualizado
        App->>FS: Query: sintomas where data >= inicio AND data <= fim
        FS-->>App: Retornar documentos
        App->>Cache: Salvar em cache
        Cache-->>App: Confirmação
        App-->>Cal: Retornar sintomas do mês
    end

    Cal->>Cal: Processar dados (agrupar por dia)
    Cal->>Cal: Renderizar calendário
    Cal->>Cal: Destacar dias com sintomas
    Cal-->>U: Exibir calendário

    Note over U,FS: NAVEGAR ENTRE MESES

    U->>Cal: Clica em "< Mês Anterior"
    Cal->>App: requestMonthData(ano, mês - 1)
    App->>FS: Query novo mês
    FS-->>App: Retornar dados
    App-->>Cal: Atualizar calendário
    Cal-->>U: Exibir mês anterior

    Note over U,FS: SELECIONAR DIA

    U->>Cal: Clica em dia específico (ex: 15/10)
    Cal->>Cal: Filtrar sintomas do dia

    alt Dia tem sintomas
        Cal->>Cal: Abrir modal/drawer de detalhes
        Cal-->>U: Exibir lista de sintomas do dia

        U->>Cal: Clica em sintoma para ver detalhes
        Cal-->>U: Exibir detalhes completos

        U->>Cal: Clica em "Editar"
        Cal-->>U: Abrir formulário de edição

        U->>Cal: Modifica e salva
        Cal->>App: updateSintoma(uid, sintomaId, updates)
        App->>FS: Atualizar documento
        FS-->>App: Confirmação
        App->>Cache: Invalidar cache do mês
        App-->>Cal: Sintoma atualizado
        Cal-->>U: Atualizar interface

    else Dia sem sintomas
        Cal-->>U: Mostrar: "Nenhum sintoma registrado"
        Cal-->>U: Botão: "Registrar sintoma"

        U->>Cal: Clica em "Registrar sintoma"
        Cal-->>U: Abrir formulário (data pré-preenchida)

        U->>Cal: Preenche e salva
        Cal->>App: addSintoma(uid, sintomaData)
        App->>FS: Criar documento
        FS-->>App: Sintoma criado
        App->>Cache: Invalidar cache
        App-->>Cal: Sintoma adicionado
        Cal->>Cal: Destacar o dia no calendário
        Cal-->>U: Atualizar interface
    end

    Note over U,FS: ESTATÍSTICAS DO MÊS

    Cal->>App: calculateMonthStats(sintomas)
    App->>App: Contar sintomas por intensidade
    App->>App: Identificar dia com mais sintomas
    App->>App: Calcular sintomas por semana
    App-->>Cal: Retornar estatísticas
    Cal-->>U: Exibir resumo do mês
```

### Visualização de Intensidade no Calendário

```mermaid
graph TD
    Day[Dia no Calendário] --> HasSymptoms{Tem sintomas?}

    HasSymptoms -->|Não| Normal[Cor padrão: branco/cinza]
    HasSymptoms -->|Sim| CheckIntensity{Intensidade máxima do dia}

    CheckIntensity -->|Baixa| Green[🟢 Verde claro]
    CheckIntensity -->|Média| Yellow[🟡 Amarelo]
    CheckIntensity -->|Alta| Red[🔴 Vermelho]

    Green --> ShowCount[Mostrar quantidade: •]
    Yellow --> ShowCount
    Red --> ShowCount

    ShowCount --> OnClick{Usuário clica?}
    OnClick -->|Sim| ShowDetails[Abrir detalhes]
    OnClick -->|Não| End([Fim])

    ShowDetails --> DetailView[Exibir sintomas do dia]
    DetailView --> Actions{Ações disponíveis}

    Actions --> Edit[✏️ Editar]
    Actions --> Delete[🗑️ Excluir]
    Actions --> View[👁️ Ver detalhes]

    style Day fill:#4285f4,color:#fff
    style Green fill:#34a853,color:#fff
    style Yellow fill:#fbbc04
    style Red fill:#ea4335,color:#fff
```

---

## 10. Fluxo Completo: Dia Típico de Uso

```mermaid
journey
    title Jornada do Usuário - Dia Típico
    section Manhã (08:00)
        Recebe notificação: 5: Usuário
        Abre app: 5: Usuário
        Vê lembretes da manhã: 5: Usuário, App
        Marca Rifampicina como tomada: 5: Usuário, App, Firestore
        Marca Isoniazida como tomada: 5: Usuário, App, Firestore
        Vê taxa de adesão atualizada: 4: Usuário, App
    section Tarde (14:00)
        Sente sintomas leves: 3: Usuário
        Abre app: 4: Usuário
        Acessa "Registrar Sintoma": 5: Usuário, App
        Descreve sintoma: 5: Usuário
        Salva registro: 5: Usuário, App, Firestore
        Sintoma aparece no calendário: 5: Usuário, App
    section Noite (20:00)
        Recebe notificação: 5: Usuário
        Abre app: 5: Usuário
        Vê lembrete da noite: 5: Usuário, App
        Esqueceu o medicamento: 2: Usuário
        Marca como "Pulado": 3: Usuário, App, Firestore
        Vê taxa de adesão diminuir: 2: Usuário, App
    section Antes de dormir (22:00)
        Abre app por curiosidade: 4: Usuário
        Navega pelos InfoCards: 5: Usuário, App, Firestore
        Lê sobre "Reações Adversas": 5: Usuário, App
        Compartilha info com familiar: 5: Usuário, App
        Fecha app: 5: Usuário
```

---

## Resumo dos Domínios

### Domínios Principais:

1. **Autenticação** - Registro, login, gerenciamento de sessão
2. **Medicamentos** - CRUD de medicamentos com horários e frequências
3. **Sintomas** - Registro diário com intensidade e calendário
4. **Registros de Dose** - Tracking de adesão (tomado/pulado)
5. **InfoCards** - Conteúdo educacional sobre tuberculose
6. **Notificações** - Lembretes push (a ser implementado)
7. **Estatísticas** - Dashboards de adesão e progresso

### Integrações entre Domínios:

- **Auth → Todos** - UID usado como chave em todas as coleções
- **Medicamentos → Registros** - Referência direta via path
- **Sintomas → Calendário** - Visualização agregada por data
- **InfoCards ← Standalone** - Compartilhado entre todos os usuários

---

**Documentação gerada em:** 2025-10-23
**Versão:** 1.0
**Projeto:** Sistema de Acompanhamento de Tratamento de Tuberculose
