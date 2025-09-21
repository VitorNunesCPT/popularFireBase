// Dados detalhados sobre sinais e sintomas da tuberculose

const sintomasClassicos = [
  {
    sintoma: "Tosse Persistente",
    descricao: "Seca ou produtiva, principal sintoma respiratório",
    duracao: "≥2-3 semanas (população geral)",
    observacao: "Qualquer duração em grupos de risco",
    frequencia: 85,
  },
  {
    sintoma: "Febre Vespertina",
    descricao: "Febre baixa, geralmente no final da tarde",
    duracao: "Persistente por semanas",
    observacao: "Pode ser o único sintoma em crianças",
    frequencia: 70,
  },
  {
    sintoma: "Sudorese Noturna",
    descricao: "Suor excessivo durante a noite",
    duracao: "Recorrente",
    observacao: "Independente da temperatura ambiente",
    frequencia: 65,
  },
  {
    sintoma: "Emagrecimento",
    descricao: "Perda de peso não intencional",
    duracao: "Progressiva",
    observacao: ">10% peso habitual (PVHIV = imunodeficiência avançada)",
    frequencia: 60,
  },
];

const sintomasFormas = {
  primaria: [
    {
      sintoma: "Irritabilidade",
      descricao: "Mudanças comportamentais em crianças",
      especificidade: "Comum em crianças",
    },
    {
      sintoma: "Inapetência",
      descricao: "Perda do apetite, recusa alimentar",
      especificidade: "Pode ser sutil",
    },
    {
      sintoma: "Febre baixa",
      descricao: "Temperatura elevada discreta",
      especificidade: "Nem sempre presente",
    },
    {
      sintoma: "Tosse ausente/leve",
      descricao: "Tosse pode não estar presente",
      especificidade: "Diferente do adulto",
    },
  ],
  secundaria: [
    {
      sintoma: "Tosse produtiva",
      descricao: "Com expectoração, pode ter sangue",
      especificidade: "Mais comum em adultos",
    },
    {
      sintoma: "Dor torácica",
      descricao: "Dor no peito ao respirar ou tossir",
      especificidade: "Relacionada à inflamação",
    },
    {
      sintoma: "Dispneia",
      descricao: "Falta de ar, dificuldade respiratória",
      especificidade: "Em casos mais avançados",
    },
    {
      sintoma: "Hemoptise",
      descricao: "Sangue no escarro",
      especificidade: "Indica lesão pulmonar",
    },
  ],
  miliar: [
    {
      sintoma: "Febre alta",
      descricao: "Temperatura elevada persistente",
      especificidade: "Forma disseminada",
    },
    {
      sintoma: "Prostração",
      descricao: "Fraqueza extrema, mal-estar geral",
      especificidade: "Comprometimento sistêmico",
    },
    {
      sintoma: "Perda de peso acentuada",
      descricao: "Emagrecimento rápido e significativo",
      especificidade: "Mais grave que outras formas",
    },
    {
      sintoma: "Sintomas neurológicos",
      descricao: "Quando há acometimento do SNC",
      especificidade: "Pode incluir convulsões",
    },
  ],
};

const sintomasPVHIV = [
  {
    sintoma: "Tosse",
    criterio: "Qualquer duração",
    observacao: "Independente do tempo",
    prioridade: "Alta",
  },
  {
    sintoma: "Febre",
    criterio: "Qualquer padrão",
    observacao: "Pode ser baixa ou alta",
    prioridade: "Alta",
  },
  {
    sintoma: "Perda de peso",
    criterio: ">10% peso habitual",
    observacao: "Indica imunodeficiência avançada",
    prioridade: "Muito Alta",
  },
  {
    sintoma: "Sudorese noturna",
    criterio: "Recorrente",
    observacao: "Sintoma sistêmico importante",
    prioridade: "Alta",
  },
];

const locaisAvaliacao = [
  {
    local: "Atenção Básica (ESF/UBS)",
    atividade: "Busca ativa permanente de SR",
    frequencia: "Todas as consultas",
    populacao: "População geral adscrita",
  },
  {
    local: "Hospitais/Emergência",
    atividade: "Triagem de sintomáticos respiratórios",
    frequencia: "Admissão e durante internação",
    populacao: "Pacientes hospitalizados",
  },
  {
    local: "Serviços para PVHIV",
    atividade: "Rastreamento dos 4 sintomas",
    frequencia: "Todas as visitas",
    populacao: "Pessoas vivendo com HIV",
  },
  {
    local: "Sistema Prisional",
    atividade: "Rastreamento de massa",
    frequencia: "Ingresso + 6 meses/1 ano",
    populacao: "Pessoas privadas de liberdade",
  },
  {
    local: "Consultório na Rua",
    atividade: "Busca ativa oportunística",
    frequencia: "Todos os contatos",
    populacao: "Pessoas em situação de rua",
  },
];

const criteriosSR = [
  {
    populacao: "População Geral (ESF)",
    criterio: "≥3 semanas",
    contexto: "Busca ativa na comunidade",
    observacao: "Critério mais restritivo",
  },
  {
    populacao: "População Geral (Serviços)",
    criterio: "≥2 semanas",
    contexto: "Procura espontânea por serviços",
    observacao: "Controle de infecção",
  },
  {
    populacao: "Contatos de TB",
    criterio: "Qualquer duração",
    contexto: "Investigação de contatos",
    observacao: "Prioridade máxima",
  },
  {
    populacao: "PVHIV",
    criterio: "Qualquer duração",
    contexto: "Todas as consultas",
    observacao: "Rastreamento obrigatório",
  },
  {
    populacao: "PPL/PSR/Institucionalizados",
    criterio: "Qualquer duração",
    contexto: "Populações vulneráveis",
    observacao: "Alto risco epidemiológico",
  },
];

const examesComplementares = [
  {
    exame: "Baciloscopia",
    indicacao: "Sintomáticos respiratórios",
    interpretacao: "+, ++, +++ indica carga bacilar",
    observacao: "Confirma transmissibilidade",
  },
  {
    exame: "TRM-TB",
    indicacao: "Diagnóstico rápido",
    interpretacao: "Detecta M. tuberculosis e resistência",
    observacao: "Resultado em 2 horas",
  },
  {
    exame: "Radiografia de Tórax",
    indicacao: "Todos os casos suspeitos",
    interpretacao: "Cavidades, infiltrados, nódulos",
    observacao: "Pode ser normal em 15% dos casos",
  },
  {
    exame: "Prova Tuberculínica",
    indicacao: "Contatos, ILTB",
    interpretacao: "≥5mm (contatos), ≥10mm (geral)",
    observacao: "Conversão: incremento ≥10mm",
  },
  {
    exame: "ADA Pleural",
    indicacao: "Suspeita TB pleural",
    interpretacao: ">40 U/L sugere TB",
    observacao: "Diagnóstico diferencial necessário",
  },
];

const monitoramentoTratamento = [
  {
    parametro: "Sintomas Respiratórios",
    frequencia: "Mensal",
    objetivo: "Melhora da tosse e dispneia",
    criterio: "Redução progressiva",
  },
  {
    parametro: "Sintomas Sistêmicos",
    frequencia: "Mensal",
    objetivo: "Resolução de febre e sudorese",
    criterio: "Desaparecimento em 2-4 semanas",
  },
  {
    parametro: "Peso Corporal",
    frequencia: "Mensal",
    objetivo: "Ganho de peso",
    criterio: "Recuperação nutricional",
  },
  {
    parametro: "Baciloscopia",
    frequencia: "2º, 4º, 5º, 6º meses",
    objetivo: "Negativação",
    criterio: "Negativa a partir do 2º mês",
  },
];

const sinaisAlerta = [
  {
    sinal: "Hemoptise volumosa",
    gravidade: "Emergência",
    acao: "Atendimento imediato",
  },
  {
    sinal: "Dispneia intensa",
    gravidade: "Grave",
    acao: "Avaliação urgente",
  },
  {
    sinal: "Febre alta persistente",
    gravidade: "Moderada",
    acao: "Investigação de complicações",
  },
  {
    sinal: "Perda de peso >15%",
    gravidade: "Grave",
    acao: "Suporte nutricional urgente",
  },
  {
    sinal: "Sintomas neurológicos",
    gravidade: "Emergência",
    acao: "Investigar TB meningoencefálica",
  },
];

module.exports = {
  sintomasClassicos,
  sintomasFormas,
  sintomasPVHIV,
  locaisAvaliacao,
  criteriosSR,
  examesComplementares,
  monitoramentoTratamento,
  sinaisAlerta,
};