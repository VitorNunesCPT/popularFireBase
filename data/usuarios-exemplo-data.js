// Dados de exemplo para teste do sistema de acompanhamento de tratamento

// Usuário de teste
const usuarioTeste = {
  nome: "João Silva",
  email: "joao.silva@exemplo.com",
  dataNascimento: "1985-03-15",
  telefone: "+55 11 98765-4321",
  criadoEm: new Date("2025-10-01T10:00:00Z"),
  atualizadoEm: new Date("2025-10-01T10:00:00Z"),
};

// Medicamentos de exemplo com diferentes frequências
const medicamentosExemplo = [
  {
    id: "med_001",
    nome: "Rifampicina",
    dosagem: "600mg",
    frequencia: "diaria",
    horarios: ["08:00", "20:00"],
    observacoes: "Tomar com alimentos. Pode deixar urina avermelhada (normal).",
    dataInicio: "2025-10-01T00:00:00Z",
    dataFim: "2026-04-01T00:00:00Z", // 6 meses de tratamento
    criadoEm: "2025-10-01T10:30:00Z",
  },
  {
    id: "med_002",
    nome: "Isoniazida",
    dosagem: "300mg",
    frequencia: "diaria",
    horarios: ["08:00"],
    observacoes: "Tomar em jejum ou 1h antes das refeições.",
    dataInicio: "2025-10-01T00:00:00Z",
    dataFim: "2026-04-01T00:00:00Z",
    criadoEm: "2025-10-01T10:30:00Z",
  },
  {
    id: "med_003",
    nome: "Pirazinamida",
    dosagem: "1500mg",
    frequencia: "diaria",
    horarios: ["08:00"],
    observacoes: "Tomar junto com a Isoniazida.",
    dataInicio: "2025-10-01T00:00:00Z",
    dataFim: "2025-12-01T00:00:00Z", // Apenas 2 meses (fase intensiva)
    criadoEm: "2025-10-01T10:30:00Z",
  },
  {
    id: "med_004",
    nome: "Etambutol",
    dosagem: "1200mg",
    frequencia: "diaria",
    horarios: ["08:00"],
    observacoes: "Atenção: pode causar alterações na visão. Avisar médico se tiver visão turva.",
    dataInicio: "2025-10-01T00:00:00Z",
    dataFim: "2025-12-01T00:00:00Z", // Apenas 2 meses (fase intensiva)
    criadoEm: "2025-10-01T10:30:00Z",
  },
  {
    id: "med_005",
    nome: "Vitamina B6 (Piridoxina)",
    dosagem: "50mg",
    frequencia: "diaria",
    horarios: ["08:00"],
    observacoes: "Ajuda a prevenir efeitos colaterais da Isoniazida.",
    dataInicio: "2025-10-01T00:00:00Z",
    dataFim: "2026-04-01T00:00:00Z",
    criadoEm: "2025-10-01T10:30:00Z",
  },
];

// Sintomas registrados ao longo de uma semana
const sintomasExemplo = [
  {
    id: "sint_001",
    data: "2025-10-15T00:00:00Z",
    descricao: "Tosse seca persistente, febre baixa (37.8°C)",
    intensidade: "media",
    observacoes: "Piorou durante a noite",
    criadoEm: "2025-10-15T22:30:00Z",
  },
  {
    id: "sint_002",
    data: "2025-10-16T00:00:00Z",
    descricao: "Tosse com catarro, cansaço",
    intensidade: "media",
    observacoes: "Melhorou um pouco comparado a ontem",
    criadoEm: "2025-10-16T19:45:00Z",
  },
  {
    id: "sint_003",
    data: "2025-10-17T00:00:00Z",
    descricao: "Sudorese noturna intensa",
    intensidade: "alta",
    observacoes: "Acordei com roupa molhada de suor",
    criadoEm: "2025-10-17T07:15:00Z",
  },
  {
    id: "sint_004",
    data: "2025-10-18T00:00:00Z",
    descricao: "Tosse diminuiu, mas ainda presente",
    intensidade: "baixa",
    observacoes: "Começando a me sentir melhor",
    criadoEm: "2025-10-18T20:00:00Z",
  },
  {
    id: "sint_005",
    data: "2025-10-19T00:00:00Z",
    descricao: "Dor leve no peito ao tossir",
    intensidade: "baixa",
    observacoes: "",
    criadoEm: "2025-10-19T14:30:00Z",
  },
  {
    id: "sint_006",
    data: "2025-10-20T00:00:00Z",
    descricao: "Febre voltou (38.2°C), cansaço extremo",
    intensidade: "alta",
    observacoes: "Tomei paracetamol. Vou avisar o médico.",
    criadoEm: "2025-10-20T16:20:00Z",
  },
  {
    id: "sint_007",
    data: "2025-10-22T00:00:00Z",
    descricao: "Sintomas bem controlados, só tosse leve ocasional",
    intensidade: "baixa",
    observacoes: "Tratamento parece estar funcionando!",
    criadoEm: "2025-10-22T21:00:00Z",
  },
];

// Registros de doses (histórico de medicação tomada ou pulada)
const registrosDoseExemplo = [
  // 15/10/2025 - Rifampicina
  {
    id: "reg_001",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-15T08:00:00Z",
    horarioTomado: "2025-10-15T08:05:00Z",
    status: "tomado",
  },
  {
    id: "reg_002",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-15T20:00:00Z",
    horarioTomado: "2025-10-15T20:15:00Z",
    status: "tomado",
  },
  // 15/10/2025 - Isoniazida
  {
    id: "reg_003",
    medicamentoRef: "med_002",
    nomeMedicamento: "Isoniazida",
    dosagem: "300mg",
    horarioAgendado: "2025-10-15T08:00:00Z",
    horarioTomado: "2025-10-15T08:05:00Z",
    status: "tomado",
  },
  // 16/10/2025 - Rifampicina
  {
    id: "reg_004",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-16T08:00:00Z",
    horarioTomado: "2025-10-16T08:10:00Z",
    status: "tomado",
  },
  {
    id: "reg_005",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-16T20:00:00Z",
    horarioTomado: null,
    status: "pulado",
  },
  // 16/10/2025 - Isoniazida
  {
    id: "reg_006",
    medicamentoRef: "med_002",
    nomeMedicamento: "Isoniazida",
    dosagem: "300mg",
    horarioAgendado: "2025-10-16T08:00:00Z",
    horarioTomado: "2025-10-16T08:10:00Z",
    status: "tomado",
  },
  // 17/10/2025 - Rifampicina
  {
    id: "reg_007",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-17T08:00:00Z",
    horarioTomado: "2025-10-17T08:00:00Z",
    status: "tomado",
  },
  {
    id: "reg_008",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-17T20:00:00Z",
    horarioTomado: "2025-10-17T20:03:00Z",
    status: "tomado",
  },
  // 18/10/2025 - Todos os medicamentos
  {
    id: "reg_009",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-18T08:00:00Z",
    horarioTomado: "2025-10-18T08:07:00Z",
    status: "tomado",
  },
  {
    id: "reg_010",
    medicamentoRef: "med_002",
    nomeMedicamento: "Isoniazida",
    dosagem: "300mg",
    horarioAgendado: "2025-10-18T08:00:00Z",
    horarioTomado: "2025-10-18T08:07:00Z",
    status: "tomado",
  },
  {
    id: "reg_011",
    medicamentoRef: "med_003",
    nomeMedicamento: "Pirazinamida",
    dosagem: "1500mg",
    horarioAgendado: "2025-10-18T08:00:00Z",
    horarioTomado: "2025-10-18T08:07:00Z",
    status: "tomado",
  },
  {
    id: "reg_012",
    medicamentoRef: "med_004",
    nomeMedicamento: "Etambutol",
    dosagem: "1200mg",
    horarioAgendado: "2025-10-18T08:00:00Z",
    horarioTomado: "2025-10-18T08:07:00Z",
    status: "tomado",
  },
  {
    id: "reg_013",
    medicamentoRef: "med_005",
    nomeMedicamento: "Vitamina B6 (Piridoxina)",
    dosagem: "50mg",
    horarioAgendado: "2025-10-18T08:00:00Z",
    horarioTomado: "2025-10-18T08:07:00Z",
    status: "tomado",
  },
  // 19/10/2025 - Manhã tomado, noite pulado
  {
    id: "reg_014",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-19T08:00:00Z",
    horarioTomado: "2025-10-19T08:12:00Z",
    status: "tomado",
  },
  {
    id: "reg_015",
    medicamentoRef: "med_001",
    nomeMedicamento: "Rifampicina",
    dosagem: "600mg",
    horarioAgendado: "2025-10-19T20:00:00Z",
    horarioTomado: null,
    status: "pulado",
  },
];

// Tipos de frequência suportados (para referência)
const tiposFrequencia = {
  diaria: {
    label: "Diária",
    descricao: "Tomar todos os dias nos horários especificados",
  },
  semanal: {
    label: "Semanal",
    descricao: "Tomar em dias específicos da semana",
    exemploDias: ["segunda", "quarta", "sexta"], // 3x por semana
  },
  personalizada: {
    label: "Personalizada",
    descricao: "Intervalo personalizado (ex: a cada 8 horas, a cada 12 horas)",
    exemploIntervalo: "8h", // a cada 8 horas
  },
};

// Intensidades de sintomas (para referência)
const intensidadesSintomas = ["baixa", "media", "alta"];

// Status de registro de dose (para referência)
const statusRegistro = ["tomado", "pulado"];

module.exports = {
  usuarioTeste,
  medicamentosExemplo,
  sintomasExemplo,
  registrosDoseExemplo,
  tiposFrequencia,
  intensidadesSintomas,
  statusRegistro,
};
