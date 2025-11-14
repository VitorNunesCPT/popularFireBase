// Conteúdo estruturado estritamente com base em `data/new-transmissao.md`

const transmissao5w2h = {
  overview: {
    contexto:
      "A transmissão da Tuberculose (TB) é central para a epidemiologia e o controle da doença, sendo alvo das estratégias de saúde pública para interromper a cadeia de contágio.",
    metodologia:
      "Avaliação da transmissão utilizando o método 5W2H a partir das informações fornecidas.",
  },
  what: {
    descricao:
      "O que é transmitido é o agente etiológico, a bactéria Mycobacterium tuberculosis (Bacilo de Koch – BK), responsável pela doença infecciosa que atinge o sistema respiratório.",
  },
  why: {
    motivos: [
      "Diagnóstico precoce e tratamento correto dos casos bacilíferos interrompem a cadeia de transmissão e reduzem a incidência da doença a longo prazo.",
      "O abandono do tratamento ou o controle ineficaz mantêm a transmissão e elevam o risco de resistência medicamentosa e de óbitos.",
      "A TB é altamente transmissível, especialmente em populações vulneráveis como Pessoas em Situação de Rua.",
    ],
  },
  where: {
    via: "Transmissão prioritária por via aérea ou respiratória.",
    aspectos: [
      "A bactéria é exalada em aerossóis durante tosse, fala ou espirro, formando gotículas de Pflüger que secam rapidamente e se transformam em núcleos de Wells (<5-10 μm) contendo um a dois bacilos.",
      "Núcleos de Wells podem permanecer em suspensão no ar por muitas horas, alcançar os alvéolos e provocar primo-infecção; ventilação adequada em moradia e trabalho reduz o risco.",
      "Em contextos como a pandemia de COVID-19, a permanência prolongada em espaços pequenos e mal ventilados aumenta o risco de disseminação.",
      "Bacilos depositados em roupas, lençóis, copos e outros objetos dificilmente se dispersam em aerossóis e não desempenham papel relevante na transmissão.",
    ],
  },
  when: {
    momentos: [
      "O risco de transmissão persiste enquanto o paciente elimina bacilos no escarro.",
      "Após cerca de 15 dias (duas a três semanas) de tratamento efetivo, a capacidade de transmissão encontra-se muito reduzida.",
      "A cessação da transmissibilidade deve ser confirmada por exame laboratorial, especialmente baciloscopia de escarro de controle.",
    ],
  },
  who: {
    casoFonte: {
      descricao:
        "A transmissão ocorre a partir de pessoas com TB pulmonar ou laríngea que eliminam bacilos no ambiente.",
      detalhes: [
        "Bacilíferos apresentam baciloscopia positiva no escarro e têm maior capacidade de transmissão, mas cultura e TRM-TB positivos também indicam potencial de transmissão.",
        "Crianças com TB pulmonar geralmente têm baciloscopia negativa e pouca importância na cadeia de transmissão.",
      ],
    },
    pessoasEmRisco: {
      probabilidade:
        "Estima-se que 10% das pessoas infectadas adoecem (5% nos dois primeiros anos e 5% ao longo da vida na ausência de tratamento preventivo).",
      grupos: [
        "Contatos em casa, trabalho, instituições e escolas.",
        "PVHIV, PPL, PSR, indígenas e profissionais de saúde.",
        "Risco de TB ativa 20 vezes superior em PVHIV em comparação à população geral.",
        "Incidência entre a PSR pode ser até 56 vezes maior que a média nacional.",
      ],
    },
  },
  how: {
    medidas: [
      "Busca ativa de casos para identificar precocemente bacilíferos e interromper a cadeia de transmissão.",
      "Identificação e fluxo rápido do Sintomático Respiratório (SR) ou pessoa com TB pulmonar ativa.",
      "Controle de contatos para encontrar precocemente casos e recém-infectados.",
      "Educação em saúde orientando sobre etiqueta da tosse.",
      "Medidas administrativas como oferta de máscara cirúrgica ao SR e priorização do atendimento desde a triagem.",
      "Controle ambiental garantindo ventilação adequada e reduzindo o tempo de permanência do paciente bacilífero na instituição.",
      "Proteção profissional com uso de máscaras PFF2 ou N95 em áreas de alto risco, como laboratórios com cultura.",
    ],
  },
  howMuch: {
    indicadores: [
      "O tratamento da Infecção Latente pelo M. tuberculosis (ILTB) com isoniazida reduz o risco de adoecimento em 60% a 90%.",
      "O tempo entre sintomas sugestivos e diagnóstico é de aproximadamente 1 semana na busca ativa contra 6,9 semanas na busca passiva, reduzindo a exposição comunitária ao paciente bacilífero.",
      "Apesar da infecção, apenas cerca de 10% das pessoas expostas adoecem; a primo-infecção é comum em crianças e imunossuprimidos, geralmente com baixa transmissibilidade.",
    ],
  },
};

module.exports = {
  transmissao5w2h,
};
