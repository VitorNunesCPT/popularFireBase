// Conteúdo estruturado estritamente com base em `data/new-interacao-medicamentosa.md`

const interacoesMedicamentosas5w2h = {
  overview: {
    contexto:
      "A sua consulta solicita uma avaliação abrangente sobre as interações medicamentosas no tratamento da Tuberculose (TB), utilizando a estrutura 5W2H (O Quê, Por Quê, Onde, Quando, Quem, Como e Quanto), baseada exclusivamente nas fontes fornecidas.",
    desafio:
      "O manejo das interações medicamentosas é um desafio significativo no tratamento da TB, especialmente devido à natureza potente e ao longo curso dos fármacos antiTB, que frequentemente interagem com medicamentos usados para comorbidades, como o HIV e o Diabetes.",
  },
  what: {
    descricaoGeral:
      "As interações medicamentosas dos fármacos antiTB podem ocorrer em dois níveis: na absorção e no metabolismo do fármaco.",
    farmacosIndutoresInibidores: [
      "A Rifampicina (R) é um potente indutor enzimático, gerando interações com diversos medicamentos.",
      "Rifampicina e antifúngicos: reduz o nível sérico do Cetoconazol e do Fluconazol e aumenta a hepatotoxicidade; recomenda-se considerar outros agentes terapêuticos.",
      "Rifampicina e barbitúricos: reduz o nível sérico, podendo exigir ajuste de dose.",
      "Rifampicina e contraceptivos orais: reduz a eficácia; recomenda-se evitar o uso concomitante e considerar outros métodos contraceptivos.",
      "Rifampicina com sulfas, propafenona e quinidina: reduz os níveis séricos.",
      "Rifampicina e hipoglicemiantes: acelera o metabolismo de sulfonilureias, metiglinidas e biguanidas.",
    ],
    absorcaoEToxicidade: [
      "Isoniazida (H): o uso de antiácidos ou derivados imidazólicos reduz a absorção; o uso de Fenilhidantoína ou Acetaminofen aumenta a hepatotoxicidade.",
      "Fluoroquinolonas (FQNs): a absorção é reduzida se usadas com antiácidos (sais de alumínio, magnésio, cálcio e sódio), sucralfato e vitaminas ou sais minerais (zinco e ferro trivalente); não devem ser usadas com antiarrítmicos (quinidina, amiodarona, sotalol) devido ao risco de bradiarritmia.",
      "Linezolida: potencializa o efeito inibidor da MAO com agentes adrenérgicos ou serotoninérgicos, ou com consumo de tiramina (> 100 mg/dia), podendo causar síndrome da serotonina; deve-se evitar o uso concomitante de Linezolida e queijos/vinhos.",
    ],
    coinfeccaoTBHIV: [
      "Rifamicinas (Rifampicina e Rifabutina) interagem com inibidores da protease, ITRNN e inibidores de integrase (Dolutegravir e Raltegravir).",
      "Rifampicina induz o metabolismo dos inibidores de protease e do Dolutegravir, reduzindo suas concentrações séricas e aumentando o risco de falha da TARV e resistência aos ARV.",
      "Rifabutina é recomendada como substituta da Rifampicina quando for necessário manter IP/r ou Dolutegravir; quando usada com IP, a dose da Rifabutina deve ser reduzida à metade.",
    ],
  },
  why: {
    motivos: [
      "Evitar falha terapêutica: interações como a indução metabólica pela Rifampicina podem levar à subdosagem dos ARV e falha da TARV.",
      "Reduzir risco de toxicidade e reações adversas: sobreposição de efeitos pode piorar adesão e aumentar risco de óbitos, como na hepatotoxicidade com Isoniazida + Acetaminofen/Fenilhidantoína.",
      "Gerenciar complexidade da coinfecção TB-HIV: há sobreposição de efeitos adversos como neuropatia periférica e distúrbios neurológicos, exigindo manejo especializado.",
    ],
  },
  where: {
    locais: [
      "Atenção Primária à Saúde (APS): responsável pelo Esquema Básico para TB sensível; deve avaliar consumo de álcool e monitorar efeitos adversos, especialmente hepatotoxicidade.",
      "Serviços especializados (SAE/Referência): manejo de interações complexas entre antiTB e ARV, com acompanhamento compartilhado entre SAE e UBS.",
      "Encaminhamento urgente: pacientes com reações adversas graves ou falha terapêutica devem ser encaminhados para serviços de referência em tuberculose.",
    ],
  },
  when: {
    orientacoes: [
      "O monitoramento deve começar imediatamente após o diagnóstico da TB, com exames laboratoriais mais frequentes em pacientes com comorbidades.",
      "TB-HIV: início concomitante da TB e do HIV é contraindicado por aumentar risco de intolerância e reações adversas.",
      "CD4 < 50 céls/mm³: iniciar TARV em até 2 semanas após início do tratamento da TB.",
      "CD4 ≥ 50 céls/mm³: iniciar TARV na 8ª semana (final da fase intensiva).",
      "TB meningoencefálica: iniciar TARV preferencialmente entre quatro e seis semanas após o início do tratamento da TB.",
    ],
  },
  who: {
    populacoesRisco: [
      "Pessoas Vivendo com HIV (PVHIV): maior risco devido à complexidade das interações e à sobreposição de efeitos adversos.",
      "Pacientes com Diabetes: Rifampicina interfere no metabolismo de hipoglicemiantes, exigindo atenção ao controle glicêmico.",
      "Usuários de antiácidos/suplementos: risco de redução da absorção de Isoniazida e Fluoroquinolonas.",
      "Gestantes: necessidade de monitorar a segurança dos fármacos antiTB e das interações.",
    ],
    profissionais: [
      "Médicos e especialistas: responsáveis pela escolha do esquema ARV ideal e ajuste de doses na coinfecção TB-HIV, considerando interações e genotipagem pré-tratamento.",
      "Enfermeiros e equipe de enfermagem: informam sobre interações, monitoram reações adversas e realizam o Tratamento Diretamente Observado (TDO).",
    ],
  },
  how: {
    manejo: [
      "Ajuste de esquemas TB-HIV: esquema preferencial com Rifampicina é Tenofovir/Lamivudina + Dolutegravir 50 mg duas vezes ao dia.",
      "Se for necessário manter IP/r, a Rifampicina deve ser substituída pela Rifabutina.",
      "Prevenção de toxicidade específica: utilizar Piridoxina (vitamina B6) na dosagem de 50mg/dia durante todo o tratamento para prevenir neuropatia periférica.",
      "Evitar redução da absorção: para fármacos que requerem meio ácido, como a Isoniazida, evitar o uso concomitante de antiácidos.",
      "Intolerância digestiva: reformular o horário de administração dos medicamentos antiTB para duas horas após o café da manhã.",
    ],
  },
  howMuch: {
    dados: [
      "Dose de Piridoxina: 50 mg/dia para prevenção de neuropatia periférica.",
      "Dose de Dolutegravir na coinfecção: deve ser dobrada para 12/12h quando usado com Rifampicina.",
      "Risco de SIRI: aumenta se a TARV for iniciada precocemente (menos de 30 dias), especialmente em pacientes com CD4 < 50 céls/mm³; porém o benefício da redução da mortalidade supera o risco.",
    ],
    metafora:
      "O manejo das interações medicamentosas é como um jogo de xadrez de alta complexidade: a Rifampicina é uma peça poderosa que exige ajustes nas demais peças (ARV) para evitar que sejam capturadas pelo metabolismo acelerado, garantindo a convivência eficaz entre as terapias de TB e HIV.",
  },
};

module.exports = {
  interacoesMedicamentosas5w2h,
};
