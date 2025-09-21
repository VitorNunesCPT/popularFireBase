// Dados detalhados sobre reações da tuberculose e eventos adversos

const reacoesMedicamentos = {
  menores: [
    {
      reacao: "Náuseas leves",
      descricao: "Desconforto gástrico sem vômitos persistentes",
      manejo: "Tomar medicação com alimentos, não suspender tratamento",
    },
    {
      reacao: "Dor de cabeça",
      descricao: "Cefaleia leve a moderada",
      manejo: "Analgésicos simples, hidratação adequada",
    },
    {
      reacao: "Alterações digestivas leves",
      descricao: "Mudanças no apetite ou digestão",
      manejo: "Ajustes na dieta, acompanhamento clínico",
    },
  ],
  maiores: [
    {
      reacao: "Neuropatia periférica",
      descricao: "Formigamento, dormência nas mãos/pés (Isoniazida)",
      manejo: "Piridoxina (Vitamina B6), possível substituição do medicamento",
    },
    {
      reacao: "Hepatotoxicidade",
      descricao: "Alterações graves da função hepática",
      manejo: "Suspensão temporária, monitoramento laboratorial intensivo",
    },
    {
      reacao: "Acidose lática",
      descricao: "Complicação metabólica grave (Linezolida)",
      manejo: "Suspensão imediata, substituição por outro fármaco",
    },
    {
      reacao: "Alterações visuais",
      descricao: "Problemas na discriminação de cores (Etambutol)",
      manejo: "Avaliação oftalmológica, possível suspensão",
    },
  ],
};

const eventosVacina = [
  {
    evento: "Cicatriz queloide",
    descricao: "Cicatriz elevada e espessa no local da vacinação",
    gravidade: "Leve",
  },
  {
    evento: "Úlcera > 1cm",
    descricao: "Ferida aberta com diâmetro maior que 1 centímetro",
    gravidade: "Moderada",
  },
  {
    evento: "Abscesso",
    descricao: "Coleção de pus no local da vacinação",
    gravidade: "Moderada",
  },
  {
    evento: "Reação lupoide",
    descricao: "Lesão que não cicatriza adequadamente",
    gravidade: "Moderada",
  },
  {
    evento: "Enfartamento ganglionar",
    descricao: "Inchaço dos gânglios axilares (pode ser normal)",
    gravidade: "Leve",
  },
];

const populacoesRisco = [
  {
    grupo: "PVHIV",
    risco: "Neuropatia periférica potencializada por ARV",
    cuidados: "Monitoramento neurológico, ajuste de Piridoxina",
  },
  {
    grupo: "Usuários de álcool",
    risco: "Hepatotoxicidade aumentada",
    cuidados: "Monitoramento hepático mais frequente",
  },
  {
    grupo: "Crianças",
    risco: "Maior sensibilidade a efeitos adversos",
    cuidados: "Doses ajustadas, monitoramento mensal",
  },
  {
    grupo: "Adolescentes",
    risco: "Toxicidade visual por Etambutol",
    cuidados: "Avaliação oftalmológica regular",
  },
  {
    grupo: "Lactentes",
    risco: "Toxicidade via amamentação",
    cuidados: "Piridoxina para mães em tratamento",
  },
];

const dosagensVitamina = [
  {
    situacao: "Adultos (prevenção)",
    dose: "50mg/dia",
    observacao: "Dose padrão preventiva",
  },
  {
    situacao: "Com Linezolida/Terizidona",
    dose: "100mg/dia",
    observacao: "Dose aumentada para maior proteção",
  },
  {
    situacao: "Crianças TB/HIV",
    dose: "5-10mg/dia",
    observacao: "Dose ajustada ao peso",
  },
  {
    situacao: "Lactentes",
    dose: "1-2mg/kg/dia",
    observacao: "10-50mg/dia conforme peso",
  },
];

const criteriosMonitoramento = [
  {
    parametro: "TGO/TGP",
    criterio: "≥3x LSN com sintomas ou ≥5x LSN sem sintomas",
    acao: "Suspensão temporária do tratamento",
  },
  {
    parametro: "Função renal",
    criterio: "Alterações significativas",
    acao: "Ajuste de doses em nefropatas",
  },
  {
    parametro: "Discriminação cores",
    criterio: "Alterações em adolescentes",
    acao: "Investigação oftalmológica",
  },
  {
    parametro: "Sintomas neurológicos",
    criterio: "Parestesias, dormência",
    acao: "Piridoxina, avaliação neurológica",
  },
];

module.exports = {
  reacoesMedicamentos,
  eventosVacina,
  populacoesRisco,
  dosagensVitamina,
  criteriosMonitoramento,
};