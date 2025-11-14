// Conteúdo estruturado estritamente com base em `data/new-epidemiologia.md`

const epidemiologia5w2h = {
  overview: {
    contexto:
      "A Tuberculose (TB) é um grave e persistente problema de saúde pública no Brasil, destacando-se internacionalmente pela alta carga e pela complexidade dos desafios sociais e operacionais associados.",
    foco: "A análise dos dados epidemiológicos e do contexto brasileiro sob a metodologia 5W2H detalha a magnitude da TB e as estratégias nacionais de enfrentamento.",
  },
  what: {
    cargaGlobalRegional:
      "O Brasil é um dos quatro países com maior número absoluto de casos de TB no mundo e, em 2015, foi responsável por 33% dos 268 mil casos novos estimados na região das Américas.",
    casosEIncidencia: [
      "Em 2020 foram notificados cerca de 66.819 casos novos de TB no Brasil.",
      "O coeficiente de incidência em 2020 foi de 31,6 casos por 100 mil habitantes.",
      "Em 2001, o SUS registrou 103.029 casos e houve redução da incidência de 42,7 casos por 100 mil habitantes em 2001 para 34,2 em 2014.",
    ],
    mortalidade:
      "Em 2019 foram registrados 4.532 óbitos por TB, representando um coeficiente de mortalidade de 2,2 óbitos por 100 mil habitantes.",
    deteccaoETratamento: [
      "A TB é curável em praticamente 100% dos casos sensíveis aos medicamentos.",
      "Em 2014, 75,1% dos novos casos pulmonares foram curados e 11,3% abandonaram o tratamento.",
      "Em 2016, a taxa de sucesso do tratamento para casos novos foi de 74,6%, com 10,8% de abandono.",
    ],
  },
  why: {
    determinacaoSocial:
      "A persistência da TB está diretamente ligada às desigualdades e iniquidades sociais, mesmo sendo uma doença transmissível e curável.",
    fatoresSocioeconomicos: [
      "Pobreza e exclusão social.",
      "Moradias precárias e superlotação.",
      "Desigualdade na distribuição de renda.",
      "Insegurança alimentar.",
      "Baixa escolaridade.",
      "Dificuldade de acesso aos serviços de saúde.",
    ],
    vulnerabilidadesEstruturais:
      "A disseminação da doença é agravada pela associação com o HIV, pela emergência de multirresistência e pelo processo de urbanização descontrolada.",
    falhasOperacionais:
      "Barreiras no acesso e falhas na adesão ao tratamento, caracterizada como ausência por 30 dias consecutivos, contribuem para resistência e mortalidade.",
  },
  where: {
    concentracaoGeografica: [
      "O Brasil apresenta elevada variabilidade entre os estados em seus indicadores.",
      "Em 2015, Amazonas e Rio de Janeiro tiveram o maior coeficiente de incidência (67,2 casos por 100 mil habitantes) e o Distrito Federal teve o menor (10,5 por 100 mil).",
      "Nesse mesmo ano, Rio de Janeiro e Pernambuco registraram os maiores coeficientes de mortalidade.",
    ],
    cenariosEpidemiologicos: [
      "O País foi dividido em cenários que relacionam condição socioeconômica com a situação epidemiológica e operacional da TB.",
      "O Cenário 1, associado a melhores condições socioeconômicas, predomina nas regiões Sul, Sudeste e Centro-Oeste.",
      "O Subcenário 1.3, que reúne 12 capitais, notificou 27,8% dos casos novos em 2015 e apresenta o maior coeficiente de incidência de TB e AIDS, além de um alto percentual de abandono (8%).",
      "O Cenário 2 representa as demais regiões com condição socioeconômica desfavorável e a existência de áreas sem notificação vizinhas a municípios que notificaram casos sugere endemia oculta.",
    ],
    localDeAcao:
      "O Programa Nacional de Controle da Tuberculose descentraliza detecção, diagnóstico e acompanhamento para a Atenção Básica, principal porta de entrada do SUS para o manejo da TB.",
  },
  when: {
    marcoHistorico:
      "O Brasil foi o principal proponente da Estratégia pelo Fim da Tuberculose (End TB Strategy), aprovada pela OMS em 2014.",
    prioridadePolitica:
      "A TB é considerada prioritária na agenda política do Ministério da Saúde desde 2003.",
    metas2035: [
      "O Plano Nacional pelo Fim da Tuberculose (2017/2021) pretende acabar com a TB como problema de saúde pública até 2035.",
      "As metas incluem reduzir o coeficiente de incidência para menos de 10 casos por 100 mil habitantes e o coeficiente de mortalidade para menos de 1 óbito por 100 mil habitantes.",
    ],
    projecao:
      "Mesmo com otimização máxima das ferramentas existentes, o coeficiente de incidência predito para 2035 é de 20,7 casos por 100 mil habitantes, acima da meta.",
  },
  who: {
    populacoesVulneraveis: [
      {
        populacao: "Pessoas em Situação de Rua (PSR)",
        risco: "56 vezes maior",
        outrosDados:
          "Apresentam elevadas taxas de incidência e de abandono de tratamento.",
      },
      {
        populacao: "PVHIV (Pessoas Vivendo com HIV)",
        risco: "28 vezes maior",
        outrosDados:
          "9,5% dos casos novos de TB em 2017 apresentavam coinfecção HIV e a TB é a doença oportunista que mais leva PVHIV a óbito.",
      },
      {
        populacao: "População Privada de Liberdade (PPL)",
        risco: "28 vezes maior",
        outrosDados:
          "A incidência nas prisões é cerca de 28 vezes superior à da população geral e o risco é compartilhado entre presos, guardas e profissionais.",
      },
      {
        populacao: "Indígenas",
        risco: "3 vezes maior",
        outrosDados:
          "Em 2015, 3,5% dos casos novos nos municípios do Subcenário 2.3 eram indígenas.",
      },
      {
        populacao: "Outros",
        risco:
          "Homens (56% dos casos globais em 2020), idosos, etilistas, tabagistas, diabéticos e profissionais de saúde.",
        outrosDados: "",
      },
    ],
    profissionaisEnvolvidos: [
      "Enfermeiros têm papel essencial na prevenção e controle da TB na APS, conduzindo busca ativa de sintomáticos respiratórios, TDO e controle de contatos.",
      "O enfrentamento da doença requer articulação intersetorial com assistência social, segurança pública, educação e sociedade civil.",
    ],
  },
  how: {
    cuidadoCentradoNaPessoa:
      "O Plano Nacional prioriza o cuidado integrado e centrado na pessoa (Pilar 1).",
    buscaAtivaDeteccao: [
      "A busca ativa de sintomáticos respiratórios é prioridade e deve ser realizada de forma rotineira na APS e no território.",
      "Na população geral, considera-se sintomático respiratório quem tem tosse por três semanas ou mais; em populações vulneráveis (PPL, PVHIV, profissionais de saúde), a investigação deve ocorrer para qualquer duração do sintoma.",
    ],
    diagnosticoEtecnologias: [
      "O Brasil investe na Rede de Teste Rápido Molecular (TRM-TB).",
      "Há incentivo à ampliação da realização de cultura e teste de sensibilidade para todos os casos.",
    ],
    adesaoETdo: [
      "O Tratamento Diretamente Observado é ação central para apoiar a adesão.",
      "Estratégias como telemonitoramento e articulação intersetorial são incentivadas para otimizar o TDO.",
    ],
    apoioSocial:
      "A oferta de incentivos como lanche, cesta básica, vale-transporte e o acesso a programas de assistência social (BPC, transferência de renda) auxiliam na adesão em populações com vulnerabilidade social.",
    vigilancia:
      "A Vigilância Epidemiológica busca conhecer a magnitude da doença e utiliza instrumentos como o Sinan, o Livro de Registro de Pessoas com Tuberculose e o SITE-TB para tratamentos especiais.",
  },
  howMuch: {
    metasEDesfechos: [
      "Reduzir o abandono de tratamento para TB pulmonar confirmada laboratorialmente para 5%.",
      "Aumentar o percentual de cura monitorado trimestralmente.",
    ],
    vigilanciaDeCasos:
      "Identificar 1% da população adscrita como sintomático respiratório ao ano.",
    investigacaoDeContatos:
      "Avaliar a proporção de contatos examinados entre os identificados ao ano.",
    tbResistente:
      "Em 2017 foram diagnosticados 713 casos de multidrogarresistência ou resistência à rifampicina, e estima-se que 3,7% dos casos novos e 20% dos tratados anteriormente sejam TB drogarresistente globalmente.",
  },
};

module.exports = {
  epidemiologia5w2h,
};
