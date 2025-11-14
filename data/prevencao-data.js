// Conteúdo estruturado estritamente com base em `data/new-prevencao.md`

const prevencao5w2h = {
  overview: {
    contexto:
      "A prevenção da Tuberculose é um pilar central da End TB Strategy, abrangendo vacinação neonatal, busca ativa e tratamento de pessoas infectadas para evitar adoecimento.",
    foco: "O controle da doença depende da integração de ações que vão do diagnóstico precoce ao manejo programático dos contatos, sempre com base em evidências nacionais e globais.",
  },
  what: {
    medidas: [
      "Diagnóstico e tratamento oportuno: as melhores medidas de prevenção e controle são o diagnóstico precoce e o tratamento completo até a cura, interrompendo a cadeia de transmissão.",
      "Vacinação BCG: medida preventiva complementar que protege principalmente contra as formas graves em crianças menores de 5 anos.",
      "Tratamento Preventivo da Tuberculose (TPT/ILTB): administração de Isoniazida ou outros fármacos em pessoas infectadas para evitar o adoecimento.",
      "Busca ativa de casos: rastreamento sistemático baseado sobretudo na tosse persistente em populações-alvo.",
      "Controle de contatos: atividade programática essencial para diagnosticar doença ativa não detectada e identificar infectados com maior vulnerabilidade.",
      "Medidas de controle de infecção: ações administrativas, de controle ambiental e de proteção respiratória para reduzir a transmissão.",
    ],
  },
  why: {
    objetivos: [
      "Alcançar metas globais e nacionais: reduzir a incidência para menos de 10 casos por 100 mil habitantes e a mortalidade para menos de 1 óbito por 100 mil habitantes até 2035.",
      "Reduzir a transmissão: diagnosticar e tratar precocemente casos bacilíferos para interromper a cadeia de transmissão.",
      "Proteger vidas e evitar formas graves: o tratamento da ILTB reduz o risco de adoecimento em 60% a 90%, reduz mortalidade em PVHIV e a vacina BCG previne formas graves em crianças.",
    ],
  },
  where: {
    locais: [
      "Atenção Primária à Saúde: nível central para o cuidado, detecção de casos e controle de contatos, incluindo busca ativa no território.",
      "Serviços de vacinação: responsáveis pela vacinação universal com BCG no Brasil.",
      "Ambientes de alto risco e serviços de saúde: unidades hospitalares, prisões e serviços que atendem PVHIV devem adotar medidas de controle de infecção.",
      "Laboratórios: precisam de biossegurança rigorosa devido ao risco de produção de aerossóis durante o diagnóstico bacteriológico.",
    ],
  },
  when: {
    diretrizes: [
      "Vacinação BCG em dose única o mais cedo possível, preferencialmente nas primeiras 12 horas de vida, exceto para recém-nascidos contatos de bacilíferos, que devem aguardar o tratamento ou a quimioprofilaxia primária.",
      "Busca ativa na população geral: tosse por 3 semanas ou mais na comunidade e por 2 semanas ou mais no serviço de saúde.",
      "Populações vulneráveis como PVHIV, PPL, profissionais de saúde, indígenas e contatos devem ser investigadas independentemente do tempo de tosse.",
      "Controle de contatos deve ser iniciado logo após o diagnóstico do caso índice; se a PT for negativa, repetir em 8 semanas para verificar conversão.",
    ],
  },
  who: {
    populacoesAlvo: [
      "Crianças menores de 10 anos: prioridade para vacinação BCG e tratamento da ILTB.",
      "Recém-nascidos coabitantes de caso bacilífero: necessitam de quimioprofilaxia primária com H ou R.",
      "Pessoas Vivendo com HIV: prioridade para tratamento da ILTB, rastreamento sistemático e início precoce da TARV.",
      "Contatos próximos de adultos bacilíferos com TB pulmonar ou laríngea.",
      "Profissionais de saúde: devem realizar exames admissionais e periódicos anuais para ILTB.",
      "Outros grupos em risco: PPL, população em situação de rua, indígenas, imigrantes e pessoas em uso de imunossupressores.",
    ],
    responsaveis: [
      "Enfermeiro e equipe de enfermagem: executam busca ativa, controle de contatos, orientações de escarro, monitoram BCG e articulam ações na APS.",
      "Vigilância Epidemiológica: conhece a magnitude e distribuição da doença e subsidia as ações de controle.",
      "Programas de controle como o PNCT: promovem integração intersetorial com assistência social, educação, habitação e segurança pública.",
    ],
  },
  how: {
    estrategias: [
      "Intensificar a busca ativa de sintomáticos respiratórios na UBS e no território por meio de acolhimento, triagem e visitas domiciliares.",
      "Implementar o TPT/ILTB com esquemas recomendados como 6H, 9H, 4R ou 3HP, notificando e monitorando o tratamento.",
      "Aplicar medidas administrativas e de proteção na UBS: rastrear o SR, ofertar máscara cirúrgica, garantir higiene das mãos e etiqueta respiratória e priorizar o atendimento.",
      "Executar o fluxo de controle de contatos com Prova Tuberculínica e radiografia de tórax para diferenciar não infectados, ILTB e TB ativa.",
      "Promover manejo intersetorial com assistência social e educação, ofertando apoio como cestas básicas ou vale-transporte para sustentar a adesão.",
    ],
  },
  howMuch: {
    indicadores: [
      "Meta de rastreamento: identificar 1% da população adscrita como sintomático respiratório ao ano.",
      "Eficácia da ILTB: tratamento com H reduz o risco de adoecimento por TB ativa em 60% a 90%.",
      "Conversão da PT em adultos: incremento de pelo menos 10 mm indica infecção recente e necessidade de tratar ILTB.",
      "Cobertura vacinal: manter altas e homogêneas coberturas de BCG.",
    ],
    metafora:
      "A prevenção da TB é comparada à construção de um muro de proteção em camadas: a BCG é a fundação para evitar colapsos, a busca ativa e o tratamento oportuno formam a muralha principal e o tratamento da ILTB e as medidas de controle de infecção agem como sentinelas que barram o bacilo antes de atingir os mais vulneráveis.",
  },
};

module.exports = {
  prevencao5w2h,
};
