// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT.TSX - O "ESQUELETO" DE TODAS AS PÁGINAS
// ═══════════════════════════════════════════════════════════════════════════════
// No Next.js App Router, o layout.tsx define a estrutura que ENVOLVE todas as páginas
// É como um "molde" - o <html>, <body>, e elementos que aparecem em TODAS as páginas
// (como o Sidebar) ficam aqui.
//
// Quando você navega entre páginas, o layout NÃO recarrega, só o conteúdo muda.
// Isso deixa a navegação muito mais rápida!

import type { ReactNode } from "react";
// ═══════════════════════════════════════════════════════════════════════════════
// ReactNode - TIPO DO TYPESCRIPT PARA "QUALQUER COISA RENDERIZÁVEL"
// ═══════════════════════════════════════════════════════════════════════════════
//
// "import type" = importa APENAS o tipo, não código real
//   → Não aumenta o tamanho do bundle final
//   → É uma boa prática em TypeScript
//
// ReactNode pode ser:
//   - Um elemento JSX: <div>...</div>
//   - Uma string: "texto"
//   - Um número: 123
//   - null ou undefined
//   - Um array de qualquer um desses
//
// Usamos ReactNode para tipar o "children" porque não sabemos
// exatamente o que virá - pode ser qualquer página do app

import type { Metadata } from "next";
// ═══════════════════════════════════════════════════════════════════════════════
// Metadata - TIPO PARA SEO E INFORMAÇÕES DA PÁGINA
// ═══════════════════════════════════════════════════════════════════════════════
// Define título, descrição, ícones, etc. que aparecem:
//   - Na aba do navegador
//   - Quando compartilhado em redes sociais
//   - Nos resultados de busca do Google

import "./globals.css";
// ═══════════════════════════════════════════════════════════════════════════════
// IMPORTAÇÃO DO CSS GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════
// Esse CSS é aplicado em TODAS as páginas
// Contém:
//   - @tailwind base/components/utilities (ativa o Tailwind)
//   - Variáveis CSS customizadas
//   - Estilos da scrollbar
//   - Cor de fundo e texto padrão

import Sidebar from "@/features/portfolio-hero/components/Sidebar/Sidebar";
// ═══════════════════════════════════════════════════════════════════════════════
// IMPORTAÇÃO DO SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════════
// O "@/" é um "alias" configurado no Next.js que aponta para a pasta "src/"
// É mais limpo que usar caminhos relativos como "../../../features/..."
//
// Como o Sidebar está no layout, ele aparece em TODAS as páginas automaticamente!

// ═══════════════════════════════════════════════════════════════════════════════
// METADATA - CONFIGURAÇÕES DE SEO
// ═══════════════════════════════════════════════════════════════════════════════
// Essas informações são usadas por:
//   - Navegadores (título na aba)
//   - Google (resultados de busca)
//   - Redes sociais (preview ao compartilhar link)
//
// "export const" = essa variável pode ser importada por outros arquivos
// O Next.js automaticamente lê essa variável e aplica as configurações

export const metadata: Metadata = {
  title: "Bernardo Luz | Portfólio",
  description: "Portfólio pessoal de Bernardo Luz - Desenvolvedor",
};

// ═══════════════════════════════════════════════════════════════════════════════
// INTERFACE PARA AS PROPS DO COMPONENTE
// ═══════════════════════════════════════════════════════════════════════════════
// Props = "properties" = dados que o componente RECEBE de fora
//
// No caso do RootLayout, ele recebe "children" do Next.js
// children = o conteúdo da página atual (page.tsx)
//
// Definir interface resolve o erro:
//   "Binding element 'children' implicitly has an 'any' type"
//
// Agora o TypeScript sabe que children é do tipo ReactNode

interface RootLayoutProps {
  children: ReactNode;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE DO LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════
//
// Duas formas de tipar os parâmetros:
//
// FORMA 1 - Inline (o que você tinha, mas incompleto):
//   function RootLayout({ children })  ← Falta o tipo!
//
// FORMA 2 - Com interface (recomendado):
//   function RootLayout({ children }: RootLayoutProps)
//                                    ↑ Aqui dizemos o tipo
//
// A desestruturação { children } extrai a propriedade do objeto props
// É o mesmo que:
//   function RootLayout(props: RootLayoutProps) {
//     const children = props.children
//   }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      {/* 
        ════════════════════════════════════════════════════════════════════════
        TAG <html>
        ════════════════════════════════════════════════════════════════════════
        lang="pt-BR" é importante para:
          - Leitores de tela saberem a pronúncia correta
          - Google entender o idioma do site
          - Navegadores oferecerem tradução
      */}

      <body className="bg-slate-950 text-white antialiased">
        {/* 
          ════════════════════════════════════════════════════════════════════════
          CLASSES DO BODY
          ════════════════════════════════════════════════════════════════════════
          bg-slate-950  → Fundo bem escuro (quase preto)
          text-white    → Texto branco por padrão
          antialiased   → Suaviza as bordas das fontes (fica mais bonito)
        */}

        {/* SIDEBAR - Aparece em TODAS as páginas */}
        <Sidebar />

        {/* CONTEÚDO PRINCIPAL */}
        <main>
          {children}
          {/* 
            children = o conteúdo da página atual
            
            Se você está em "/" → children = conteúdo de app/page.tsx
            Se você está em "/projects" → children = conteúdo de app/projects/page.tsx
            
            O layout é o "moldura", children é o "quadro" que muda
          */}
        </main>
      </body>
    </html>
  );
}
