// Conteúdo estruturado estritamente com base em `data/new-tratamento.md`

const tratamento5w2h = {
  overview: {
    contexto:
      "O tratamento da Tuberculose (TB) é o pilar central para o controle da doença, visando a cura individual e a interrupção da cadeia de transmissão.",
    metodologia:
      "A avaliação 5W2H detalha os aspectos essenciais do tratamento conforme as diretrizes apresentadas nas fontes oficiais.",
  },
  what: {
    descricaoGeral:
      "O tratamento da tuberculose é padronizado no Brasil, disponível em toda a rede pública e organizado em fase intensiva (ou de ataque) e fase de manutenção.",
    fases: [
      "Fase intensiva: quatro medicamentos em dose fixa combinada (RHZE) por dois meses, reduzindo rapidamente a população bacilar e a contagiosidade.",
      "Fase de manutenção: dois medicamentos (RH) por quatro meses para eliminar bacilos persistentes e prevenir recidiva.",
    ],
    eficacia:
      "A TB é curável em praticamente 100% dos casos sensíveis aos medicamentos, desde que os princípios básicos da terapia sejam seguidos.",
    tbSensivel: [
      "Esquema Básico (EB) para Adultos e Adolescentes (≥ 10 anos): 2RHZE/4RH.",
      "Esquema Básico para Crianças (< 10 anos): 2RHZ/4RH.",
      "Em crianças com TB e coinfecção HIV ou desnutridas, recomenda-se suplementação de piridoxina (vitamina B6) de 5 a 10 mg/dia.",
      "Formas meningoencefálica e osteoarticular utilizam o esquema básico com prolongamento da fase de manutenção para 10 meses (total de 12 meses), associando corticosteroides (prednisona ou dexametasona) na TB meningoencefálica.",
    ],
    tbDrogarresistente: [
      "O tratamento da Tuberculose Drogarresistente (TB DR) exige esquemas especiais com fármacos de segunda linha, duração mais prolongada e maior toxicidade.",
      "O esquema padronizado para TB Multirresistente (TB MDR) dura, no mínimo, 18 meses.",
    ],
    tratamentoILTB: {
      importancia:
        "O tratamento da infecção latente (ILTB) é uma estratégia importante para prevenir o adoecimento em populações de risco.",
      esquemasSUS: [
        "Isoniazida por seis meses (6H) ou nove meses (9H).",
        "Rifampicina por quatro meses (4R).",
        "Rifapentina associada à Isoniazida por três meses (3HP).",
      ],
      eficacia:
        "O tratamento da ILTB com Isoniazida reduz o risco de adoecimento por TB ativa em 60% a 90%.",
    },
  },
  why: {
    objetivos: [
      "Garantir cura e sobrevida: a adesão aumenta a probabilidade de cura e diminui o sofrimento, buscando mais de 85% de cura dos casos.",
      "Interromper a transmissão: tratar corretamente os casos bacilíferos é a medida fundamental para romper a cadeia de transmissão do bacilo de Koch.",
      "Prevenir resistência: uso adequado dos medicamentos por tempo suficiente evita persistência bacteriana e desenvolvimento de resistência.",
      "Reduzir mortalidade na coinfecção TB-HIV: o início precoce da TARV durante o tratamento da TB reduz a mortalidade.",
    ],
  },
  where: {
    locais: [
      "Atenção Primária à Saúde (APS): local prioritário para o tratamento da TB sensível e acompanhamento da ILTB.",
      "Serviços de referência secundária: indicados para elucidação de casos, manejo de efeitos adversos maiores ou toxicidade e esquemas especiais.",
      "Serviços de referência terciária: responsáveis pela TB drogarresistente (TB DR), incluindo TB RR, MDR e XDR, com esquemas individualizados e encaminhamento imediato após detectar resistência à Rifampicina.",
      "Regime hospitalar: recomendado apenas em situações excepcionais, como TB meningoencefálica, intolerância incontrolável a medicamentos ou estado geral grave; pode ser considerado por vulnerabilidade social com consentimento do paciente.",
    ],
  },
  when: {
    duracaoEFluxos: [
      "Esquema básico dura 6 meses.",
      "TB meningoencefálica ou osteoarticular dura 12 meses.",
      "A fase de manutenção (RH) pode ser prolongada para 7 meses em casos individualizados com evolução clínica insatisfatória ou baciloscopia positiva no quinto ou sexto mês.",
      "Se a baciloscopia estiver positiva ao final do 2º mês, a fase intensiva (RHZE) é prolongada por mais 30 dias enquanto se aguarda o Teste de Sensibilidade.",
      "Encerramento no Sinan deve ocorrer em até 9 meses para esquemas de 6 meses e em até 15 meses para TB meningoencefálica (12 meses de duração).",
    ],
    riscoTransmissao:
      "O risco de transmissão diminui gradativamente após o início do tratamento e está muito reduzido após 15 dias (duas a três semanas) de tratamento efetivo, com confirmação pela negativação da baciloscopia.",
    inicioTARV: [
      {
        condicao: "Sinais de imunodeficiência avançada ou CD4 < 50 céls/mm³",
        momento:
          "Iniciar a TARV até 2 semanas após o início do tratamento da TB.",
      },
      {
        condicao: "Ausência de imunodeficiência avançada ou CD4 ≥ 50 céls/mm³",
        momento:
          "Iniciar a TARV na 8ª semana após o início do tratamento da TB (início da fase de manutenção).",
      },
      {
        condicao: "TB meningoencefálica",
        momento:
          "Preferencialmente iniciar a TARV entre quatro e seis semanas após o início do tratamento da TB.",
      },
    ],
  },
  who: {
    profissionais: [
      "Enfermeiro e equipe de enfermagem coordenam e realizam o Tratamento Diretamente Observado (TDO), monitorando adesão, reações adversas, busca ativa de faltosos e contatos, além de educação em saúde.",
      "O TDO pode ser conduzido por profissionais de saúde ou outros profissionais capacitados, desde que sob supervisão de um profissional de saúde, não sendo considerada observação por familiares ou amigos.",
    ],
    populacoesAlvo: [
      "O TDO é destinado a todos os pacientes com diagnóstico de TB.",
      "Priorizar adesão para Pessoas Vivendo com HIV (PVHIV), População Privada de Liberdade (PPL), População em Situação de Rua (PSR) e usuários de álcool e outras drogas, devido ao maior risco de abandono e morte.",
      "ILTB: crianças contatos de casos pulmonares, PVHIV e pessoas em uso de inibidores do TNF-α estão entre as populações prioritárias.",
    ],
  },
  how: {
    estrategiasPrincipais: [
      "O sucesso do tratamento depende fundamentalmente da adesão, sendo o TDO a principal estratégia.",
    ],
    tdo: {
      definicao:
        "Consiste na observação da ingestão dos medicamentos pelo profissional de saúde.",
      frequencia:
        "Idealmente todos os dias úteis; considerado TDO se houver observação no mínimo três vezes por semana durante todo o tratamento.",
      beneficios:
        "Garante a ingestão, fortalece o vínculo, oferece cuidado integrado e identifica vulnerabilidades individuais e sociais.",
      compartilhado:
        "Pode ser pactuado em local acordado com o paciente, cabendo à UBS de origem coordenar o cuidado.",
    },
    estrategiasAdesao: [
      "Cuidado Centrado na Pessoa (CCP) para promover autonomia e responder às necessidades do paciente.",
      "Projeto Terapêutico Singular (PTS) para individualizar práticas, definir diagnósticos situacionais e responsabilidades mútuas.",
      "Oferta de apoio social e benefícios (cesta básica, vale-transporte, café da manhã) em parceria com a assistência social.",
      "Uso de tecnologia (telemonitoramento, Video-DOT, WhatsApp e celular) para otimizar acompanhamento e adesão.",
    ],
    monitoramentoESeguimento: [
      "Consultas mensais são recomendadas para acompanhamento clínico.",
      "Baciloscopia mensal é fundamental nos casos pulmonares, sendo indispensáveis as do segundo, quarto e sexto meses.",
      "Negativação da baciloscopia é esperada a partir do final da segunda semana e o TRM-TB não deve ser usado para controle de tratamento.",
      "Monitoramento clínico e laboratorial (função hepática e renal) para identificar e manejar reações adversas maiores e menores.",
      "Registros devem ser mantidos no Livro de Registro de Pessoas com Tuberculose, no Boletim de Acompanhamento (Sinan) e, para TB DR ou mudança de esquema, no SITE-TB.",
    ],
    metafora:
      "O TDO funciona como um treinador comprometido que entrega o combustível necessário (medicamentos) na hora certa, acompanha condição física e emocional e ajusta o ritmo para garantir que a linha de chegada (a cura) seja alcançada com sucesso.",
  },
  howMuch: {
    metas: [
      "Meta de cura: obter proporção de cura de casos novos de TB pulmonar confirmados laboratorialmente acima de 85%.",
      "Meta de abandono: manter o percentual de abandono abaixo de 5%, considerando abandono a ausência por 30 dias consecutivos.",
      "Doses supervisionadas mínimas: 24 tomadas na fase de ataque e 48 doses na fase de manutenção para caracterizar TDO.",
      "Acompanhamento pós-cura para TB resistente deve durar pelo menos 5 anos para detecção precoce de recidiva.",
    ],
  },
};

module.exports = {
  tratamento5w2h,
};
