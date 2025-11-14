// Conteúdo estruturado estritamente com base em `data/new-TB-HIV.md`

const tbHiv5w2h = {
  overview: {
    contexto:
      "A coinfecção TB-HIV é um dos maiores desafios de saúde pública globais e, no Brasil, a tuberculose é a doença oportunista que mais leva Pessoas Vivendo com HIV (PVHIV) a óbito.",
    foco: "A presença simultânea das duas doenças exige manejo integrado porque a TB ativa é muito mais frequente em PVHIV e a condução inadequada aumenta mortalidade, resistência e falha terapêutica.",
  },
  what: {
    caracteristicas: [
      "O HIV é o maior fator de risco para adoecimento por TB ativa, elevando o risco em cerca de 20 vezes em comparação à população geral.",
      "PVHIV apresentam maior possibilidade de formas atípicas e graves de tuberculose, incluindo variantes resistentes e multirresistentes.",
      "A apresentação clínica depende do grau de imunossupressão: com CD4 < 200 céls/mm³ predominam sintomas sistêmicos e formas extrapulmonares; a baciloscopia pode ser negativa.",
      "A Síndrome Inflamatória da Reconstituição Imune (SIRI) pode ocorrer após o início da TARV, com agravamento respiratório, aumento ou fistulização de linfonodos e piora neurológica.",
    ],
  },
  why: {
    motivos: [
      "A coinfecção impacta fortemente a mortalidade e a letalidade por AIDS e TB, sendo a tuberculose a principal causa de óbito em PVHIV.",
      "Iniciar a TARV de forma oportuna durante o tratamento da TB reduz a mortalidade entre 54% e 95% e melhora a qualidade de vida.",
      "A coexistência das doenças aumenta a ocorrência de falha terapêutica, recidiva e resistência aos fármacos antiTB.",
      "Há sobreposição de efeitos adversos e interações medicamentosas complexas entre antirretrovirais e fármacos antiTB.",
    ],
  },
  where: {
    locais: [
      "Toda pessoa com TB ativa deve receber oferta do teste diagnóstico para HIV, preferencialmente o teste rápido.",
      "A Atenção Primária à Saúde realiza o rastreamento de TB em PVHIV e indica o Tratamento Preventivo da Tuberculose.",
      "Serviços de Atenção Especializada ou Unidades Dispensadoras de Medicamentos conduzem o tratamento da TB e o início oportuno da TARV.",
      "A integração TB-HIV recomenda concentrar o cuidado das pessoas coinfectadas em um mesmo serviço, articulando toda a rede.",
    ],
  },
  when: {
    rastreamento:
      "O rastreamento de TB em PVHIV deve ser realizado em todas as visitas aos serviços, investigando tosse independente da duração, febre, perda de peso e sudorese noturna.",
    inicioTarv: [
      "LT-CD4+ < 50 céls/mm³ ou sinais de imunodeficiência avançada: iniciar TARV em até 2 semanas após o início do tratamento da TB.",
      "LT-CD4+ ≥ 50 céls/mm³ e sem sinais de imunodeficiência: iniciar TARV na 8ª semana, ao final da fase intensiva.",
      "Tuberculose meningoencefálica: iniciar TARV preferencialmente entre quatro e seis semanas após o início do tratamento da TB.",
      "O início concomitante da TARV e do tratamento da TB é contraindicado devido ao aumento de intolerância e abandono.",
    ],
  },
  who: {
    alvos: [
      "Pessoas Vivendo com HIV são prioridade para rastreamento sistemático de TB, tratamento da ILTB e devem ser testadas para HIV quando diagnosticadas com TB.",
      "Contatos de PVHIV com TB devem ser investigados em qualquer forma clínica para identificar o caso fonte.",
    ],
    responsaveis: [
      "Enfermeiros conduzem a busca ativa de TB em todas as visitas das PVHIV e ofertam o teste rápido de HIV a quem tem TB.",
      "Equipes multiprofissionais nos serviços especializados são essenciais para o cuidado integral, inclusive frente a transtornos mentais, uso de substâncias, estigma e preconceito.",
    ],
  },
  how: {
    diagnosticoERastreio: [
      "LF-LAM em urina foi incorporado ao SUS para rastrear e diagnosticar TB em PVHIV, com alto valor preditivo positivo quando CD4 ≤ 100 céls/mm³.",
      "O TRM-TB é prioritário pela rapidez e capacidade de detectar resistência à Rifampicina.",
      "Deve-se insistir na coleta de escarro e em exames complementares, inclusive procedimentos invasivos, devido à frequência de formas extrapulmonares.",
    ],
    tratamentoTBAtiva: [
      "O esquema da TB em PVHIV segue as mesmas recomendações dos não infectados, inclusive duração de seis meses na maioria dos casos.",
      "O Tratamento Diretamente Observado é ferramenta valiosa para apoiar a adesão simultânea aos dois tratamentos.",
      "Consultas devem ser mais frequentes e regulares durante o tratamento devido ao risco de interações e efeitos adversos.",
    ],
    interacoesEManejo: [
      "A Rifampicina reduz níveis séricos de vários ARV, sobretudo inibidores de protease e Dolutegravir, aumentando o risco de falha da TARV.",
      "Esquema ARV preferencial durante uso de Rifampicina: Tenofovir 300 mg + Lamivudina 300 mg uma vez ao dia, associados a Dolutegravir 50 mg a cada 12 horas.",
      "A Rifabutina pode substituir a Rifampicina quando for necessário manter IP/r ou Dolutegravir.",
      "Reações adversas como hepatotoxicidade e neuropatia periférica são mais frequentes e devem ser monitoradas; recomenda-se suplementação de Piridoxina 50 mg/dia durante todo o tratamento.",
    ],
    tratamentoIltb: [
      "O rastreamento regular e o tratamento da ILTB são medidas de maior impacto para reduzir a morbimortalidade por TB em PVHIV.",
      "PVHIV têm indicação de tratar ILTB independentemente do resultado de PT ou IGRA quando LT-CD4+ ≤ 350 céls/mm³, quando desconhecido, quando são contatos de bacilíferos ou quando apresentam cicatriz radiológica compatível (com TB ativa descartada).",
    ],
  },
  howMuch: {
    dados: [
      "O risco de desenvolver tuberculose ativa é 20 vezes superior ao da população geral.",
      "Em 2017, 9,5% dos casos novos de TB no Brasil eram coinfectados por HIV.",
      "A taxa de cura foi de 42% quando a PVHIV realizou TARV e TDO, versus 34% sem TDO.",
      "A TARV reduz a mortalidade em PVHIV com TB entre 54% e 95%.",
      "Em 2017, apenas 47% dos casos novos de coinfecção receberam TARV durante o tratamento da TB.",
    ],
    metafora:
      "O manejo é comparado a um maestro conduzindo uma orquestra: os fármacos antiTB devem tocar no tempo certo e os ARV entram conforme o CD4 para evitar dissonâncias causadas por interações ou SIRI, culminando na sinfonia da cura.",
  },
};

module.exports = {
  tbHiv5w2h,
};
