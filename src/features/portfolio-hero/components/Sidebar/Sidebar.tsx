"use client";
// 'use client' = Este componente roda no NAVEGADOR (não no servidor)
// Necessário porque usamos useState, onClick, usePathname

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

// Interface define o "formato" de cada item do menu
interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  newTab?: boolean;
}

export default function Sidebar() {
  // Estado: sidebar aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Pega a URL atual para destacar o item ativo
  const pathname = usePathname();

  // Lista de itens do menu
  const menuItems: MenuItem[] = [
    { label: "Sobre Mim", path: "/", disabled: false },
    { label: "Estudo", path: "/estudo/index.html", disabled: false, newTab: true },
    { label: "Projetos", path: "/projects", disabled: true },
    { label: "Habilidades", path: "/skills", disabled: true },
    { label: "TCC", path: "/tcc", disabled: true },
    { label: "Mestrado", path: "/mestrado", disabled: true },
    { label: "Doutorado", path: "/doutorado", disabled: true },
  ];

  // Alterna entre aberto/fechado
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          BOTÃO HAMBÚRGUER
          ════════════════════════════════════════════════════════════════════
          Next.js compara o HTML do servidor com o do cliente.
      */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 transition-colors duration-200"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {/* Ícone hambúrguer animado - 3 linhas que viram X */}
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-px" : ""}`}
          />
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`}
          />
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-px" : ""}`}
          />
        </div>
      </button>

      {/* ════════════════════════════════════════════════════════════════════
          OVERLAY - Fundo escuro quando sidebar está aberto
          ════════════════════════════════════════════════════════════════════ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* ════════════════════════════════════════════════════════════════════
          SIDEBAR PRINCIPAL
          ════════════════════════════════════════════════════════════════════
          Classes explicadas:
          - sidebar-glass: efeito vidro do CSS
          - fixed top-0 left-0: grudado no canto superior esquerdo
          - h-screen: altura = 100% da tela
          - w-72: largura de 288px
          - translate-x-0: posição normal (visível)
          - -translate-x-full: move 100% para esquerda (escondido)
      */}
      <aside
        className={`sidebar-glass fixed top-0 left-0 h-screen w-72 p-6 pt-20 flex flex-col z-40 transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Cabeçalho */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Bernardo Luz</h2>
          <p className="text-sm text-slate-400">Portfólio</p>
        </div>

        {/* Navegação */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            // Monta as classes baseado no estado do item
            // Separei em variável para ficar mais legível
            const linkClasses = `nav-item-transition flex items-center gap-3 w-full p-3 rounded-lg ${
              item.disabled
                ? "opacity-50 cursor-not-allowed text-slate-500"
                : isActive
                  ? "bg-blue-600/20 text-blue-400 active-indicator"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`;

            // Use a plain <a> when we want to open in a new tab (reliably opens static files)
            if (item.newTab && !item.disabled) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={linkClasses}
                >
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.disabled ? "#" : item.path}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                    return;
                  }
                  setIsOpen(false);
                }}
                className={linkClasses}
                aria-disabled={item.disabled}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="font-medium">{item.label}</span>
                {item.disabled && (
                  <span className="ml-auto text-xs bg-slate-700 px-2 py-0.5 rounded-full">
                    Em breve
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé */}
        <div className="pt-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">© 2025 Bernardo Luz</p>
        </div>
      </aside>
    </>
  );
}
