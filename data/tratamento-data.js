// Dados detalhados sobre tratamento da tuberculose

const esquemasBasicos = [
  {
    tipo: "Adultos/Adolescentes (≥10 anos)",
    esquema: "2RHZE/4RH",
    duracao: "6 meses",
    faseIntensiva: "2 meses (RHZE)",
    manutencao: "4 meses (RH)",
    indicacao: "Maioria das formas clínicas",
  },
  {
    tipo: "Crianças (<10 anos)",
    esquema: "2RHZ/4RH",
    duracao: "6 meses",
    faseIntensiva: "2 meses (RHZ)",
    manutencao: "4 meses (RH)",
    indicacao: "Maioria das formas clínicas",
  },
  {
    tipo: "TB Meningoencefálica/Osteoarticular (Adultos)",
    esquema: "2RHZE/10RH",
    duracao: "12 meses",
    faseIntensiva: "2 meses (RHZE)",
    manutencao: "10 meses (RH)",
    indicacao: "Formas graves do SNC e ossos",
  },
  {
    tipo: "TB Meningoencefálica/Osteoarticular (Crianças)",
    esquema: "2RHZ/10RH",
    duracao: "12 meses",
    faseIntensiva: "2 meses (RHZ)",
    manutencao: "10 meses (RH)",
    indicacao: "Formas graves do SNC e ossos",
  },
];

const esquemasTBDR = [
  {
    tipo: "TB Multidrogarresistente (MDR)",
    duracao: "18-24 meses",
    faseIntensiva: "6-8 meses",
    manutencao: "12-16 meses",
    medicamentos: "Pelo menos 4 fármacos efetivos",
    criterio: "2 culturas negativas (intensiva), 3 culturas negativas (manutenção)",
  },
  {
    tipo: "TB Extensivamente Resistente (XDR)",
    duracao: "18-24 meses",
    faseIntensiva: "6-8 meses",
    manutencao: "12-16 meses",
    medicamentos: "Pelo menos 5 fármacos efetivos",
    criterio: "Conversão após 6º mês = 24 meses total",
  },
];

const esquemaILTB = [
  {
    esquema: "6H",
    medicamento: "Isoniazida",
    duracao: "6 meses",
    doses: "180 doses",
    periodo: "6-9 meses",
  },
  {
    esquema: "9H",
    medicamento: "Isoniazida",
    duracao: "9 meses",
    doses: "270 doses",
    periodo: "9-12 meses",
  },
  {
    esquema: "4R",
    medicamento: "Rifampicina",
    duracao: "4 meses",
    doses: "120 doses",
    periodo: "4-6 meses",
  },
  {
    esquema: "3HP",
    medicamento: "Rifapentina + Isoniazida",
    duracao: "3 meses",
    doses: "12 doses semanais",
    periodo: "12-15 semanas",
  },
];

const locaisTratamento = [
  {
    local: "Atenção Básica (ESF/UBS)",
    papel: "Coordenadora do cuidado",
    casos: "TB sensível, TDO, seguimento",
    caracteristicas: ["Principal porta de entrada", "Integralidade do cuidado", "TDO domiciliar/unidade"],
  },
  {
    local: "Atenção Secundária",
    papel: "Casos especiais",
    casos: "Efeitos adversos maiores, comorbidades",
    caracteristicas: ["Elucidação diagnóstica", "Esquemas especiais", "Manejo de complicações"],
  },
  {
    local: "Atenção Terciária",
    papel: "Alta complexidade",
    casos: "TB drogarresistente, esquemas individualizados",
    caracteristicas: ["Equipe multidisciplinar", "Recursos especializados", "Casos complexos"],
  },
  {
    local: "Hospitalização",
    papel: "Casos graves",
    casos: "TB meningoencefálica, hepatotoxicidade grave",
    caracteristicas: ["Intolerância incontrolável", "RN <2kg", "Comprometimento geral"],
  },
];

const modalidadesTDO = [
  {
    modalidade: "Domiciliar",
    local: "Casa do paciente",
    responsavel: "ACS, enfermeiro",
    vantagens: "Maior adesão, vínculo familiar",
  },
  {
    modalidade: "Unidade de Saúde",
    local: "ESF, UBS, SAE",
    responsavel: "Equipe de saúde",
    vantagens: "Controle direto, facilidade logística",
  },
  {
    modalidade: "Compartilhado",
    local: "Consulta em um local, TDO em outro",
    responsavel: "Equipes coordenadas",
    vantagens: "Flexibilidade, proximidade",
  },
  {
    modalidade: "Institucional",
    local: "Prisões, albergues, asilos",
    responsavel: "Profissionais capacitados",
    vantagens: "Supervisão constante",
  },
];

const monitoramentoCronico = [
  {
    parametro: "Bacteriológico",
    frequencia: "2º, 4º, 5º, 6º meses",
    objetivo: "Negativação baciloscopia/cultura",
    criterio: "Falência se positiva no 4º mês ou final",
  },
  {
    parametro: "Clínico",
    frequencia: "Mensal (crianças), todas consultas",
    objetivo: "Evolução clínica, adesão",
    criterio: "Melhora sintomas, ganho peso",
  },
  {
    parametro: "Radiológico",
    frequencia: "A critério clínico",
    objetivo: "Evolução radiológica",
    criterio: "Melhora lesões, redução cavidades",
  },
  {
    parametro: "Laboratorial",
    frequencia: "Início + critério clínico",
    objetivo: "Função hepática/renal",
    criterio: "TGO/TGP <3x LSN, creatinina normal",
  },
];

const dosagensEspeciais = [
  {
    medicamento: "Isoniazida (máxima)",
    dose: "300mg/dia",
    populacao: "Crianças e adultos",
  },
  {
    medicamento: "Capreomicina (acumulada)",
    dose: "120g total",
    populacao: "TB DR (dose máxima)",
  },
  {
    medicamento: "Piridoxina",
    dose: "50-100mg/dia",
    populacao: "Prevenção neuropatia",
  },
  {
    medicamento: "TDO (fase intensiva)",
    dose: "24 doses",
    populacao: "Esquema 6 meses",
  },
  {
    medicamento: "TDO (manutenção)",
    dose: "48 doses",
    populacao: "Esquema 6 meses",
  },
];

const criteriosLaboratoriais = [
  {
    exame: "TGO/TGP",
    normal: "<3x LSN",
    alterado: "≥3x LSN + sintomas",
    grave: "≥5x LSN sem sintomas",
    acao: "Suspensão temporária",
  },
  {
    exame: "Clearance creatinina",
    normal: ">30ml/min",
    alterado: "10-30ml/min",
    grave: "<10ml/min",
    acao: "Ajuste de doses",
  },
  {
    exame: "CD4+ (PVHIV)",
    normal: "≥50 céls/mm³",
    alterado: "<50 céls/mm³",
    grave: "Muito baixo",
    acao: "TARV na 2ª semana",
  },
  {
    exame: "Prova Tuberculínica",
    normal: "<5mm",
    alterado: "≥5mm",
    grave: "Conversão ≥10mm",
    acao: "Investigar ILTB",
  },
];

module.exports = {
  esquemasBasicos,
  esquemasTBDR,
  esquemaILTB,
  locaisTratamento,
  modalidadesTDO,
  monitoramentoCronico,
  dosagensEspeciais,
  criteriosLaboratoriais,
};