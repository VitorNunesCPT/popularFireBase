// Conteúdo estruturado estritamente com base em `data/new-diagnostico.md`

const diagnostico5w2h = {
  overview: {
    contexto:
      "O diagnóstico da TB é um processo complexo que combina critérios clínicos, epidemiológicos, radiológicos e laboratoriais, especialmente desafiador na infância e em imunossuprimidos.",
    metodologia:
      "Avaliação dos diagnósticos utilizando a metodologia 5W2H (O Quê, Por Quê, Onde, Quando, Quem, Como e Quanto).",
  },
  what: {
    descricao:
      "Baseia-se em múltiplos métodos e critérios porque a confirmação bacteriológica pode ser difícil, sobretudo em crianças.",
    metodosPrimarios: [
      "História clínica: avaliação de sintomas e sinais sugestivos de TB.",
      "Achados radiológicos: radiografia de tórax.",
      "História epidemiológica: contato com adulto tuberculoso (focobacilífero).",
      "Teste tuberculínico (PT/PPD) considerando vacinação BCG.",
    ],
    confirmacaoBacteriologica: [
      "Baciloscopia direta (BAAR) realizada em escarro ou outros materiais.",
      "Teste rápido molecular para tuberculose (TRM-TB) recomendado para populações vulneráveis e diversas amostras.",
      "Cultura com alta especificidade e sensibilidade, indicada para todos os casos suspeitos.",
      "Teste de sensibilidade (TS) ofertado universalmente para todos os casos de TB.",
      "Teste de lipoarabinomanano (LF-LAM) incorporado ao SUS em 2021 para rastreio e diagnóstico em PVHA/ aids.",
    ],
    criteriosConfirmacao: [
      "Laboratorial: pelo menos uma amostra positiva em baciloscopia, TRM-TB ou cultura.",
      "Clínico: exames de imagem ou histológicos sugestivos quando o critério laboratorial não é atendido; ausência de oferta laboratorial é considerada falha de serviço.",
    ],
  },
  why: {
    motivos: [
      "Diagnóstico precoce e tratamento correto interrompem a cadeia de transmissão e reduzem a incidência.",
      "Redução da mortalidade, especialmente em PVHA, ao permitir início oportuno de terapias antituberculose e antirretroviral.",
      "Avaliação de resistência com TS e TRM-TB para identificar resistência, como à rifampicina, garantindo o esquema adequado.",
    ],
  },
  where: {
    niveis: [
      "Atenção Primária à Saúde (APS/UBS): identificação do SR, solicitação de exames, orientação e coleta de escarro; uso de escore de pontuação em serviços de baixa complexidade.",
      "Rede Laboratorial (LACEN): responsável por baciloscopia, TRM-TB, cultura e TS, articulada com a Vigilância Epidemiológica e APS.",
      "Referências secundária/terciária: para casos complexos, formas extrapulmonares e TB drogarresistente.",
      "Ambientes específicos como o lavado gástrico em crianças, preferencialmente em pacientes internados ou em ambulatório com profissional experiente.",
    ],
  },
  when: {
    criterios: [
      "Rastreamento do SR: tosse ≥3 semanas (busca ativa) ou ≥2 semanas (busca passiva) na população geral.",
      "Populações vulneráveis (PVHA, PPL, indígenas, contatos, profissionais de saúde): investigar independentemente do tempo de tosse.",
      "Investigação deve iniciar imediatamente após identificação do suspeito.",
      "Entrega de resultados de baciloscopia ou TRM-TB preferencialmente até 48 horas após recebimento da amostra.",
      "Baciloscopia mensal nos casos pulmonares para monitorar a efetividade do tratamento.",
    ],
  },
  who: {
    casosSuspeitos: [
      "Qualquer pessoa com sintomas sugestivos, especialmente tosse prolongada.",
      "Crianças contato de focobacilífero.",
      "Pacientes com síndrome de impregnação bacilar (febre prolongada, perda de peso, sudorese noturna).",
      "Quadro respiratório persistente sem resposta a tratamentos.",
      "PVHA/imunodeprimidos com tosse, febre, emagrecimento ou sudorese noturna.",
      "Populações vulneráveis como PPL, PSR, indígenas e profissionais de saúde.",
    ],
    profissionais: [
      "Enfermeiro e equipe de enfermagem: identificação do SR, escuta qualificada, solicitação de exames (TRM-TB ou baciloscopia), orientação da coleta e coordenação da busca ativa.",
      "Médico: avaliação clínica final, solicitação de radiografia de tórax, início e acompanhamento do tratamento.",
    ],
  },
  how: {
    etapas: [
      "Acolhimento e rastreamento: identificação do SR, fornecimento de máscara cirúrgica e avaliação de risco.",
      "Coleta de amostras: escarro no momento da identificação (duas amostras para baciloscopia ou uma para TRM-TB); lavagem gástrica em crianças quando necessário.",
      "Encaminhamento laboratorial: envio para baciloscopia e/ou TRM-TB, sempre solicitando cultura.",
      "Uso de algoritmos/escores: em adultos/adolescentes, algoritmo baseado no TRM-TB; em crianças <10 anos, sistema de pontuação considerando quadro clínico, radiológico, contato e prova tuberculínica.",
    ],
  },
  howMuch: {
    indicadores: [
      "Critério de pontuação infantil: ≥40 pontos (diagnóstico muito provável), 30-35 pontos (diagnóstico possível) e <25 pontos (diagnóstico pouco provável).",
      "Meta nacional: identificar 1% da população adscrita como Sintomático Respiratório por ano.",
      "Cultura aumenta em até 30% o diagnóstico bacteriológico em casos pulmonares com baciloscopia negativa.",
      "LF-LAM apresenta elevado valor preditivo positivo em PVHA com CD4 ≤100 células/mm³.",
    ],
  },
};

module.exports = {
  diagnostico5w2h,
};
