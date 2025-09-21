// Dados detalhados sobre interações medicamentosas da tuberculose

const tiposInteracoes = {
  absorcao: [
    {
      medicamento: "Antiácidos",
      efeito: "Reduzem absorção de Rifampicina, Isoniazida, Etambutol",
      mecanismo: "Aumentam pH gástrico (fármacos antiTB precisam meio ácido)",
      manejo: "Administrar em horários separados",
    },
    {
      medicamento: "Clofazimina",
      efeito: "Diminui absorção da Rifampicina",
      mecanismo: "Competição na absorção intestinal",
      manejo: "Monitorar eficácia, considerar ajuste de dose",
    },
    {
      medicamento: "Zinco e Ferro",
      efeito: "Reduzem absorção de fluoroquinolonas",
      mecanismo: "Formação de complexos quelantes",
      manejo: "Administrar com intervalo de 2-4 horas",
    },
    {
      medicamento: "Imidazole derivados",
      efeito: "Reduzem absorção da Isoniazida",
      mecanismo: "Alteração do pH gástrico",
      manejo: "Monitorar resposta terapêutica",
    },
  ],
  metabolismo: [
    {
      medicamento: "Contraceptivos orais",
      efeito: "Rifampicina reduz eficácia",
      mecanismo: "Indução enzimática (CYP450)",
      manejo: "Métodos contraceptivos alternativos",
    },
    {
      medicamento: "Hipoglicemiantes orais",
      efeito: "Rifampicina reduz eficácia",
      mecanismo: "Indução enzimática",
      manejo: "Monitorar glicemia, ajustar doses",
    },
    {
      medicamento: "Benzodiazepínicos",
      efeito: "Isoniazida potencializa efeito",
      mecanismo: "Inibição do metabolismo",
      manejo: "Reduzir dose, monitorar sedação",
    },
    {
      medicamento: "Metformina",
      efeito: "Isoniazida diminui ação",
      mecanismo: "Interferência na ação celular",
      manejo: "Monitorar glicemia, ajustar dose",
    },
  ],
  toxicidade: [
    {
      medicamento: "Fenilhidantoína",
      efeito: "Aumenta hepatotoxicidade com Isoniazida/Rifampicina",
      mecanismo: "Sinergismo na toxicidade hepática",
      manejo: "Monitoramento hepático intensivo",
    },
    {
      medicamento: "Acetaminofen",
      efeito: "Aumenta hepatotoxicidade com Isoniazida",
      mecanismo: "Sobrecarga metabólica hepática",
      manejo: "Evitar uso concomitante ou reduzir doses",
    },
    {
      medicamento: "Antiarrítmicos",
      efeito: "Fluoroquinolonas causam bradiarritmia",
      mecanismo: "Efeitos aditivos no sistema de condução",
      manejo: "Monitoramento cardíaco, ECG",
    },
    {
      medicamento: "Agentes serotoninérgicos",
      efeito: "Linezolida causa síndrome da serotonina",
      mecanismo: "Inibição da MAO",
      manejo: "Evitar uso concomitante",
    },
  ],
};

const populacoesEspeciais = [
  {
    grupo: "PVHIV",
    riscos: [
      "Sobreposição de efeitos adversos com ARVs",
      "Neuropatia periférica potencializada",
      "Interações com inibidores de protease",
    ],
    cuidados: [
      "Esquemas sem Rifampicina são menos eficazes",
      "Considerar Rifabutina com PI/r",
      "Piridoxina profilática obrigatória",
    ],
  },
  {
    grupo: "Diabéticos",
    riscos: ["Alteração do controle glicêmico", "Interação com hipoglicemiantes", "Risco aumentado de neuropatia"],
    cuidados: ["Monitoramento glicêmico frequente", "Ajuste de doses de antidiabéticos", "Piridoxina preventiva"],
  },
  {
    grupo: "Hepatopatas",
    riscos: ["Hepatotoxicidade aumentada", "Metabolismo alterado", "Interações com outros hepatotóxicos"],
    cuidados: [
      "Monitoramento hepático intensivo",
      "Considerar esquemas alternativos",
      "Evitar álcool e hepatotóxicos",
    ],
  },
  {
    grupo: "Nefropatas",
    riscos: ["Acúmulo de medicamentos", "Toxicidade aumentada", "Alteração da eliminação"],
    cuidados: [
      "Ajuste de doses conforme clearance",
      "Administração pós-hemodiálise",
      "Monitoramento renal frequente",
    ],
  },
];

const estrategiasManejo = [
  {
    estrategia: "Ajuste de Horário",
    aplicacao: "Antiácidos vs antiTB",
    detalhes: "Intervalo de 2-4 horas entre administrações",
    eficacia: "Alta para interações de absorção",
  },
  {
    estrategia: "Substituição de Fármacos",
    aplicacao: "Rifabutina vs Rifampicina",
    detalhes: "Em pacientes com ARVs inibidores de protease",
    eficacia: "Muito alta para interações específicas",
  },
  {
    estrategia: "Ajuste de Dose",
    aplicacao: "Hipoglicemiantes, corticoides",
    detalhes: "Modificação baseada na indução enzimática",
    eficacia: "Moderada, requer monitoramento",
  },
  {
    estrategia: "Profilaxia",
    aplicacao: "Piridoxina com Isoniazida",
    detalhes: "50-100mg/dia conforme risco",
    eficacia: "Alta para prevenção de neuropatia",
  },
  {
    estrategia: "Evitar Uso Concomitante",
    aplicacao: "Linezolida + serotoninérgicos",
    detalhes: "Risco de síndrome da serotonina",
    eficacia: "Absoluta para interações graves",
  },
];

const criteriosMonitoramento = [
  {
    parametro: "Função Hepática",
    frequencia: "Mensal ou mais frequente",
    criterio: "TGO/TGP ≥3x LSN com sintomas",
    acao: "Suspensão temporária",
  },
  {
    parametro: "Glicemia",
    frequencia: "Semanal em diabéticos",
    criterio: "Descontrole glicêmico",
    acao: "Ajuste de antidiabéticos",
  },
  {
    parametro: "Função Renal",
    frequencia: "Mensal em nefropatas",
    criterio: "Alteração do clearance",
    acao: "Ajuste de doses",
  },
  {
    parametro: "ECG",
    frequencia: "Conforme indicação",
    criterio: "Alterações de condução",
    acao: "Avaliação cardiológica",
  },
];

const dosagensEspeciais = [
  {
    situacao: "Piridoxina padrão",
    dose: "50mg/dia",
    indicacao: "Prevenção de neuropatia",
  },
  {
    situacao: "Piridoxina com ARVs",
    dose: "100mg/dia",
    indicacao: "PVHIV com risco aumentado",
  },
  {
    situacao: "Rifabutina com PI/r",
    dose: "150mg 3x/semana",
    indicacao: "Redução por interação",
  },
  {
    situacao: "Restrição tiramina",
    dose: "<100mg/dia",
    indicacao: "Com Linezolida (MAO)",
  },
];

module.exports = {
  tiposInteracoes,
  populacoesEspeciais,
  estrategiasManejo,
  criteriosMonitoramento,
  dosagensEspeciais,
};