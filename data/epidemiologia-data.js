// Dados detalhados sobre epidemiologia da tuberculose

const dadosNacionais2023 = {
  incidencia: {
    valor: 32.0,
    unidade: "casos/100.000 hab",
    tendencia: "estavel",
    variacao: -2.1,
    meta2030: 20.0,
  },
  mortalidade: {
    valor: 2.2,
    unidade: "óbitos/100.000 hab",
    tendencia: "declinio",
    variacao: -5.8,
    meta2030: 1.3,
  },
  coinfeccaoHIV: {
    valor: 8.5,
    unidade: "% dos casos TB",
    tendencia: "estavel",
    variacao: 0.2,
    meta2030: 5.0,
  },
  tbDR: {
    valor: 1.8,
    unidade: "% casos novos",
    tendencia: "aumento",
    variacao: 12.5,
    meta2030: 1.0,
  },
};

const dadosRegionais = [
  {
    regiao: "Norte",
    incidencia: 45.2,
    mortalidade: 3.1,
    hivPositivo: 12.8,
    ranking: 1,
    tendencia: "aumento",
    principais: ["Amazonas: 67.8", "Roraima: 52.3", "Acre: 48.9"],
  },
  {
    regiao: "Nordeste",
    incidencia: 38.7,
    mortalidade: 2.8,
    hivPositivo: 7.2,
    ranking: 2,
    tendencia: "estavel",
    principais: ["Pernambuco: 47.1", "Ceará: 42.3", "Bahia: 35.6"],
  },
  {
    regiao: "Sudeste",
    incidencia: 28.4,
    mortalidade: 1.9,
    hivPositivo: 9.1,
    ranking: 4,
    tendencia: "declinio",
    principais: ["Rio de Janeiro: 52.8", "São Paulo: 24.7", "Espírito Santo: 23.1"],
  },
  {
    regiao: "Sul",
    incidencia: 24.1,
    mortalidade: 1.6,
    hivPositivo: 15.3,
    ranking: 5,
    tendencia: "declinio",
    principais: ["Rio Grande do Sul: 32.1", "Santa Catarina: 19.8", "Paraná: 20.4"],
  },
  {
    regiao: "Centro-Oeste",
    incidencia: 29.8,
    mortalidade: 2.1,
    hivPositivo: 8.9,
    ranking: 3,
    tendencia: "estavel",
    principais: ["Mato Grosso do Sul: 35.2", "Mato Grosso: 28.7", "Goiás: 26.1"],
  },
];

const tendenciasHistoricas = [
  { ano: 2014, incidencia: 42.7, mortalidade: 2.8, coinfeccao: 9.2 },
  { ano: 2015, incidencia: 41.5, mortalidade: 2.7, coinfeccao: 9.0 },
  { ano: 2016, incidencia: 40.2, mortalidade: 2.6, coinfeccao: 8.8 },
  { ano: 2017, incidencia: 38.9, mortalidade: 2.5, coinfeccao: 8.6 },
  { ano: 2018, incidencia: 37.1, mortalidade: 2.4, coinfeccao: 8.4 },
  { ano: 2019, incidencia: 35.8, mortalidade: 2.3, coinfeccao: 8.2 },
  { ano: 2020, incidencia: 34.2, mortalidade: 2.2, coinfeccao: 8.0 },
  { ano: 2021, incidencia: 33.5, mortalidade: 2.3, coinfeccao: 8.3 },
  { ano: 2022, incidencia: 32.7, mortalidade: 2.3, coinfeccao: 8.3 },
  { ano: 2023, incidencia: 32.0, mortalidade: 2.2, coinfeccao: 8.5 },
];

const indicadoresControle = [
  {
    indicador: "Taxa de Cura",
    valor: 73.2,
    meta: 90.0,
    status: "inadequado",
    descricao: "Percentual de casos novos curados",
    tendencia: "melhora",
  },
  {
    indicador: "Taxa de Abandono",
    valor: 11.8,
    meta: 5.0,
    status: "inadequado",
    descricao: "Percentual de casos que abandonaram tratamento",
    tendencia: "piora",
  },
  {
    indicador: "Taxa de Óbito",
    valor: 8.1,
    meta: 3.0,
    status: "inadequado",
    descricao: "Percentual de óbitos por TB",
    tendencia: "estavel",
  },
  {
    indicador: "Detecção de Casos",
    valor: 82.5,
    meta: 90.0,
    status: "adequado",
    descricao: "Percentual de casos estimados detectados",
    tendencia: "melhora",
  },
  {
    indicador: "Teste HIV",
    valor: 76.3,
    meta: 100.0,
    status: "inadequado",
    descricao: "Percentual de casos TB testados para HIV",
    tendencia: "melhora",
  },
  {
    indicador: "Cultura Realizada",
    valor: 68.4,
    meta: 100.0,
    status: "inadequado",
    descricao: "Percentual de casos com cultura solicitada",
    tendencia: "melhora",
  },
];

const populacoesVulneraveis = [
  {
    populacao: "População em Situação de Rua",
    incidencia: 1890.0,
    risco: "59x maior",
    caracteristicas: ["Desnutrição", "Alcoolismo", "Dificuldade de acesso"],
    intervencoes: ["Busca ativa", "TDO adaptado", "Apoio social"],
  },
  {
    populacao: "População Privada de Liberdade",
    incidencia: 932.0,
    risco: "29x maior",
    caracteristicas: ["Superlotação", "Ventilação inadequada", "Imunossupressão"],
    intervencoes: ["Rastreamento sistemático", "Isolamento adequado", "Tratamento supervisionado"],
  },
  {
    populacao: "Povos Indígenas",
    incidencia: 143.2,
    risco: "4.5x maior",
    caracteristicas: ["Determinantes sociais", "Acesso limitado", "Fatores genéticos"],
    intervencoes: ["Atenção diferenciada", "Capacitação local", "Respeito cultural"],
  },
  {
    populacao: "PVHIV",
    incidencia: 1250.0,
    risco: "39x maior",
    caracteristicas: ["Imunossupressão", "Formas atípicas", "Maior mortalidade"],
    intervencoes: ["Rastreamento regular", "Profilaxia ILTB", "Manejo conjunto"],
  },
];

const determinantesSociais = [
  {
    determinante: "Pobreza",
    impacto: "Alto",
    descricao: "Renda familiar <1 salário mínimo",
    rr: 3.2,
    intervencoes: ["Programas sociais", "Transferência de renda", "Apoio nutricional"],
  },
  {
    determinante: "Baixa Escolaridade",
    impacto: "Moderado",
    descricao: "Menos de 8 anos de estudo",
    rr: 2.1,
    intervencoes: ["Educação em saúde", "Materiais adaptados", "Comunicação clara"],
  },
  {
    determinante: "Aglomeração Domiciliar",
    impacto: "Alto",
    descricao: ">3 pessoas por cômodo",
    rr: 2.8,
    intervencoes: ["Melhoria habitacional", "Ventilação adequada", "Controle de contatos"],
  },
  {
    determinante: "Desnutrição",
    impacto: "Alto",
    descricao: "IMC <18.5 kg/m²",
    rr: 3.5,
    intervencoes: ["Suporte nutricional", "Suplementação", "Acompanhamento"],
  },
  {
    determinante: "Alcoolismo",
    impacto: "Alto",
    descricao: "Uso abusivo de álcool",
    rr: 4.1,
    intervencoes: ["Tratamento dependência", "Apoio psicossocial", "TDO adaptado"],
  },
];

const metasEndTB = [
  {
    meta: "Redução da Incidência",
    baseline2015: 42.7,
    meta2025: 26.0,
    meta2030: 20.0,
    meta2035: 10.0,
    atual2023: 32.0,
    progresso: 65.2,
    status: "em_progresso",
  },
  {
    meta: "Redução da Mortalidade",
    baseline2015: 2.7,
    meta2025: 1.8,
    meta2030: 1.3,
    meta2035: 0.7,
    atual2023: 2.2,
    progresso: 55.6,
    status: "em_progresso",
  },
  {
    meta: "Eliminação de Gastos Catastróficos",
    baseline2015: 45.0,
    meta2025: 20.0,
    meta2030: 0.0,
    meta2035: 0.0,
    atual2023: 28.0,
    progresso: 68.0,
    status: "em_progresso",
  },
];

const comparacaoInternacional = [
  { pais: "Brasil", incidencia: 32.0, mortalidade: 2.2, posicao: 20 },
  { pais: "Índia", incidencia: 199.0, mortalidade: 27.0, posicao: 1 },
  { pais: "Indonésia", incidencia: 354.0, mortalidade: 38.0, posicao: 2 },
  { pais: "China", incidencia: 55.0, mortalidade: 3.4, posicao: 3 },
  { pais: "Filipinas", incidencia: 650.0, mortalidade: 29.0, posicao: 4 },
  { pais: "Paquistão", incidencia: 610.0, mortalidade: 27.0, posicao: 5 },
  { pais: "África do Sul", incidencia: 513.0, mortalidade: 63.0, posicao: 6 },
  { pais: "Argentina", incidencia: 24.0, mortalidade: 1.1, posicao: 35 },
  { pais: "Chile", incidencia: 14.0, mortalidade: 0.8, posicao: 45 },
  { pais: "Uruguai", incidencia: 21.0, mortalidade: 0.9, posicao: 38 },
];

module.exports = {
  dadosNacionais2023,
  dadosRegionais,
  tendenciasHistoricas,
  indicadoresControle,
  populacoesVulneraveis,
  determinantesSociais,
  metasEndTB,
  comparacaoInternacional,
};