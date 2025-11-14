// Conteúdo estruturado estritamente com base em `data/new-epidemiologia.md`

const epidemiologia5w2h = {
  overview: {
    contexto:
      "A tuberculose permanece um grave problema de saúde pública no Brasil, com elevada carga e desafios sociais e operacionais que motivaram o país a propor a Estratégia pelo Fim da TB na OMS.",
    foco: "A análise epidemiológica 5W2H detalha magnitude, determinantes e estratégias nacionais, evidenciando que o enfrentamento depende da integração entre vigilância, assistência e políticas sociais.",
  },
  what: {
    magnitude: [
      "O Brasil está entre os quatro países com maior número absoluto de casos de TB no mundo, respondendo por 33% dos 268 mil casos novos estimados nas Américas em 2015.",
      "Foram notificados cerca de 66.819 casos novos em 2020, com coeficiente de incidência de 31,6 casos por 100 mil habitantes.",
      "Em 2001 o SUS registrou 103.029 casos; a incidência caiu de 42,7/100 mil em 2001 para 34,2/100 mil em 2014.",
      "Em 2019 houve 4.532 óbitos por TB, equivalentes a 2,2 óbitos por 100 mil habitantes.",
      "A TB é curável em praticamente 100% dos casos sensíveis; em 2014 a cura de casos pulmonares foi 75,1% e 11,3% abandonaram o tratamento; em 2016 o sucesso foi 74,6% e o abandono 10,8%.",
    ],
  },
  why: {
    fatores: [
      "A persistência está ligada às desigualdades sociais: pobreza, moradias precárias, superlotação, insegurança alimentar, baixa escolaridade e barreiras de acesso.",
      "Há vulnerabilidades estruturais como associação com HIV, emergência de multirresistência e urbanização descontrolada.",
      "Falhas operacionais incluem barreiras de acesso e ausência ao tratamento por 30 dias consecutivos, favorecendo resistência e mortalidade.",
    ],
  },
  where: {
    distribuicao: [
      "Existe grande variabilidade estadual: em 2015 Amazonas e Rio de Janeiro tiveram incidência de 67,2/100 mil, enquanto o Distrito Federal registrou 10,5/100 mil.",
      "Rio de Janeiro e Pernambuco apresentaram os maiores coeficientes de mortalidade em 2015.",
      "O país é dividido em cenários que combinam condição socioeconômica e situação epidemiológica: o Cenário 1 predomina no Sul, Sudeste e Centro-Oeste; o Subcenário 1.3 concentrou 27,8% dos casos novos em 2015 e exibe os maiores coeficientes de TB e AIDS, além de 8% de abandono.",
      "O Cenário 2 representa regiões com condições desfavoráveis e há áreas sem notificação vizinhas a municípios com registros, sugerindo endemia oculta.",
      "O Programa Nacional descentraliza detecção, diagnóstico e acompanhamento para a Atenção Básica, porta de entrada para o manejo da TB.",
    ],
  },
  when: {
    marcos: [
      "O Brasil liderou a proposição da Estratégia pelo Fim da TB aprovada pela OMS em 2014.",
      "A TB é prioridade política do Ministério da Saúde desde 2003.",
      "O Plano Nacional pelo Fim da Tuberculose (2017/2021) define metas até 2035: incidência <10/100 mil e mortalidade <1/100 mil.",
      "Mesmo com otimização máxima das ferramentas existentes, a projeção de incidência para 2035 é 20,7/100 mil, acima da meta.",
    ],
  },
  who: {
    populacoes: [
      "Pessoas em situação de rua: risco 56 vezes maior, com altas incidências e abandono.",
      "Pessoas vivendo com HIV: risco 28 vezes maior e responsáveis por 9,5% dos casos novos em 2017; a TB é a principal causa de óbito nesse grupo.",
      "População privada de liberdade: incidência cerca de 28 vezes superior à da população geral, afetando presos, guardas e profissionais.",
      "Indígenas: risco três vezes maior, representando 3,5% dos casos novos nos municípios do Subcenário 2.3 em 2015.",
      "Outros grupos incluem homens (56% dos casos globais em 2020), idosos, etilistas, tabagistas, diabéticos e profissionais de saúde.",
    ],
    profissionais: [
      "Enfermeiros na APS lideram busca ativa de sintomáticos respiratórios, TDO e controle de contatos.",
      "A resposta exige articulação intersetorial com assistência social, segurança pública, educação e sociedade civil.",
    ],
  },
  how: {
    estrategias: [
      "O Plano Nacional enfatiza o cuidado integrado e centrado na pessoa (Pilar 1).",
      "Busca ativa de sintomáticos respiratórios na APS e no território: na população geral considera-se tosse por três semanas ou mais; em populações vulneráveis investiga-se qualquer duração.",
      "Ampliação da Rede de Teste Rápido Molecular e incentivo à cultura e teste de sensibilidade para todos os casos.",
      "Fortalecimento do Tratamento Diretamente Observado com apoio de telemonitoramento e articulação intersetorial.",
      "Oferecer incentivos como lanche, cesta básica e vale-transporte, além do acesso a programas sociais (BPC, transferência de renda) para apoiar adesão.",
      "A vigilância epidemiológica usa ferramentas como Sinan, Livro de Registro de Pessoas com TB e SITE-TB para dimensionar a doença.",
    ],
  },
  howMuch: {
    indicadores: [
      "Reduzir o abandono em casos pulmonares confirmados para 5% e elevar o percentual de cura monitorado trimestralmente.",
      "Identificar 1% da população adscrita como sintomático respiratório a cada ano.",
      "Monitorar a proporção de contatos examinados entre os identificados anualmente.",
      "Em 2017 foram diagnosticados 713 casos de TB multidrogarresistente ou resistente à rifampicina; estima-se que 3,7% dos casos novos e 20% dos previamente tratados sejam TB DR globalmente.",
    ],
  },
};

module.exports = {
  epidemiologia5w2h,
};
