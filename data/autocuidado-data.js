// Dados detalhados sobre dicas de autocuidado para tuberculose

const acoesCuidado = [
  {
    categoria: "Coleta de Exames",
    icon: "🧪",
    acoes: [
      "Coletar escarro corretamente (5-10ml)",
      "Lavar as mãos após coleta",
      "Seguir orientações para Prova Tuberculínica",
      "Retornar para leitura da PT no prazo correto",
    ],
  },
  {
    categoria: "Adesão ao Tratamento",
    icon: "💊",
    acoes: [
      "Tomar medicação conforme prescrito",
      "Usar porta-comprimidos ou caixas identificadas",
      "Comunicar dificuldades à equipe",
      "Participar do Tratamento Diretamente Observado (TDO)",
    ],
  },
  {
    categoria: "Monitoramento de Efeitos",
    icon: "⚠️",
    acoes: [
      "Estar ciente dos efeitos adversos possíveis",
      "Reportar sintomas à unidade de saúde",
      "Tomar Piridoxina (Vitamina B6) quando indicada",
      "Comparecer às consultas de acompanhamento",
    ],
  },
  {
    categoria: "Controle de Infecção",
    icon: "🛡️",
    acoes: [
      "Cobrir boca e nariz ao tossir/espirrar",
      "Garantir ventilação adequada em casa",
      "Usar máscara cirúrgica quando bacilífero",
      "Manter ambientes com luz solar",
    ],
  },
];

const importancia = [
  {
    aspecto: "Qualidade Diagnóstica",
    descricao: "Garante amostras adequadas e resultados precisos",
    impacto: "Diagnóstico correto",
  },
  {
    aspecto: "Cura da Doença",
    descricao: "Adesão ao tratamento é fundamental para cura",
    impacto: "Sucesso terapêutico",
  },
  {
    aspecto: "Prevenção de Resistência",
    descricao: "Uso correto evita bacilos resistentes",
    impacto: "Tratamento eficaz",
  },
  {
    aspecto: "Segurança do Paciente",
    descricao: "Monitoramento previne complicações",
    impacto: "Tratamento seguro",
  },
  {
    aspecto: "Controle da Transmissão",
    descricao: "Medidas reduzem risco de contágio",
    impacto: "Proteção da comunidade",
  },
];

const locaisTempos = [
  {
    local: "Em Casa",
    quando: "Diariamente",
    atividades: ["Tomar medicação", "Ventilação", "Cobrir tosse", "Coleta de escarro"],
  },
  {
    local: "Unidade de Saúde",
    quando: "Consultas agendadas",
    atividades: ["TDO", "Reportar efeitos", "Exames", "Orientações"],
  },
  {
    local: "Ambientes Públicos",
    quando: "Sempre que necessário",
    atividades: ["Medidas de controle", "Etiqueta da tosse"],
  },
  {
    local: "Trabalho",
    quando: "Durante atividades",
    atividades: ["Ventilação", "Proteção respiratória"],
  },
];

const dosagens = [
  {
    medicamento: "Isoniazida (H)",
    dose: "5-10 mg/kg/dia",
    observacao: "Dose padrão para adultos",
  },
  {
    medicamento: "Piridoxina (B6)",
    dose: "50-100 mg/dia",
    observacao: "1-2 mg/kg/dia para lactentes",
  },
  {
    medicamento: "ILTB com H",
    dose: "270 doses",
    observacao: "Ao longo de 9-12 meses",
  },
];

const sinaisAlerta = [
  "Náuseas e vômitos persistentes",
  "Dor abdominal intensa",
  "Icterícia (amarelão)",
  "Formigamento nas mãos/pés",
  "Alterações visuais",
  "Erupções na pele",
  "Febre persistente",
  "Perda auditiva",
];

module.exports = {
  acoesCuidado,
  importancia,
  locaisTempos,
  dosagens,
  sinaisAlerta,
};