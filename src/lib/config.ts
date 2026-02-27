// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG.TS — Dados centralizados do site
// ═══════════════════════════════════════════════════════════════════════════════
//
// POR QUE CENTRALIZAR?
// Se o nome, bio ou link mudar, você altera SÓ AQUI.
// Todos os componentes que usam siteConfig pegam automaticamente.
// Sem config centralizado, você teria que caçar strings espalhadas pelo projeto.

export const siteConfig = {
  name: "Bernardo Luz",
  role: "Engenheiro de Computação",
  location: "Aracaju, SE",
  university: "UFS",
  bio: "Desenvolvedor Fullstack apaixonado por criar experiências digitais.",
  about:
    "Estudante de Engenharia de Computação na UFS, com foco em desenvolvimento Fullstack. " +
    "Tenho experiência com React, Next.js, .NET Core e estou sempre buscando " +
    "aprender novas tecnologias e boas práticas de desenvolvimento.",
  links: {
    github: "https://github.com/bernardosluz",
    linkedin: "https://www.linkedin.com/in/bernardo-silva-luz-740979248/",
    instagram: "https://www.instagram.com/bernasluz",
    email: "mailto:contato@bernasluz.com.br",
  },
  projects: [
    {
      title: "Lojinha API",
      description:
        "API RESTful completa para e-commerce com autenticação JWT e gerenciamento de produtos.",
      tech: [".NET Core", "C#", "SQL Server", "JWT"],
      github: "https://github.com/bernardosluz",
      image: "",
    },
    {
      title: "uHouse-web",
      description:
        "Plataforma web para gerenciamento de casas inteligentes com interface responsiva.",
      tech: ["React", "TypeScript", "Tailwind", "API REST"],
      github: "https://github.com/bernardosluz",
      image: "",
    },
    {
      title: "Portfólio Pessoal",
      description:
        "Este site! Construído com Next.js, Framer Motion e Tailwind CSS.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      github: "https://github.com/bernardosluz",
      image: "",
    },
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    backend: [".NET Core", "C#", "Node.js", "SQL Server"],
    tools: ["Git", "VS Code", "Figma", "Docker"],
  },
};
