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
import ThemeProvider from "@/hooks/ThemeProvider";

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
    // suppressHydrationWarning → evita warning quando o ThemeProvider
    // altera a classe do <html> no client (dark/light).
    // O servidor não sabe qual tema o usuário escolheu (está no localStorage),
    // então o HTML inicial pode diferir do client. Esse atributo diz ao React:
    // "tudo bem, eu sei que vai mudar no client, não reclame"
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased transition-colors duration-400"
        suppressHydrationWarning
      >
        {/* ThemeProvider envolve TUDO — qualquer componente pode usar useTheme() */}
        <ThemeProvider>
          <Sidebar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
