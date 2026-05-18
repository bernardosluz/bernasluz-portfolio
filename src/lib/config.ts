export const siteConfig = {
  name: "Bernardo Luz",
  role: "Fullstack Developer",
  tagline: "Engenharia de Computação",
  location: "Aracaju, SE",
  university: "UFS",
  bio: "Criando experiências digitais com código limpo e design intencional.",
  about:
    "Estudante de Engenharia de Computação na UFS, com foco em desenvolvimento Fullstack. " +
    "Atualmente sou estagiário na Diretoria da Tecnologia de Informação da SSP-SE, " +
    "tendo atuado anteriormente no Instituto de Criminalística da SSP-SE. " +
    "Tenho experiência com React, Next.js, .NET Core e estou sempre buscando aprender novas tecnologias e " +
    "boas práticas de desenvolvimento.",
  links: {
    github: "https://github.com/bernardosluz",
    linkedin: "https://www.linkedin.com/in/bernardo-silva-luz-740979248/",
    instagram: "https://www.instagram.com/bernasluz",
    youtube: "https://www.youtube.com/@bernasluz",
    // email: "mailto:contato@bernasluz.com.br",
  },
  experience: [
    {
      role: "Estagiário — Diretoria de TI",
      company: "SSP-SE",
      period: "Atual",
      description: "Desenvolvimento de sistemas internos e manutenção de infraestrutura tecnológica.",
    },
    {
      role: "Estagiário — Instituto de Criminalística",
      company: "SSP-SE",
      period: "Anterior",
      description: "Suporte técnico e desenvolvimento de soluções digitais para perícia.",
    },
  ],
  projects: [
    {
      title: "Simple JIT VM",
      image: "/imagens/imagem_simple_jit_vm.png",
      description:
        "Máquina virtual customizada com 16 registradores, 256 bytes de memória e conjunto próprio de instruções, capaz de traduzir bytecode para código de máquina x86-64 em tempo de execução, utilizando compilação JIT, cache de instruções e arquitetura de computadores.",
      tech: ["C", "x86-64", "JIT Compiler", "Assembly"],
      github: "",
      link: "",
    },
    {
      title: "FloorPlan Element Detection",
      image: "/imagens/imagem_floorplan_element_detection.png",
      description:
        "Detecção e segmentação de elementos arquitetônicos em plantas baixas, utilizando binarização, morfologia matemática, filtro de Sobel, Transformada de Hough e validação cruzada geométrica para identificação de portas, paredes e estruturas.",
      tech: ["Python", "OpenCV", "NumPy", "Processamento de Imagens"],
      github: "https://github.com/bernardosluz/FloorPlan-Element-Detection",
      link: "",
    },
    {
      title: "Assembly Image Decoder",
      image: "/imagens/imagem_assembly_image_decoder.png",
      description:
        "Decodificador e renderizador de arte ASCII em Assembly x86-64, processando formato de imagem customizado com paleta de caracteres e compressão Run-Length Encoding para gerar saídas textuais a partir de dados comprimidos.",
      tech: ["Assembly", "x86-64", "RLE", "Low-Level"],
      github: "",
      link: "",
    },
    {
      title: "SADA-ATA",
      image: "/imagens/imagem_sada_ata.png",
      description:
        "Sistema automático de download e análise de atas com interface web, automatizando a coleta e processamento de documentos públicos.",
      tech: ["JavaScript", "HTML", "CSS", "Node.js"],
      github: "https://github.com/bernardosluz/Sistema-Automatico-de-Download-e-Analise-de-Atas",
      link: "",
    },
    {
      title: "Portfólio Pessoal",
      image: "/imagens/imagem_portfolio_pessoal.png",
      description:
        "Este site — construído com Next.js, Framer Motion e Tailwind CSS com design premium e transições suaves.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      github: "https://github.com/bernardosluz/bernasluz-portfolio",
      link: "",
    },
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    backend: [".NET Core", "C#", "Node.js", "SQL Server", "Java", "Spring Boot"],
    tools: ["Git", "VS Code", "Figma", "Docker", "Linux"],
    lowLevel: ["C", "Assembly x86-64", "JIT Compilation", "OpenCV", "Python"],
  },
  tcc: {
    title: "Título do TCC",
    subtitle: "Subtítulo ou descrição breve",
    institution: "Universidade Federal de Sergipe",
    year: 2026,
    advisor: "Prof. Dr. Breno Piva",
    abstract: "Resumo do trabalho de conclusão de curso.",
    keywords: ["NP-Hard", "School Timetabling Problem", "Scheduling Problem", "Integer Programming"],
    articles: [],
  },
  nav: [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contato", href: "#contact" },
  ],
};
