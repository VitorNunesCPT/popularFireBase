// Dados detalhados sobre transmissão da tuberculose

const mecanismoTransmissao = [
  {
    etapa: "1. Pessoa Bacilífera",
    descricao: "Paciente com TB pulmonar elimina bacilos",
    detalhes: "Tosse, espirro, fala produzem gotículas",
    risco: "Alto",
  },
  {
    etapa: "2. Aerossóis no Ar",
    descricao: "Gotículas permanecem suspensas no ambiente",
    detalhes: "Duração: 5-12 horas (conforme ventilação)",
    risco: "Variável",
  },
  {
    etapa: "3. Inalação",
    descricao: "Outras pessoas inalam as gotículas infectadas",
    detalhes: "Especialmente em locais mal ventilados",
    risco: "Alto",
  },
  {
    etapa: "4. Infecção",
    descricao: "M. tuberculosis se instala nos pulmões",
    detalhes: "Pode evoluir para doença ativa ou latente",
    risco: "Moderado",
  },
];

const fatoresRisco = [
  {
    fator: "Ventilação Inadequada",
    impacto: "Muito Alto",
    descricao: "Ambientes fechados concentram aerossóis",
    medida: "Ventilação natural/mecânica adequada",
  },
  {
    fator: "Aglomeração",
    impacto: "Alto",
    descricao: "Muitas pessoas em espaço reduzido",
    medida: "Controle de fluxo, distanciamento",
  },
  {
    fator: "Tempo de Exposição",
    impacto: "Alto",
    descricao: "Maior tempo = maior risco",
    medida: "Agilizar atendimento de SR",
  },
  {
    fator: "Carga Bacilar",
    impacto: "Muito Alto",
    descricao: "Baciloscopia positiva = maior transmissão",
    medida: "Diagnóstico e tratamento precoces",
  },
  {
    fator: "Ausência de Tratamento",
    impacto: "Máximo",
    descricao: "Paciente não tratado mantém transmissão",
    medida: "Busca ativa, início imediato do tratamento",
  },
];

const locaisRisco = [
  {
    local: "Serviços de Saúde",
    risco: "Muito Alto",
    populacao: "Profissionais, pacientes, visitantes",
    medidas: ["Triagem de SR", "Ventilação adequada", "Máscaras PFF2/N95", "Fluxo ágil"],
  },
  {
    local: "Prisões",
    risco: "Muito Alto",
    populacao: "Pessoas privadas de liberdade",
    medidas: ["Rastreamento 2x/ano", "Isolamento respiratório", "Ventilação", "Busca ativa"],
  },
  {
    local: "Domicílios",
    risco: "Alto",
    populacao: "Familiares, contatos íntimos",
    medidas: ["Investigação de contatos", "Ventilação natural", "Etiqueta da tosse"],
  },
  {
    local: "Albergues/Asilos",
    risco: "Alto",
    populacao: "Pessoas em situação de vulnerabilidade",
    medidas: ["Triagem regular", "Isolamento de casos", "Ventilação", "Educação"],
  },
  {
    local: "Hospitais (UTI/Emergência)",
    risco: "Muito Alto",
    populacao: "Pacientes graves, profissionais",
    medidas: ["Isolamento respiratório", "Pressão negativa", "EPI adequado"],
  },
];

const medidasControle = {
  administrativas: [
    "Identificação rápida de sintomáticos respiratórios",
    "Educação sobre etiqueta da tosse",
    "Oferta de máscara cirúrgica para SR",
    "Agilização do fluxo de atendimento",
    "Redução do tempo em áreas comuns",
    "Educação permanente de profissionais",
    "Protocolos de triagem e isolamento",
  ],
  ambientais: [
    "Ventilação natural adequada",
    "Ventilação mecânica quando necessário",
    "Uso de luz solar (bactericida)",
    "Isolamento respiratório com pressão negativa",
    "Renovação do ar (mínimo 6 trocas/hora)",
    "Separação de fluxos (SR vs outros pacientes)",
    "Manutenção de sistemas de ventilação",
  ],
  protecao: [
    "Máscaras PFF2/N95 para profissionais",
    "Máscaras cirúrgicas para pacientes SR",
    "EPI adequado em procedimentos de risco",
    "Treinamento sobre uso correto de EPI",
    "Teste de vedação de máscaras",
    "Substituição regular de equipamentos",
  ],
};

const cronologiaTransmissao = [
  {
    periodo: "Antes do Tratamento",
    transmissibilidade: 100,
    descricao: "Paciente bacilífero com máxima capacidade de transmissão",
    cor: "bg-red-500",
  },
  {
    periodo: "1ª Semana de Tratamento",
    transmissibilidade: 70,
    descricao: "Redução inicial da carga bacilar",
    cor: "bg-orange-500",
  },
  {
    periodo: "2ª Semana de Tratamento",
    transmissibilidade: 30,
    descricao: "Redução significativa da transmissibilidade",
    cor: "bg-yellow-500",
  },
  {
    periodo: "3ª Semana de Tratamento",
    transmissibilidade: 10,
    descricao: "Transmissibilidade muito baixa",
    cor: "bg-green-500",
  },
  {
    periodo: "Após 3 Semanas",
    transmissibilidade: 5,
    descricao: "Risco mínimo de transmissão",
    cor: "bg-green-600",
  },
];

const criteriosQuantitativos = [
  {
    parametro: "Duração da Tosse (SR)",
    populacaoGeral: "≥2-3 semanas",
    gruposRisco: "Qualquer duração",
    observacao: "Contatos, PVHIV, PPL, PSR",
  },
  {
    parametro: "Renovação do Ar",
    populacaoGeral: "6 trocas/hora",
    gruposRisco: "≥12 trocas/hora",
    observacao: "Isolamento respiratório",
  },
  {
    parametro: "Tempo para Não Transmissão",
    populacaoGeral: "2-3 semanas",
    gruposRisco: "Variável",
    observacao: "Com tratamento efetivo",
  },
  {
    parametro: "Permanência no Ambiente",
    populacaoGeral: "5-12 horas",
    gruposRisco: "Até 12 horas",
    observacao: "Conforme ventilação/luz",
  },
  {
    parametro: "Frequência TDO",
    populacaoGeral: "≥3x/semana",
    gruposRisco: "Diário",
    observacao: "Para reduzir carga bacilar",
  },
];

const populacoesVulneraveis = [
  {
    grupo: "Profissionais de Saúde",
    risco: "Ocupacional",
    exposicao: "Diária",
    protecao: "EPI, ventilação, protocolos",
  },
  {
    grupo: "Contatos Domiciliares",
    risco: "Íntimo",
    exposicao: "Prolongada",
    protecao: "Investigação, ventilação natural",
  },
  {
    grupo: "Pessoas Privadas de Liberdade",
    risco: "Institucional",
    exposicao: "Contínua",
    protecao: "Rastreamento, isolamento",
  },
  {
    grupo: "Pessoas em Situação de Rua",
    risco: "Social",
    exposicao: "Variável",
    protecao: "Busca ativa, abrigos ventilados",
  },
  {
    grupo: "PVHIV",
    risco: "Imunológico",
    exposicao: "Qualquer",
    protecao: "Diagnóstico precoce, TARV",
  },
];

module.exports = {
  mecanismoTransmissao,
  fatoresRisco,
  locaisRisco,
  medidasControle,
  cronologiaTransmissao,
  criteriosQuantitativos,
  populacoesVulneraveis,
};