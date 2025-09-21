// Dados detalhados sobre reações adversas aos medicamentos da tuberculose

const reacoesMenores = [
  {
    reacao: "Mudança da coloração da urina",
    frequencia: "Universal",
    descricao: "Urina alaranjada/avermelhada (Rifampicina)",
    manejo: "Orientação ao paciente, sem necessidade de intervenção",
  },
  {
    reacao: "Intolerância digestiva",
    frequencia: "40%",
    descricao: "Náusea, vômito, epigastralgia",
    manejo: "Reformular horário, tomar com alimentos, sintomáticos",
  },
  {
    reacao: "Alterações cutâneas",
    frequencia: "20%",
    descricao: "Prurido, exantema leve",
    manejo: "Anti-histamínicos, hidratação da pele",
  },
  {
    reacao: "Icterícia leve",
    frequencia: "15%",
    descricao: "Amarelamento leve de pele/mucosas",
    manejo: "Monitoramento, avaliar função hepática",
  },
  {
    reacao: "Dores articulares",
    frequencia: "4%",
    descricao: "Artralgia, principalmente grandes articulações",
    manejo: "Anti-inflamatórios, analgésicos",
  },
  {
    reacao: "Neuropatia periférica",
    frequencia: "Comum",
    descricao: "Formigamento, dormência (Isoniazida)",
    manejo: "Piridoxina 50-200mg/dia",
  },
];

const reacoesMaiores = [
  {
    reacao: "Hepatite medicamentosa",
    gravidade: "Grave",
    descricao: "Elevação significativa de enzimas hepáticas",
    criterio: "TGO/TGP ≥3x LSN com sintomas ou ≥5x LSN sem sintomas",
    manejo: "Suspensão imediata, reintrodução criteriosa",
  },
  {
    reacao: "Hipersensibilidade grave",
    gravidade: "Grave",
    descricao: "Exantema extenso, anafilaxia",
    criterio: "Reação cutânea extensa ou sistêmica",
    manejo: "Suspensão definitiva do fármaco responsável",
  },
  {
    reacao: "Trombocitopenia",
    gravidade: "Moderada",
    descricao: "Redução significativa de plaquetas",
    criterio: "Plaquetas <100.000/mm³",
    manejo: "Suspensão, monitoramento hematológico",
  },
  {
    reacao: "Sintomas psicóticos",
    gravidade: "Grave",
    descricao: "Alucinações, delírios, depressão grave",
    criterio: "Alterações comportamentais significativas",
    manejo: "Suspensão 1-4 semanas, antipsicóticos/antidepressivos",
  },
  {
    reacao: "Acidose lática",
    gravidade: "Grave",
    descricao: "Complicação metabólica (Linezolida)",
    criterio: "Lactato elevado com sintomas",
    manejo: "Suspensão imediata, suporte intensivo",
  },
  {
    reacao: "Distúrbios eletrolíticos",
    gravidade: "Moderada",
    descricao: "Hipopotassemia, hipomagnesemia",
    criterio: "Alterações laboratoriais significativas",
    manejo: "Reposição eletrolítica, monitoramento",
  },
];

const fatoresRisco = [
  {
    fator: "Idade",
    criterio: "≥40 anos (quarta década)",
    risco: "Alto",
    cuidados: "Monitoramento mais frequente",
  },
  {
    fator: "Uso de álcool",
    criterio: ">80g/dia",
    risco: "Muito Alto",
    cuidados: "Função hepática semanal",
  },
  {
    fator: "Desnutrição",
    criterio: "Perda >15% do peso",
    risco: "Alto",
    cuidados: "Suporte nutricional, doses ajustadas",
  },
  {
    fator: "Doença hepática prévia",
    criterio: "História de hepatopatia",
    risco: "Muito Alto",
    cuidados: "Esquemas alternativos, monitoramento intensivo",
  },
  {
    fator: "HIV avançado",
    criterio: "Imunossupressão grave",
    risco: "Muito Alto",
    cuidados: "Manejo conjunto TB-HIV, piridoxina obrigatória",
  },
];

const estrategiasManejo = {
  menores: [
    "Orientação ao paciente sobre normalidade de alguns efeitos",
    "Reformulação do horário de administração",
    "Uso de medicação sintomática (anti-histamínicos, analgésicos)",
    "Piridoxina para neuropatia periférica",
    "Orientações dietéticas",
    "Manutenção do esquema básico",
  ],
  maiores: [
    "Suspensão imediata do(s) fármaco(s) responsável(is)",
    "Reintrodução criteriosa após melhora clínica/laboratorial",
    "Substituição por esquema especial se necessário",
    "Medicação de suporte (antipsicóticos, antidepressivos)",
    "Encaminhamento para unidade de referência",
    "Notificação à Anvisa (VigiMed)",
  ],
};

const frequenciasReacoes = [
  { tipo: "Reações Maiores (Geral)", frequencia: 3, max: 8 },
  { tipo: "Interrupção Definitiva (TB DR)", frequencia: 1, max: 2 },
  { tipo: "Intolerância Digestiva", frequencia: 40, max: 40 },
  { tipo: "Alterações Cutâneas", frequencia: 20, max: 20 },
  { tipo: "Icterícia", frequencia: 15, max: 15 },
  { tipo: "Dores Articulares", frequencia: 4, max: 4 },
];

const dosagensEspeciais = [
  {
    medicamento: "Piridoxina (padrão)",
    dose: "50mg/dia",
    indicacao: "Prevenção de neuropatia",
  },
  {
    medicamento: "Piridoxina (com ARVs)",
    dose: "até 200mg/dia",
    indicacao: "PVHIV com risco aumentado",
  },
  {
    medicamento: "Critério reintrodução",
    dose: "<3x LSN",
    indicacao: "Enzimas hepáticas para retomar tratamento",
  },
  {
    medicamento: "Álcool (fator risco)",
    dose: ">80g/dia",
    indicacao: "Critério para alto risco hepatotoxicidade",
  },
];

const monitoramentoEspecial = [
  {
    parametro: "Função Hepática",
    frequencia: "Mensal ou mais frequente",
    grupos: "Usuários de álcool, hepatopatas",
    acao: "Suspensão se TGO/TGP ≥3x LSN + sintomas",
  },
  {
    parametro: "Hemograma",
    frequencia: "Mensal",
    grupos: "TB DR, PVHIV",
    acao: "Avaliar citopenias",
  },
  {
    parametro: "Função Renal",
    frequencia: "Mensal",
    grupos: "Uso de aminoglicosídeos",
    acao: "Ajuste de doses se necessário",
  },
  {
    parametro: "Avaliação Neurológica",
    frequencia: "A cada consulta",
    grupos: "Uso de Isoniazida, Linezolida",
    acao: "Piridoxina se neuropatia",
  },
];

module.exports = {
  reacoesMenores,
  reacoesMaiores,
  fatoresRisco,
  estrategiasManejo,
  frequenciasReacoes,
  dosagensEspeciais,
  monitoramentoEspecial,
};