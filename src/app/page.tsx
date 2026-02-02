// ═══════════════════════════════════════════════════════════════════════════════
// PAGE.TSX - PÁGINA INICIAL (rota "/")
// ═══════════════════════════════════════════════════════════════════════════════
// No Next.js App Router:
//   - Cada pasta em /app pode ter um page.tsx
//   - O page.tsx é o CONTEÚDO da página
//   - O layout.tsx é a ESTRUTURA que envolve o conteúdo
//
// Este arquivo é a página inicial porque está em /app/page.tsx (rota "/")
// O Sidebar JÁ ESTÁ no layout.tsx, então não precisa importar aqui!

import { Home } from "../features/portfolio-hero";
// ↑ Importa APENAS o componente Home
// O Sidebar foi REMOVIDO daqui porque já está no layout.tsx
// Se deixássemos, teríamos DOIS sidebars na tela!

export default function Page() {
  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPONENTE DA PÁGINA
  // ═══════════════════════════════════════════════════════════════════════════════
  // "export default" = é o que o Next.js vai renderizar quando acessar "/"
  //
  // O nome "Page" é uma convenção, poderia ser qualquer nome
  // Mas é uma boa prática manter consistente

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 
        ════════════════════════════════════════════════════════════════════════
        CONTAINER PRINCIPAL
        ════════════════════════════════════════════════════════════════════════
        min-h-screen → Altura mínima = 100% da tela
        bg-slate-950 → Fundo escuro (mesmo do layout, mas garante consistência)
        
        Não precisamos mais de "flex" aqui porque:
        - O Sidebar agora é position: fixed (flutua por cima)
        - O conteúdo ocupa a tela toda
        - O Sidebar abre/fecha por cima do conteúdo
      */}

      {/* Componente Home com sua apresentação */}
      <Home />

      {/* 
        Quando criar outras seções (Projetos, Skills, etc),
        você pode adicionar aqui ou criar rotas separadas:
        
        OPÇÃO 1 - Tudo na mesma página (scroll):
          <Home />
          <Projects />
          <Skills />
        
        OPÇÃO 2 - Páginas separadas (navegação):
          /app/projects/page.tsx → componente <Projects />
          /app/skills/page.tsx   → componente <Skills />
      */}
    </div>
  );
}
