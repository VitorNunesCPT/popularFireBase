// Dados detalhados sobre TB-HIV (Coinfecção)

const interacoesMedicamentos = {
  rifampicina: [
    {
      arv: "Efavirenz",
      interacao: "Indução enzimática mútua",
      manejo: "Aumentar EFV para 800mg/dia se peso >60kg",
      evidencia: "Recomendação forte",
    },
    {
      arv: "Rilpivirina",
      interacao: "Redução significativa dos níveis",
      manejo: "Contraindicado - usar EFV",
      evidencia: "Contraindicação absoluta",
    },
    {
      arv: "Inibidores de Protease",
      interacao: "Redução drástica dos níveis",
      manejo: "Substituir por Rifabutina 150mg 3x/semana",
      evidencia: "Recomendação forte",
    },
    {
      arv: "Dolutegravir",
      interacao: "Redução moderada dos níveis",
      manejo: "Aumentar DTG para 50mg 2x/dia",
      evidencia: "Recomendação forte",
    },
  ],
  rifabutina: [
    {
      arv: "Lopinavir/ritonavir",
      interacao: "Aumento dos níveis de rifabutina",
      manejo: "Rifabutina 150mg 3x/semana",
      evidencia: "Dose ajustada validada",
    },
    {
      arv: "Atazanavir/ritonavir",
      interacao: "Aumento dos níveis de rifabutina",
      manejo: "Rifabutina 150mg 3x/semana",
      evidencia: "Dose ajustada validada",
    },
    {
      arv: "Efavirenz",
      interacao: "Redução dos níveis de rifabutina",
      manejo: "Rifabutina 450-600mg/dia",
      evidencia: "Ajuste necessário",
    },
  ],
};

const epidemiologia = [
  {
    aspecto: "Prevalência Global",
    dados: "25% dos casos de TB ocorrem em PVHIV",
    impacto: "Principal causa de morte em PVHIV",
  },
  {
    aspecto: "Risco de Adoecimento",
    dados: "20-37x maior risco que população geral",
    impacto: "Risco anual de 5-15% vs 0,1% na população geral",
  },
  {
    aspecto: "Formas Clínicas",
    dados: "Maior frequência de formas extrapulmonares",
    impacto: "Diagnóstico mais complexo",
  },
  {
    aspecto: "Mortalidade",
    dados: "Maior mortalidade mesmo com tratamento",
    impacto: "Necessidade de manejo especializado",
  },
];

const cronogramaTARV = [
  {
    cd4: "CD4+ <50 céls/mm³",
    inicio: "2ª semana de tratamento TB",
    justificativa: "Alto risco de progressão e morte",
    cuidados: "Monitorar IRIS, iniciar profilaxias",
  },
  {
    cd4: "CD4+ 50-200 céls/mm³",
    inicio: "8ª semana de tratamento TB",
    justificativa: "Equilíbrio entre benefício e risco de IRIS",
    cuidados: "Monitorar IRIS, avaliar profilaxias",
  },
  {
    cd4: "CD4+ >200 céls/mm³",
    inicio: "Após término do tratamento TB",
    justificativa: "Menor risco de progressão",
    cuidados: "Monitoramento clínico regular",
  },
  {
    cd4: "TB meningoencefálica",
    inicio: "4-6 semanas independente do CD4+",
    justificativa: "Reduzir risco de IRIS neurológica",
    cuidados: "Corticoides, monitoramento intensivo",
  },
];

const cuidadosEspeciais = {
  diagnostico: [
    "Investigar TB em todos os PVHIV sintomáticos",
    "Rastreamento dos 4 sintomas em todas as consultas",
    "Considerar formas extrapulmonares atípicas",
    "TRM-TB preferencial para diagnóstico rápido",
    "Cultura obrigatória para teste de sensibilidade",
    "Investigar TB disseminada em casos graves",
  ],
  tratamento: [
    "Piridoxina obrigatória (50-100mg/dia)",
    "TDO preferencialmente diário",
    "Monitoramento mensal obrigatório",
    "Atenção para interações medicamentosas",
    "Esquemas sem rifampicina são menos eficazes",
    "Duração mínima de 6 meses",
  ],
  monitoramento: [
    "Função hepática mais frequente",
    "Hemograma mensal",
    "Carga viral e CD4+ regulares",
    "Vigilância para IRIS",
    "Adesão ao tratamento",
    "Efeitos adversos sobrepostos",
  ],
};

const iris = [
  {
    tipo: "IRIS Paradoxal",
    definicao: "Piora clínica após melhora inicial",
    manifestacoes: "Febre, linfadenomegalia, piora radiológica",
    manejo: "Manter tratamentos, considerar corticoides",
  },
  {
    tipo: "IRIS de Desmascaramento",
    definicao: "TB manifesta após início do TARV",
    manifestacoes: "Sintomas de TB em paciente assintomático",
    manejo: "Iniciar tratamento TB, avaliar corticoides",
  },
  {
    tipo: "IRIS Neurológica",
    definicao: "Manifestações neurológicas após TARV",
    manifestacoes: "Cefaleia, convulsões, déficits focais",
    manejo: "Corticoides, manejo em UTI se necessário",
  },
];

const esquemasTerapeuticos = [
  {
    situacao: "PVHIV com ARV baseado em NNRTI",
    esquema: "2RHZE/4RH",
    observacoes: "Ajustar dose de EFV se necessário",
    duracao: "6 meses",
  },
  {
    situacao: "PVHIV com IP/r",
    esquema: "2RbHZE/4RbH",
    observacoes: "Rifabutina 150mg 3x/semana",
    duracao: "6 meses",
  },
  {
    situacao: "PVHIV com DTG",
    esquema: "2RHZE/4RH",
    observacoes: "DTG 50mg 2x/dia durante TB",
    duracao: "6 meses",
  },
  {
    situacao: "TB meningoencefálica",
    esquema: "2RHZE/10RH",
    observacoes: "Corticoides, TARV após 4-6 semanas",
    duracao: "12 meses",
  },
];

const profilaxias = [
  {
    condicao: "Pneumocistose",
    indicacao: "CD4+ <200 ou sintomas sugestivos",
    medicamento: "Sulfametoxazol-trimetoprima",
    dose: "800/160mg/dia",
  },
  {
    condicao: "Toxoplasmose",
    indicacao: "CD4+ <100 + IgG positivo",
    medicamento: "Sulfametoxazol-trimetoprima",
    dose: "800/160mg/dia",
  },
  {
    condicao: "Complexo MAC",
    indicacao: "CD4+ <50",
    medicamento: "Azitromicina",
    dose: "1200mg/semana",
  },
  {
    condicao: "Candidíase esofágica",
    indicacao: "Episódios recorrentes",
    medicamento: "Fluconazol",
    dose: "100-200mg/dia",
  },
];

const criteriosLaboratoriais = [
  {
    parametro: "CD4+ para início TARV",
    valor: "<50 céls/mm³ = 2ª semana",
    observacao: "50-200 = 8ª semana, >200 = após TB",
  },
  {
    parametro: "Carga Viral",
    valor: "Meta: indetectável",
    observacao: "Monitorar a cada 3-6 meses",
  },
  {
    parametro: "Hemoglobina",
    valor: ">10 g/dL",
    observacao: "Investigar anemia se <10 g/dL",
  },
  {
    parametro: "TGO/TGP",
    valor: "<3x LSN",
    observacao: "Monitoramento mais frequente",
  },
];

const locaisAtendimento = [
  {
    local: "SAE (Serviço de Atenção Especializada)",
    papel: "Coordenação do cuidado",
    atividades: ["Manejo do HIV", "Prescrição de ARV", "Monitoramento laboratorial"],
  },
  {
    local: "Atenção Básica",
    papel: "Tratamento da TB",
    atividades: ["TDO", "Monitoramento TB", "Busca de contatos"],
  },
  {
    local: "Unidades de Referência",
    papel: "Casos complexos",
    atividades: ["TB drogarresistente", "IRIS grave", "Complicações"],
  },
  {
    local: "Hospital",
    papel: "Casos graves",
    atividades: ["IRIS neurológica", "TB disseminada", "Falência respiratória"],
  },
];

module.exports = {
  interacoesMedicamentos,
  epidemiologia,
  cronogramaTARV,
  cuidadosEspeciais,
  iris,
  esquemasTerapeuticos,
  profilaxias,
  criteriosLaboratoriais,
  locaisAtendimento,
};