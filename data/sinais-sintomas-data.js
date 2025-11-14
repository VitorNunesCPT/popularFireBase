// Conteúdo estruturado estritamente com base em `data/new-sinais-sintomas-data.md`

const sinais_valiacao5w2h = {
  overview: {
    destaque:
      "A tuberculose pode acometer diversos órgãos e sistemas, sendo a forma pulmonar a mais frequente e relevante pela sua capacidade de transmissão.",
  },
  what: {
    descricao:
      "Os sintomas variam conforme a forma clínica (pulmonar ou extrapulmonar) e a faixa etária do paciente.",
    adultosAdolescentes: {
      contexto: "Sintomas clássicos da TB pulmonar (adultos e adolescentes).",
      sintomas: [
        { nome: "Tosse persistente", caracteristica: "Seca ou produtiva." },
        { nome: "Febre", caracteristica: "Geralmente baixa, vespertina." },
        {
          nome: "Sudorese noturna",
          caracteristica: "Relatada como sintoma clássico.",
        },
        { nome: "Emagrecimento", caracteristica: "Perda de peso." },
        {
          nome: "Anorexia",
          caracteristica: "Diminuição de apetite (inapetência).",
        },
        {
          nome: "Fadiga/Astenia/Adinamia",
          caracteristica: "Sensação de cansaço persistente.",
        },
        {
          nome: "Expectoração",
          caracteristica: "Pode ser purulenta ou mucoide, com ou sem sangue.",
        },
        { nome: "Hemoptise", caracteristica: "Pode ocorrer em adolescentes." },
      ],
    },
    infancia: {
      faixaEtaria: "< 10 anos",
      caracteristica:
        "Sintomas geralmente inespecíficos que se confundem com infecções da infância.",
      triadeClassica: ["Redução do apetite", "Perda de peso", "Tosse crônica"],
      outrasManifestacoes: [
        "Febre persistente (acima de 38ºC, ao final da tarde)",
        "Tosse persistente com mais de duas semanas e piora progressiva",
        "Pneumonia que não melhora com tratamento antimicrobiano habitual",
        "Eritema nodoso",
        "Conjuntivite flictenular",
      ],
    },
    formasExtrapulmonares: [
      {
        forma: "TB Pleural",
        sinaisESintomas: [
          "Dor torácica pleurítica",
          "Astenia",
          "Emagrecimento",
          "Anorexia",
          "Febre",
          "Tosse seca",
        ],
      },
      {
        forma: "TB Ganglionar Periférica",
        sinaisESintomas: [
          "Aumento subagudo, indolor e assimétrico das cadeias cervicais e/ou supraclaviculares",
          "Forma extrapulmonar mais frequente em PVHIV e crianças",
        ],
      },
      {
        forma: "TB Osteoarticular (Mal de Pott)",
        sinaisESintomas: [
          "Dor lombar",
          "Dor à palpação local",
          "Sudorese noturna",
        ],
      },
    ],
  },
  why: {
    motivos: [
      "Os sintomas, especialmente a tosse prolongada, definem o Sintomático Respiratório (SR) que deve ser investigado.",
      "Diagnóstico precoce e tratamento correto interrompem a cadeia de transmissão do bacilo de Koch (BK) e reduzem a incidência da doença.",
      "Pessoas leigas raramente associam tosse e expectoração à TB, atrasando o diagnóstico e o início do tratamento.",
    ],
  },
  when: {
    criteriosTosse: [
      {
        populacao: "População Geral Adscrita (Busca Ativa)",
        duracao: "3 semanas ou mais",
        contexto: "Comunidade, visitas domiciliares, atividades comunitárias.",
      },
      {
        populacao: "População Geral (Busca Passiva)",
        duracao: "2 semanas ou mais",
        contexto:
          "Procura o serviço de saúde por qualquer motivo para controle de infecção e identificação rápida.",
      },
      {
        populacao: "Populações Vulneráveis",
        duracao: "Qualquer tempo de tosse",
        contexto:
          "PVHIV, contatos de TB ativa, População Privada de Liberdade (PPL), População em Situação de Rua (PSR), indígenas e profissionais de saúde.",
      },
    ],
    rastreamentoPVHIV:
      "Para PVHIV o rastreamento considera tosse, febre, emagrecimento ou sudorese noturna, independentemente da duração dos sintomas.",
  },
  who: {
    definicaoSuspeito:
      "Qualquer pessoa com sintomas ou sinais sugestivos de TB, em particular com tosse de longa duração.",
    gruposComApresentacaoAtipica: [
      {
        grupo: "Crianças (< 10 anos)",
        caracteristica:
          "Formas pulmonares geralmente abacilíferas, com sintomas inespecíficos.",
      },
      {
        grupo: "PVHIV/Imunossuprimidos",
        caracteristica:
          "Apresentação influenciada pelo grau de imunossupressão, com predominância de sintomas sistêmicos, padrão radiológico atípico e baciloscopia frequentemente negativa.",
      },
      {
        grupo: "Idosos",
        caracteristica:
          "Podem apresentar febre de origem obscura, fadiga, baixa atenção, baixa mobilidade, delírio e ausência de febre, com acometimento dos segmentos inferiores e menor ocorrência de cavidades.",
      },
    ],
  },
  how: {
    avaliacaoClinicaEpidemiologica: [
      {
        etapa: "História clínica",
        descricao: "Inclui avaliação dos sintomas e sinais sugestivos de TB.",
      },
      {
        etapa: "História epidemiológica",
        descricao:
          "Destaca o histórico de contato com adulto tuberculoso (focobacilífero).",
      },
      {
        etapa: "Exames",
        descricao:
          "Abrange interpretação do teste tuberculínico (PPD), achados radiológicos e pesquisa do Mycobacterium tuberculosis (escarro, lavado gástrico etc.).",
      },
    ],
    classificacaoInfantil: {
      descricao:
        "Sistema de pontuação utilizado devido à dificuldade de confirmação bacteriológica na infância.",
      criteriosPontuacao: [
        {
          criterio: "Quadro clínico",
          detalhes:
            "Febre ou sintomas como tosse, adinamia, expectoração, emagrecimento e sudorese por mais de 2 semanas",
          pontuacao: "+15",
        },
        {
          criterio: "Quadro radiológico",
          detalhes:
            "Adenomegalia hilar ou padrão miliar inalterado por mais de 2 semanas, ou condensação/infiltrado sem melhora com antibióticos",
          pontuacao: "+15",
        },
        {
          criterio: "Contato com adulto tuberculoso",
          detalhes: "Contato próximo nos últimos 2 anos",
          pontuacao: "+10",
        },
        {
          criterio: "Teste tuberculínico (PT)",
          detalhes: "Maior ou igual a 15 mm",
          pontuacao: "+15",
        },
      ],
      interpretacaoPontuacao: [
        {
          faixa: "≥ 40 pontos",
          significado: "Diagnóstico muito provável",
        },
        {
          faixa: "30 a 35 pontos",
          significado:
            "Diagnóstico possível, com recomendação de iniciar tratamento",
        },
      ],
    },
  },
  howMuch: {
    classificacaoRiscoAPS: [
      {
        nivel: "Atendimento Imediato (Alto Risco)",
        criterios:
          "Comprometimento das vias aéreas, dispneia grave, sibilos, sinais de choque, hemoptise, alteração do nível de consciência ou taquipneia (>30 irpm) em adultos, uso de musculatura acessória ou tiragem acentuada em crianças.",
      },
      {
        nivel: "Atendimento Prioritário",
        criterios: "Investigar tuberculose imediatamente.",
      },
      {
        nivel: "Atendimento no Dia",
        criterios: "Avaliar e tratar o quadro agudo e investigar TB.",
      },
    ],
    duracaoPersistencia: {
      destaque:
        "A persistência dos sintomas é característica chave da TB; tosse por três semanas ou mais é o principal critério para SR na população geral.",
      comparativo: "Em doenças como a COVID-19 o início dos sintomas é rápido.",
      alerta:
        "A tuberculose exige olhar atento porque seus sintomas podem ser 'invisíveis'; não ignorar sintomas persistentes ou inespecíficos, especialmente a tosse crônica.",
    },
  },
};

module.exports = {
  sinais_valiacao5w2h,
};
