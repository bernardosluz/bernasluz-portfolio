// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR — Navegação lateral + toggle de tema
// ═══════════════════════════════════════════════════════════════════════════════
//
// MUDANÇAS:
// 1. Sidebar agora anima com Framer Motion (AnimatePresence) em vez de CSS translate
//    → Entrada/saída mais suave, com controle de timing
// 2. Overlay também anima (fade in/out) em vez de aparecer/sumir bruscamente
// 3. Botão de tema e hambúrguer usam .btn-icon do globals.css (menor, mais limpo)
// 4. Items do menu com hover mais sutil
// 5. Touch area mínima de 44px (padrão Apple) para acessibilidade no mobile

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// usePathname → retorna a URL atual ("/", "/projects", etc.)
// Usado para marcar qual item do menu está ativo
import { motion, AnimatePresence } from "framer-motion";
// AnimatePresence → permite animar componentes quando eles SAEM do DOM
// Sem ele, o React remove o elemento instantaneamente e a animação de saída não rola
import { Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/hooks/ThemeProvider";

// ═══ Dados do menu ═══
// Centralizados aqui em vez de inline no JSX para facilitar manutenção
interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  newTab?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "Sobre Mim", path: "/", disabled: false },
  {
    label: "Estudo",
    path: "/estudo/index.html",
    disabled: true,
    newTab: false,
  },
  { label: "Projetos", path: "/projects", disabled: true },
  { label: "Habilidades", path: "/skills", disabled: true },
  { label: "TCC", path: "/tcc", disabled: true },
  { label: "Mestrado", path: "/mestrado", disabled: true },
  { label: "Doutorado", path: "/doutorado", disabled: true },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          BARRA SUPERIOR FIXA — hambúrguer (esquerda) + tema (direita)
          ═══════════════════════════════════════════════════════════════════
          pointer-events-none no container → não bloqueia cliques no conteúdo
          pointer-events-auto nos botões → só os botões são clicáveis
      */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none">
        {/* Botão hambúrguer / fechar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-icon pointer-events-auto"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {/* AnimatePresence com mode="wait":
              Espera a animação de SAÍDA terminar antes de montar o novo ícone.
              Sem mode="wait", os dois ícones ficam visíveis ao mesmo tempo. */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hambúrguer manual — 3 linhas com espaçamento uniforme */}
                <div className="w-[18px] flex flex-col gap-[4px]">
                  <div
                    className="h-[2px] w-full rounded-full"
                    style={{ background: "var(--text-primary)" }}
                  />
                  <div
                    className="h-[2px] w-full rounded-full"
                    style={{ background: "var(--text-primary)" }}
                  />
                  <div
                    className="h-[2px] w-full rounded-full"
                    style={{ background: "var(--text-primary)" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Botão toggle tema */}
        <button
          onClick={toggleTheme}
          className="btn-icon pointer-events-auto"
          style={{ color: "var(--accent)" }}
          aria-label={
            theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          OVERLAY + SIDEBAR — animam juntos com AnimatePresence
          ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay escuro — clique fecha o sidebar */}
            <motion.div
              className="fixed inset-0 z-30"
              style={{ background: "var(--overlay)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar — desliza da esquerda */}
            <motion.aside
              className="glass fixed top-0 left-0 h-screen w-72 p-6 pt-20 flex flex-col z-40 overflow-y-auto"
              // .glass = classe modular do globals.css (background + blur + borda)
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // spring com damping alto → desacelera suavemente (sem bounce excessivo)
            >
              {/* Cabeçalho */}
              <div className="mb-8">
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Bernardo Luz
                </h2>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "var(--accent)" }}
                >
                  Portfólio
                </p>
              </div>

              {/* Menu de navegação */}
              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;

                  // ─── Item desabilitado ───
                  if (item.disabled) {
                    return (
                      <div
                        key={item.path}
                        className="flex items-center justify-between p-3 rounded-lg opacity-40 cursor-not-allowed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span className="text-sm">{item.label}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--bg-elevated)",
                            color: "var(--text-muted)",
                          }}
                        >
                          Em breve
                        </span>
                      </div>
                    );
                  }

                  // ─── Item com link externo (nova aba) ───
                  if (item.newTab) {
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center p-3 rounded-lg text-sm transition-colors duration-200"
                        style={{
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  // ─── Item normal ───
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`relative flex items-center p-3 rounded-lg text-sm transition-colors duration-200 ${
                        isActive ? "nav-active" : ""
                      }`}
                      // nav-active = classe do Sidebar.css (indicador lateral)
                      style={{
                        color: isActive
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                        background: isActive
                          ? "var(--accent-muted)"
                          : "transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Rodapé */}
              <div
                className="pt-6 mt-auto"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  © 2025 Bernardo Luz
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
