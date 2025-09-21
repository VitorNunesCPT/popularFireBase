// Dados detalhados sobre prevenção da tuberculose

const estrategias = [
  {
    titulo: "Vacinação BCG",
    descricao: "Para crianças de 0 a 4 anos, 11 meses e 29 dias, idealmente ao nascer",
    objetivo: "Prevenir formas graves da doença em crianças",
  },
  {
    titulo: "Detecção de Casos",
    descricao: "Identificação precoce através de busca ativa e passiva",
    objetivo: "Identificar sintomáticos respiratórios em diversos ambientes",
  },
  {
    titulo: "Investigação de Contatos",
    descricao: "Avaliação de contatos de casos confirmados",
    objetivo: "Identificar casos de TB e pessoas recém-infectadas",
  },
  {
    titulo: "Tratamento da TB Ativa",
    descricao: "Garantir tratamento adequado e de alta qualidade",
    objetivo: "Curar pacientes e interromper transmissão",
  },
  {
    titulo: "Tratamento da ILTB",
    descricao: "Tratar infecção latente em populações de risco",
    objetivo: "Prevenir progressão para doença ativa",
  },
  {
    titulo: "Controle de Infecção",
    descricao: "Medidas administrativas, ambientais e de proteção",
    objetivo: "Reduzir transmissão em ambientes de saúde",
  },
];

const locais = [
  "Atenção Básica (principal porta de entrada)",
  "Serviços especializados e hospitais",
  "Domicílio do paciente",
  "Prisões e albergues",
  "Comunidades terapêuticas",
  "Serviços para PVHIV",
  "Laboratórios de referência",
];

const momentos = [
  "No nascimento (vacinação BCG)",
  "Quando há suspeita de TB",
  "Ao diagnosticar caso de TB ativa",
  "Durante todo o tratamento",
  "Em contatos de casos confirmados",
  "Em admissões hospitalares/prisionais",
  "Periodicamente em populações de risco",
];

const responsaveis = [
  "Equipe de saúde (todos os níveis)",
  "Autoridades e gestores de saúde",
  "Pacientes e familiares",
  "Profissionais de outros setores",
  "População em geral",
  "Agentes comunitários de saúde",
];

const implementacao = [
  "Planos e diretrizes (End TB Strategy)",
  "Organização da rede de atenção",
  "Protocolos padronizados",
  "Capacitação de profissionais",
  "Educação em saúde",
  "Sistemas de informação",
  "Parcerias intersetoriais",
  "Tratamento Diretamente Observado (TDO)",
];

const metas = [
  {
    indicador: "Incidência",
    meta: "<10 casos por 100 mil habitantes",
  },
  {
    indicador: "Mortalidade",
    meta: "<1 óbito por 100 mil habitantes",
  },
  {
    indicador: "Cobertura BCG",
    meta: "Altas e homogêneas coberturas",
  },
  {
    indicador: "Rastreamento PPL",
    meta: "2x por ano idealmente",
  },
  {
    indicador: "TDO",
    meta: "5x/semana (mínimo 3x para TB DR)",
  },
  {
    indicador: "Seguimento TB resistente",
    meta: "Pelo menos 5 anos pós-cura",
  },
];

module.exports = {
  estrategias,
  locais,
  momentos,
  responsaveis,
  implementacao,
  metas,
};