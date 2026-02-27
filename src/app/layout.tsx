// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT.TSX — Esqueleto de todas as páginas
// ═══════════════════════════════════════════════════════════════════════════════
// O layout.tsx define a estrutura que ENVOLVE todas as páginas.
// Quando você navega, o layout NÃO recarrega — só o {children} muda.

import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/features/portfolio-hero/components/Sidebar/Sidebar";
import ThemeProvider from "@/hooks/ThemeProvider";

export const metadata: Metadata = {
  title: "Bernardo Luz | Portfólio",
  description: "Portfólio pessoal de Bernardo Luz - Engenheiro de Computação",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // suppressHydrationWarning → o servidor não sabe o tema do localStorage,
    // então o HTML inicial pode diferir do client. Esse atributo silencia o aviso.
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Sidebar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
