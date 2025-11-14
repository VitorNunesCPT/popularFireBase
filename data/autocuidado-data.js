// Conteúdo estruturado estritamente com base em `data/new-autocuidado.md`

const autocuidado5w2h = {
  overview: {
    contexto:
      'A avaliação das "Dicas de Auto cuidado da Tuberculose" (TB) pelo método 5W2H destaca as responsabilidades e ações que a pessoa com TB deve adotar para garantir adesão ao tratamento e sucesso da cura.',
    foco: "O autocuidado está ligado à adesão e à responsabilização compartilhada entre paciente e equipe, seguindo o princípio do Cuidado Centrado na Pessoa com forte apoio da Atenção Primária à Saúde (APS).",
  },
  what: {
    adesaoUsoMedicamentos: [
      "Tomar o remédio para o tratamento da TB diariamente, sem perder nenhuma dose.",
      "Concluir o tratamento, geralmente em seis meses, salvo exceções.",
      "Seguir as orientações médicas e de enfermagem.",
      "Compreender todos os aspectos da doença, incluindo transmissão, duração do tratamento, drogas, estigmas e preconceitos.",
      "Em caso de reações adversas ou qualquer anormalidade, procurar o serviço independentemente do agendamento.",
    ],
    higieneControleInfeccaoDomicilio: [
      "Cobrir a boca e o nariz ao tossir ou espirrar com o braço ou lenços descartáveis, seguindo a etiqueta da tosse.",
      "Realizar a correta lavagem das mãos, especialmente após contato com secreções respiratórias, usando água e sabonete ou álcool gel 70%.",
      "Manter as janelas abertas para melhorar o fluxo de ar, a ventilação e a entrada de sol na residência.",
      "Assegurar a limpeza e desinfecção adequadas das superfícies dentro do quarto da pessoa em tratamento, como mesa de cabeceira, controles e mobílias.",
    ],
    estiloVidaMonitoramento: [
      "Seguir as recomendações de dieta saudável.",
      "Restringir o consumo de cigarro e álcool, com aconselhamento enfático e respeitoso para parar de fumar.",
      "Ao desenvolver sintomas como tosse seca, febre e falta de ar, procurar a UBS da área e informar que está em tratamento para a tuberculose.",
    ],
  },
  why: {
    motivos: [
      "A TB é curável em praticamente 100% dos casos sensíveis aos medicamentos, desde que o tratamento seja realizado corretamente.",
      "A não adesão reduz a possibilidade de cura, aumenta o risco de resistência aos medicamentos e eleva a mortalidade.",
      "O tratamento correto reduz a transmissão e, após 15 dias de tomada regular, a transmissão já está limitada.",
      "A adesão se relaciona a projetos de vida e motivações para viver, tendo a superação da doença como objetivo.",
    ],
  },
  where: {
    locais: [
      "Domicílio/Comunidade: envolve higiene respiratória, ventilação e adesão medicamentosa, inclusive no tratamento autoadministrado nos finais de semana.",
      "Tratamento Diretamente Observado (TDO): pode ocorrer no domicílio ou em outro local pactuado com o paciente, como trabalho ou escola.",
      "Unidade de Saúde (UBS/APS): espaço para consultas de acompanhamento, monitoramento de reações adversas e recebimento da medicação durante o TDO.",
    ],
  },
  when: {
    periodicidade: [
      "Durante todo o tratamento, a adesão medicamentosa deve ser diária, e o TDO deve ocorrer no mínimo três vezes por semana.",
      "Em caso de sintomas ou reações, o paciente deve procurar o serviço de saúde imediatamente, mesmo fora da data agendada.",
      "Durante a pandemia, o paciente deve seguir tomando o remédio diariamente e verificar na unidade de saúde como serão realizados o atendimento e os exames para evitar exposição desnecessária.",
    ],
  },
  who: {
    responsavelPrimario:
      "A pessoa com TB é o foco do cuidado centrado na pessoa e deve ser protagonista do processo de cura.",
    apoioEquipe: [
      "O enfermeiro e a equipe monitoram clinicamente os efeitos adversos e educam o paciente.",
      "O Tratamento Diretamente Observado é a estratégia fundamental da equipe para garantir a adesão e auxiliar o paciente.",
    ],
    apoioFamiliar:
      "A família deve ser orientada sobre uso de medicação, reações adversas, seguimento e controle de contatos, podendo auxiliar na administração domiciliar sem configurar TDO oficial.",
  },
  how: {
    estrategias: [
      "Utilizar o Tratamento Diretamente Observado para criar vínculo com o serviço e evitar abandono.",
      "Empregar o Projeto Terapêutico Singular para individualizar práticas de saúde, identificar barreiras e reforçar o protagonismo do paciente.",
      "Prevenir neuropatia causada pela Isoniazida com suplementação de Piridoxina (vitamina B6).",
      "Em caso de intolerância digestiva, ajustar o horário de administração dos medicamentos para, por exemplo, duas horas após o café da manhã.",
      "Articular apoio social, como cesta básica, vale-transporte e lanche, especialmente para populações vulneráveis.",
      "Usar tecnologias como telemonitoramento, Video-DOT, WhatsApp e alarmes de celular para melhorar comunicação e acompanhamento.",
    ],
  },
  howMuch: {
    metricas: [
      "Duração do autocuidado: seis meses no Esquema Básico ou 12 meses nas formas meningoencefálica e osteoarticular.",
      "Tratamento supervisionado: mínimo de 24 tomadas na fase intensiva e 48 doses na fase de manutenção em um esquema de seis meses.",
      "Suplementação de Piridoxina: 50 mg/dia para prevenir neuropatia periférica.",
    ],
    metafora:
      "O autocuidado é comparado a um navio conduzido pelo paciente até o porto seguro da cura, com o TDO funcionando como um farol diário que oferece suprimentos, orienta sobre tempestades e evita o desvio para resistência ou abandono.",
  },
};

module.exports = {
  autocuidado5w2h,
};
