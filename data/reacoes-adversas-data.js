// Conteúdo estruturado estritamente com base em `data/new-reacoes-adversas.md`

const reacoesAdversas5w2h = {
  overview: {
    contexto:
      "A avaliação das reações adversas associadas ao tratamento da Tuberculose (TB) é crucial, pois a ocorrência desses eventos é um fator determinante para a adesão do paciente e o sucesso terapêutico.",
    metodologia: "Reações Adversas da Tuberculose: Avaliação 5W2H.",
  },
  what: {
    classificacao:
      "As reações adversas são classificadas em dois grandes grupos.",
    reacoesMenores: [
      "Geralmente não requerem a suspensão do medicamento antiTB e podem ser manejadas na Atenção Primária.",
      "Intolerância digestiva (náusea, vômito e epigastralgia), sendo Etambutol, Isoniazida, Pirazinamida e Rifampicina fármacos prováveis.",
      "Suor/urina de cor avermelhada devido à Rifampicina.",
      "Neuropatia periférica, comum com a Isoniazida e incomum com o Etambutol.",
      "Prurido e exantema leve.",
      "Dor articular associada à Isoniazida e Pirazinamida.",
      "Hiperuricemia (com ou sem sintomas), associada ao Etambutol e Pirazinamida.",
      "Cefaleia, ansiedade, euforia, insônia e depressão leve, associadas à Isoniazida.",
    ],
    reacoesMaiores: [
      "Normalmente causam a suspensão do tratamento e exigem manejo especializado.",
      "Hepatotoxicidade: dano hepático pode ser causado pela Pirazinamida (a mais tóxica), Isoniazida e Rifampicina, nessa ordem de toxicidade.",
      "Hipersensibilidade ou exantema de moderada a grave; quando grave (plaquetopenia, anemia hemolítica, insuficiência renal), o medicamento suspeito não deve ser reintroduzido.",
      "Alterações do sistema nervoso central, incluindo psicose, crise convulsiva, encefalopatia tóxica ou coma.",
      "Alterações sanguíneas, nefrite e insuficiência renal.",
      "Reações a esquemas especiais: fármacos de segunda linha para TB Drogarresistente causam alta frequência de reações adversas; a Linezolida pode causar acidose lática, e Etionamida e PAS podem causar hepatotoxicidade ou hipotireoidismo.",
    ],
    siri: {
      descricao:
        "A Síndrome Inflamatória da Reconstituição Imune (SIRI/SRI) é fenômeno inflamatório exacerbado em PVHIV após início da TARV.",
      manifestacoes: [
        "Piora paradoxal de lesões preexistentes de TB (agravamento de sintomas pulmonares ou imagens radiológicas) ou aparecimento de novos sinais/sintomas.",
        "Aumento e/ou fistulização de linfonodos.",
      ],
      observacao: "Não é falha de tratamento da TB nem da TARV.",
    },
  },
  why: {
    motivos: [
      "As reações adversas (junto com a dificuldade de acesso e os conflitos domésticos) são descritas como um dos principais fatores que levam à não adesão e abandono do tratamento, definido como ausência por 30 dias consecutivos.",
      "A não adesão está associada ao aumento do risco de resistência aos medicamentos e de óbitos; o abandono pode levar ao desenvolvimento de resistência adquirida.",
      "Garantir a continuidade do tratamento requer orientar sobre as reações e reforçar a necessidade de procurar o serviço imediatamente para que o caso seja avaliado e o abandono seja evitado.",
    ],
  },
  where: {
    locais: [
      "Atenção Primária à Saúde (APS): as reações adversas menores devem ser manejadas na própria APS.",
      "Referência Secundária: indicada para o manejo de efeitos adversos maiores e de toxicidade.",
      "Referência Terciária: lida com a TB Drogarresistente (TB DR); se um esquema básico não puder ser reintroduzido após uma reação grave, um esquema especial deve ser indicado.",
      "Hospitalização: recomendada em casos excepcionais, como intolerância incontrolável aos medicamentos em ambulatório, ou em caso de estado geral grave.",
    ],
  },
  when: {
    ocorrenciaEMonitoramento: [
      "A maioria dos pacientes completa o tratamento sem reações relevantes.",
      "As reações adversas maiores que levam à alteração definitiva do esquema terapêutico variam de 3% a 8%.",
      "Recomenda-se o monitoramento laboratorial mensal (função hepática e renal) em pacientes de alto risco ou na presença de sinais/sintomas.",
      "A SIRI ocorre mais frequentemente dentro de três meses após o início do tratamento da TB e, em PVHIV, geralmente dentro de 4 a 8 semanas após o início da TARV.",
      "O início concomitante do tratamento da TB e da TARV é contraindicado, pois aumenta o risco de intolerância e reações adversas, piorando a adesão.",
    ],
  },
  who: {
    fatoresRisco: [
      "Idade (a partir da quarta década).",
      "Dependência química ao álcool (ingestão diária de álcool > 80g).",
      "Desnutrição (perda de mais de 15% do peso corporal).",
      "História de doença hepática prévia.",
      "Coinfecção pelo HIV, especialmente em fase avançada de imunossupressão.",
    ],
    riscosPVHIV: [
      "O tratamento da coinfecção TB-HIV exige atenção redobrada devido ao maior risco de toxicidade medicamentosa e às interações entre os fármacos antiTB e os antirretrovirais (ARV).",
      "O uso concomitante acarreta a sobreposição de efeitos adversos, como neuropatia periférica e distúrbios neurológicos (confusão mental, insônia, tonturas).",
    ],
  },
  how: {
    manejoReacoesMenores: [
      "Intolerância digestiva: recomenda-se reformular o horário da administração dos medicamentos, como tomá-los duas horas após o café da manhã.",
      "Neuropatia periférica: deve ser prevenida ou tratada com a suplementação de Piridoxina (vitamina B6) na dosagem de 50mg/dia durante todo o tratamento; em crianças coinfetadas ou desnutridas, a dose recomendada é de 5 a 10 mg/dia.",
      "Outras reações: administrar anti-histamínicos para prurido, analgésicos para dor articular e orientar dieta hipopurínica para hiperuricemia, podendo usar Alopurinol ou Colchicina.",
    ],
    manejoReacoesMaiores: [
      "Suspender o tratamento e reintroduzir os medicamentos um a um após a resolução do quadro, ou substituir o esquema por um especial que exclua o fármaco causador.",
      "Hepatotoxicidade: em casos de icterícia ou TGO/TGP 5x o limite superior da normalidade (LSN) (ou 3x LSN com sintomas), o tratamento deve ser suspenso; se houver doença hepática prévia com cirrose, recomenda-se o esquema 3SEO/9EO (Estreptomicina, Etambutol e Ofloxacino).",
    ],
    manejoSiri: [
      "SIRI leve/moderada: pode ser tratada com sintomáticos ou anti-inflamatórios não hormonais.",
      "SIRI moderada/grave: deve ser tratada com corticosteroides (1 a 2 mg/kg/dia de prednisona por duas semanas, seguida de redução lenta).",
      "O benefício do início oportuno da TARV supera o risco da SIRI, que é um fenômeno manejável e com baixo risco de morte.",
    ],
  },
  howMuch: {
    indicadores: [
      "A frequência das reações adversas maiores varia de 3% a 8% dos casos.",
      "A maioria das reações na TB DR é manejável, sendo que apenas 1% a 2% dos casos exigem a interrupção definitiva do medicamento.",
      "50 mg/dia de Piridoxina é usado para prevenir a neuropatia periférica em adultos.",
    ],
    metafora:
      "A vigilância das reações adversas é como o monitoramento constante de um sistema de alerta em uma usina de tratamento químico, detectando vazamentos (reações menores) e intervenções imediatas em caso de explosões (reações maiores), garantindo que o processo continue seguro e eficaz, e que a usina não seja abandonada antes de completar sua missão.",
  },
};

module.exports = {
  reacoesAdversas5w2h,
};
