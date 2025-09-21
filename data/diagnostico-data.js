// Dados detalhados sobre diagnóstico da tuberculose

const metodosLaboratoriais = [
  {
    metodo: "Baciloscopia (BAAR)",
    sensibilidade: 60,
    especificidade: 98,
    tempo: "Mesmo dia",
    custo: "Baixo",
    indicacao: "Sintomáticos respiratórios",
    vantagens: ["Rápido", "Baixo custo", "Identifica casos transmissores"],
    limitacoes: ["Baixa sensibilidade", "Não diferencia espécies", "Não detecta resistência"],
    interpretacao: {
      positivo: "Presença de BAAR (1+ a 3+)",
      negativo: "Ausência de BAAR",
      observacao: "Repetir em 3 amostras diferentes",
    },
  },
  {
    metodo: "TRM-TB (GeneXpert)",
    sensibilidade: 89,
    especificidade: 99,
    tempo: "2 horas",
    custo: "Moderado",
    indicacao: "Casos suspeitos, PVHIV, contatos",
    vantagens: ["Rápido", "Detecta resistência à RIF", "Alta especificidade"],
    limitacoes: ["Custo elevado", "Não detecta outras resistências", "Requer equipamento"],
    interpretacao: {
      positivo: "M. tuberculosis detectado ± resistência RIF",
      negativo: "M. tuberculosis não detectado",
      observacao: "Resultado em 2 horas",
    },
  },
  {
    metodo: "Cultura (Löwenstein-Jensen)",
    sensibilidade: 95,
    especificidade: 99,
    tempo: "2-8 semanas",
    custo: "Moderado",
    indicacao: "Casos suspeitos, teste de sensibilidade",
    vantagens: ["Padrão-ouro", "Teste de sensibilidade", "Identifica espécies"],
    limitacoes: ["Tempo prolongado", "Contaminação", "Requer laboratório especializado"],
    interpretacao: {
      positivo: "Crescimento de M. tuberculosis",
      negativo: "Ausência de crescimento",
      observacao: "Aguardar até 8 semanas",
    },
  },
  {
    metodo: "Cultura Líquida (MGIT)",
    sensibilidade: 95,
    especificidade: 99,
    tempo: "1-3 semanas",
    custo: "Alto",
    indicacao: "Casos suspeitos, monitoramento",
    vantagens: ["Mais rápido que LJ", "Automatizado", "Teste de sensibilidade"],
    limitacoes: ["Custo elevado", "Contaminação", "Equipamento especializado"],
    interpretacao: {
      positivo: "Crescimento detectado automaticamente",
      negativo: "Ausência de crescimento",
      observacao: "Resultado em 1-3 semanas",
    },
  },
];

const metodosImunologicos = [
  {
    teste: "Prova Tuberculínica (PT)",
    principio: "Hipersensibilidade tardia à tuberculina",
    aplicacao: "Intradérmica no antebraço",
    leitura: "48-72 horas após aplicação",
    interpretacao: [
      { populacao: "Contatos de TB", criterio: "≥5mm", significado: "Positivo" },
      { populacao: "PVHIV", criterio: "≥5mm", significado: "Positivo" },
      { populacao: "População geral", criterio: "≥10mm", significado: "Positivo" },
      { populacao: "Vacinados BCG", criterio: "≥15mm", significado: "Positivo" },
    ],
    limitacoes: ["Interferência da BCG", "Falso-negativo em imunossuprimidos", "Reação cruzada"],
  },
  {
    teste: "IGRA (Interferon-Gamma Release Assays)",
    principio: "Liberação de interferon-γ por linfócitos T",
    aplicacao: "Coleta de sangue venoso",
    leitura: "Laboratório especializado",
    interpretacao: [
      { populacao: "Todas", criterio: "Positivo", significado: "Infecção latente ou ativa" },
      { populacao: "Todas", criterio: "Negativo", significado: "Ausência de infecção" },
      { populacao: "Todas", criterio: "Indeterminado", significado: "Repetir teste" },
    ],
    limitacoes: ["Custo elevado", "Não diferencia ILTB de TB ativa", "Disponibilidade limitada"],
  },
];

const metodosImagem = [
  {
    exame: "Radiografia de Tórax",
    indicacao: "Todos os casos suspeitos",
    achados: {
      tbPrimaria: ["Adenomegalia hilar", "Infiltrado parenquimatoso", "Derrame pleural"],
      tbSecundaria: ["Cavitações", "Infiltrados apicais", "Fibrose", "Calcificações"],
      tbMiliar: ["Padrão miliar bilateral", "Micronódulos difusos"],
    },
    limitacoes: ["15% podem ser normais", "Inespecífico", "Não confirma diagnóstico"],
  },
  {
    exame: "Tomografia de Tórax",
    indicacao: "Casos duvidosos, complicações",
    achados: {
      vantagens: ["Maior sensibilidade", "Detecta lesões pequenas", "Avalia extensão"],
      indicacoes: ["RX normal com suspeita clínica", "Investigação de complicações", "TB extrapulmonar"],
    },
    limitacoes: ["Custo elevado", "Radiação", "Não confirma diagnóstico"],
  },
];

const fluxogramaDiagnostico = {
  adultoSintomatico: [
    {
      etapa: "1. Identificação do SR",
      criterio: "Tosse ≥2-3 semanas",
      acao: "Coletar escarro para baciloscopia",
      proxima: "Avaliar resultado",
    },
    {
      etapa: "2. Baciloscopia",
      criterio: "Positiva",
      acao: "Iniciar tratamento",
      proxima: "Tratamento TB",
    },
    {
      etapa: "3. Baciloscopia Negativa",
      criterio: "Suspeita clínica mantida",
      acao: "TRM-TB ou cultura + RX tórax",
      proxima: "Avaliar resultados",
    },
    {
      etapa: "4. TRM-TB/Cultura",
      criterio: "Positiva",
      acao: "Iniciar tratamento",
      proxima: "Tratamento TB",
    },
    {
      etapa: "5. Exames Negativos",
      criterio: "RX sugestivo + clínica",
      acao: "Tratamento empírico ou investigação adicional",
      proxima: "Avaliar resposta",
    },
  ],
  pvhiv: [
    {
      etapa: "1. Rastreamento",
      criterio: "4 sintomas (tosse, febre, sudorese, perda peso)",
      acao: "Qualquer sintoma → investigar",
      proxima: "Coleta de exames",
    },
    {
      etapa: "2. Investigação",
      criterio: "TRM-TB + RX tórax",
      acao: "Priorizar métodos rápidos",
      proxima: "Avaliar resultados",
    },
    {
      etapa: "3. Resultado Positivo",
      criterio: "Qualquer exame positivo",
      acao: "Iniciar tratamento imediatamente",
      proxima: "Tratamento TB-HIV",
    },
    {
      etapa: "4. Resultado Negativo",
      criterio: "Suspeita clínica mantida",
      acao: "Investigar TB extrapulmonar",
      proxima: "Exames específicos",
    },
  ],
  crianca: [
    {
      etapa: "1. Avaliação Clínica",
      criterio: "Sintomas + contato TB + BCG",
      acao: "Aplicar escore brasileiro",
      proxima: "Calcular pontuação",
    },
    {
      etapa: "2. Escore ≥40 pontos",
      criterio: "Muito provável",
      acao: "Iniciar tratamento",
      proxima: "Tratamento TB",
    },
    {
      etapa: "3. Escore 30-35 pontos",
      criterio: "Possível",
      acao: "Investigação adicional",
      proxima: "PT + exames",
    },
    {
      etapa: "4. Escore <30 pontos",
      criterio: "Pouco provável",
      acao: "Investigar outras causas",
      proxima: "Diagnóstico diferencial",
    },
  ],
};

const diagnosticoDiferencial = {
  tbPulmonar: [
    {
      doenca: "Pneumonia Bacteriana",
      caracteristicas: "Início agudo, febre alta, leucocitose",
      diferenciacao: "Resposta rápida a antibióticos",
      exames: "Cultura de escarro, hemograma",
    },
    {
      doenca: "Câncer de Pulmão",
      caracteristicas: "Idade >50 anos, tabagismo, hemoptise",
      diferenciacao: "Massa pulmonar, citologia",
      exames: "TC tórax, broncoscopia, biópsia",
    },
    {
      doenca: "Micoses Pulmonares",
      caracteristicas: "Área endêmica, imunossupressão",
      diferenciacao: "Exame micológico direto",
      exames: "KOH, cultura para fungos",
    },
    {
      doenca: "Silicose",
      caracteristicas: "Exposição ocupacional, pneumoconiose",
      diferenciacao: "História ocupacional, padrão radiológico",
      exames: "TC tórax, função pulmonar",
    },
  ],
  tbPleural: [
    {
      doenca: "Derrame Parapneumônico",
      caracteristicas: "Pneumonia associada, pH baixo",
      diferenciacao: "Resposta a antibióticos",
      exames: "Cultura do líquido pleural",
    },
    {
      doenca: "Neoplasia Pleural",
      caracteristicas: "Derrame hemorrágico, citologia",
      diferenciacao: "Células neoplásicas",
      exames: "Citologia, biópsia pleural",
    },
    {
      doenca: "Artrite Reumatoide",
      caracteristicas: "Artrite, fator reumatoide",
      diferenciacao: "Baixo complemento, baixa glicose",
      exames: "FR, anti-CCP, complemento",
    },
  ],
  tbGanglionar: [
    {
      doenca: "Linfoma",
      caracteristicas: "Adenomegalia indolor, sintomas B",
      diferenciacao: "Biópsia com arquitetura alterada",
      exames: "Biópsia excisional, imuno-histoquímica",
    },
    {
      doenca: "Sarcoidose",
      caracteristicas: "Adenomegalia hilar bilateral",
      diferenciacao: "Granulomas não caseosos",
      exames: "Biópsia, ECA, cálcio",
    },
    {
      doenca: "Toxoplasmose",
      caracteristicas: "PVHIV, adenomegalia cervical",
      diferenciacao: "Sorologia, resposta ao tratamento",
      exames: "IgG/IgM toxoplasma, PCR",
    },
  ],
};

const biomarcadores = [
  {
    marcador: "ADA Pleural",
    indicacao: "Suspeita TB pleural",
    valorReferencia: ">40 U/L",
    sensibilidade: 92,
    especificidade: 90,
    interpretacao: "Valores elevados sugerem TB pleural",
    limitacoes: "Pode estar elevado em linfomas, empiema",
  },
  {
    marcador: "ADA Liquórica",
    indicacao: "Suspeita TB meningoencefálica",
    valorReferencia: ">10 U/L",
    sensibilidade: 79,
    especificidade: 91,
    interpretacao: "Valores elevados sugerem TB do SNC",
    limitacoes: "Pode estar elevado em meningites bacterianas",
  },
  {
    marcador: "Interferon-γ no Líquido Pleural",
    indicacao: "TB pleural (pesquisa)",
    valorReferencia: ">200 pg/mL",
    sensibilidade: 89,
    especificidade: 97,
    interpretacao: "Alta especificidade para TB pleural",
    limitacoes: "Disponibilidade limitada, custo elevado",
  },
];

const algoritmoTratamento = [
  {
    situacao: "Baciloscopia Positiva",
    decisao: "Iniciar tratamento imediatamente",
    justificativa: "Caso transmissor confirmado",
    followUp: "Cultura para teste de sensibilidade",
  },
  {
    situacao: "TRM-TB Positivo",
    decisao: "Iniciar tratamento",
    justificativa: "Diagnóstico molecular confirmado",
    followUp: "Avaliar resistência à rifampicina",
  },
  {
    situacao: "Cultura Positiva",
    decisao: "Iniciar ou ajustar tratamento",
    justificativa: "Padrão-ouro diagnóstico",
    followUp: "Teste de sensibilidade completo",
  },
  {
    situacao: "Exames Negativos + Clínica Sugestiva",
    decisao: "Considerar tratamento empírico",
    justificativa: "Suspeita clínica forte",
    followUp: "Avaliar resposta terapêutica",
  },
];

const criteriosEspeciais = [
  {
    populacao: "Crianças <10 anos",
    criterios: [
      "Escore brasileiro ≥40 pontos",
      "Contato TB bacilífero",
      "PT ≥10mm (não vacinadas) ou ≥15mm (vacinadas)",
      "RX tórax sugestivo",
    ],
    observacao: "Diagnóstico frequentemente clínico-epidemiológico",
  },
  {
    populacao: "PVHIV",
    criterios: [
      "Qualquer sintoma dos 4 principais",
      "TRM-TB prioritário",
      "Investigar TB extrapulmonar",
      "CD4+ <200: maior risco",
    ],
    observacao: "Apresentação atípica frequente",
  },
  {
    populacao: "Contatos de TB-DR",
    criterios: [
      "TRM-TB para detectar resistência RIF",
      "Cultura obrigatória",
      "Teste de sensibilidade ampliado",
      "Investigação molecular",
    ],
    observacao: "Suspeitar resistência primária",
  },
];

module.exports = {
  metodosLaboratoriais,
  metodosImunologicos,
  metodosImagem,
  fluxogramaDiagnostico,
  diagnosticoDiferencial,
  biomarcadores,
  algoritmoTratamento,
  criteriosEspeciais,
};