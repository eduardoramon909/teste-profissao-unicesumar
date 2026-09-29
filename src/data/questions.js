export const QUESTIONS = [
  {
    id: 1,
    title: "Qual é o seu grau atual de escolaridade?",
    subtitle: "Isso nos ajuda a sugerir a melhor modalidade de curso.",
    isSchooling: true,
    options: [
      { label: "Ensino Fundamental (7º ao 9º ano)", level: "TECNICO_PROF" },
      { label: "Ensino Médio (1º ou 2º ano)", level: "TECNICO_PROF" },
      { label: "Ensino Médio (3º ano - Concluindo)", level: "GRADUACAO" },
      { label: "Ensino Médio Completo", level: "GRADUACAO" },
      { label: "Ensino Superior Cursando / Concluído (Professores/Graduados)", level: "POS" }
    ]
  },
  {
    id: 2,
    title: "Em qual destas áreas você mais se vê trabalhando no futuro?",
    options: [
      { label: "Ensino, treinamento de pessoas e desenvolvimento social", area: "Educação" },
      { label: "Tecnologia, desenvolvimento de softwares, jogos e inovação", area: "Tecnologia e Inovação" },
      { label: "Liderança, vendas, gestão de finanças e empresas", area: "Negócios" },
      { label: "Cuidado com pessoas, saúde, clínica e bem-estar", area: "Saúde e Bem-Estar" },
      { label: "Justiça, direitos sociais, legislação e apoio comunitário", area: "Direito e Humanidades" },
      { label: "Sustentabilidade, preservação e gestão do meio ambiente", area: "Meio Ambiente" }
    ]
  },
  {
    id: 3,
    title: "Como você prefere resolver problemas no seu dia a dia?",
    options: [
      { label: "Analisando dados, lógica e usando ferramentas tecnológicas", area: "Tecnologia e Inovação" },
      { label: "Conversando, ouvindo pessoas e ensinando o caminho certo", area: "Educação" },
      { label: "Calculando custos, organizando metas e estratégias", area: "Negócios" },
      { label: "Oferecendo suporte direto, atenção física ou emocional", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 4,
    title: "Qual tipo de ambiente de trabalho mais te atrai?",
    options: [
      { label: "Escolas, universidades, ONGs ou treinamento corporativo", area: "Educação" },
      { label: "Escritórios modernos, empresas de tecnologia ou Home Office", area: "Tecnologia e Inovação" },
      { label: "Grandes empresas, comércios, bancos ou próprio negócio", area: "Negócios" },
      { label: "Hospitais, postos de saúde, clínicas ou laboratórios", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 5,
    title: "Se pudesse escolher uma tarefa para o resto da vida, seria:",
    options: [
      { label: "Criar sistemas, programas ou gerenciar redes", area: "Tecnologia e Inovação" },
      { label: "Ajudar estudantes ou equipe a adquirir novos conhecimentos", area: "Educação" },
      { label: "Planejar projetos comerciais, gerenciar equipes e lucros", area: "Negócios" },
      { label: "Promover qualidade de vida e tratamento de pessoas", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 6,
    title: "Qual dessas atividades mais combina com seu gosto pessoal?",
    options: [
      { label: "Jogar videogame, mexer em computadores e redes sociais", area: "Tecnologia e Inovação" },
      { label: "Ler, explicar coisas para amigos e pesquisar novidades", area: "Educação" },
      { label: "Negociar, vender coisas e acompanhar o mercado financeiro", area: "Negócios" },
      { label: "Praticar esportes, cuidar do corpo e da saúde", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 7,
    title: "Como você lida com regras e procedimentos?",
    options: [
      { label: "Adoro normas claras, leis e defender o que é justo", area: "Direito e Humanidades" },
      { label: "Prefiro algoritmos, código exato e padrões lógicos", area: "Tecnologia e Inovação" },
      { label: "Gosto de processos eficientes que gerem resultados rápidos", area: "Negócios" },
      { label: "Prefiro diretrizes de saúde, prevenção e ética", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 8,
    title: "O que você considera mais importante em uma carreira?",
    options: [
      { label: "Alta demanda no mercado tecnológico e inovação constante", area: "Tecnologia e Inovação" },
      { label: "Impactar positivamente a vida e o futuro das pessoas", area: "Educação" },
      { label: "Independência financeira e oportunidade de empreender", area: "Negócios" },
      { label: "Trabalhar com vocação, cuidado e salvar/melhorar vidas", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 9,
    title: "Em um trabalho em equipe, você geralmente é quem:",
    options: [
      { label: "Lidera o grupo e organiza a divisão de tarefas", area: "Negócios" },
      { label: "Resolve os problemas técnicos mais complexos", area: "Tecnologia e Inovação" },
      { label: "Explica a matéria e garante que todos entenderam", area: "Educação" },
      { label: "Garante o bem-estar e harmonia do grupo", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 10,
    title: "Qual assunto desperta mais sua curiosidade na internet?",
    options: [
      { label: "Inteligência Artificial, programação e games", area: "Tecnologia e Inovação" },
      { label: "Dicas de liderança, finanças e novos negócios", area: "Negócios" },
      { label: "Métodos de aprendizado, livros e curiosidades culturais", area: "Educação" },
      { label: "Nutrição, exercícios físicos e medicina moderna", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 11,
    title: "Você prefere trabalhar com números e dados ou com conversas e pessoas?",
    options: [
      { label: "Números, gráficos, relatórios e lógica", area: "Negócios" },
      { label: "Pessoas, conversas, acolhimento e aulas", area: "Educação" },
      { label: "Códigos, máquinas e redes estruturadas", area: "Tecnologia e Inovação" },
      { label: "Pacientes, clientes de saúde e orientação física", area: "Saúde e Bem-Estar" }
    ]
  },
  {
    id: 12,
    title: "Se pudesse fazer um projeto prático agora, seria:",
    options: [
      { label: "Desenvolver um aplicativo ou site útil", area: "Tecnologia e Inovação" },
      { label: "Criar uma empresa ou marca própria de sucesso", area: "Negócios" },
      { label: "Organizar uma oficina educativa ou comunitária", area: "Educação" },
      { label: "Promover uma campanha de saúde preventivo na comunidade", area: "Saúde e Bem-Estar" }
    ]
  }
];