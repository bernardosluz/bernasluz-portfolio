// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR COM BOTÃO DE TROCA DE TEMA
// ═══════════════════════════════════════════════════════════════════════════════
//
// NOVIDADE:
// Adicionado botão de sol/lua no cabeçalho do sidebar para trocar entre
// tema escuro e claro. Usa o hook useTheme() do nosso ThemeProvider.
//
// O botão fica TAMBÉM no canto superior direito da tela (ao lado do hambúrguer),
// visível mesmo com o sidebar fechado.

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
// Sun = ícone de sol (indica: clique para tema claro)
// Moon = ícone de lua (indica: clique para tema escuro)
import { useTheme } from "@/hooks/ThemeProvider";
import "./Sidebar.css";

interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  newTab?: boolean;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  // theme → "dark" ou "light"
  // toggleTheme → função que alterna entre os dois

  const menuItems: MenuItem[] = [
    { label: "Sobre Mim", path: "/", disabled: false },
    {
      label: "Estudo",
      path: "/estudo/index.html",
      disabled: false,
      newTab: false,
    },
    { label: "Projetos", path: "/projects", disabled: true },
    { label: "Habilidades", path: "/skills", disabled: true },
    { label: "TCC", path: "/tcc", disabled: true },
    { label: "Mestrado", path: "/mestrado", disabled: true },
    { label: "Doutorado", path: "/doutorado", disabled: true },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          BARRA SUPERIOR FIXA (hambúrguer + botão de tema)
          ════════════════════════════════════════════════════════════════════
          Ficam sempre visíveis, mesmo com o sidebar fechado.
      */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* pointer-events-none no container, pointer-events-auto nos botões
            → o div não bloqueia cliques no conteúdo atrás dele */}

        {/* Botão hambúrguer */}
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-lg backdrop-blur-md transition-colors duration-200 pointer-events-auto"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-px" : ""}`}
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className={`w-full h-0.5 rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`}
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-px" : ""}`}
              style={{ background: "var(--text-primary)" }}
            />
          </div>
        </button>

        {/* ════════════════════════════════════════════════════════════════════
            BOTÃO DE TROCAR TEMA (SOL / LUA)
            ════════════════════════════════════════════════════════════════════
            Se o tema é "dark" → mostra ícone de SOL (clique para clarear)
            Se o tema é "light" → mostra ícone de LUA (clique para escurecer)
            
            O ícone tem uma rotação animada ao clicar (transition-transform).
        */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-lg backdrop-blur-md transition-all duration-300 pointer-events-auto"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--accent)",
          }}
          aria-label={
            theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm"
          style={{ background: "var(--overlay)" }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-glass fixed top-0 left-0 h-screen w-72 p-6 pt-20 flex flex-col z-40 transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Cabeçalho */}
        <div className="mb-8">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Bernardo Luz
          </h2>
          <p className="text-sm" style={{ color: "var(--accent)" }}>
            Portfólio
          </p>
        </div>

        {/* Navegação */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            // Classes dinâmicas + styles inline para cores do tema
            const baseClasses =
              "nav-item-transition flex items-center gap-3 w-full p-3 rounded-lg";

            if (item.disabled) {
              return (
                <Link
                  key={item.path}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`${baseClasses} opacity-50 cursor-not-allowed`}
                  style={{ color: "var(--text-muted)" }}
                  aria-disabled
                >
                  <span className="font-medium">{item.label}</span>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Em breve
                  </span>
                </Link>
              );
            }

            if (item.newTab) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`${baseClasses}`}
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`${baseClasses} ${isActive ? "active-indicator" : ""}`}
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  background: isActive ? "var(--accent-muted)" : "transparent",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Rodapé */}
        <div className="pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 Bernardo Luz
          </p>
        </div>
      </aside>
    </>
  );
}
