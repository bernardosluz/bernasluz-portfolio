// ═══════════════════════════════════════════════════════════════════════════════
// THEME PROVIDER — Gerenciador de tema escuro/claro
// ═══════════════════════════════════════════════════════════════════════════════
//
// FLUXO:
// 1. Lê tema salvo do localStorage (ou usa "dark" como padrão)
// 2. Adiciona class="dark" ou class="light" no <html>
// 3. globals.css define variáveis CSS diferentes para cada classe
// 4. Todos os componentes usam var(--nome) → tema muda instantaneamente
//
// CONTEXT API:
// Cria um "canal global" — qualquer componente acessa o tema sem prop drilling.
// useTheme() retorna { theme, toggleTheme } de qualquer lugar da árvore.

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Valor inicial undefined → se alguém usar useTheme() fora do Provider, pega o erro
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook customizado — encapsula useContext + validação
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme precisa estar dentro de um <ThemeProvider>");
  }
  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: roda só 1x na montagem
  // No servidor (SSR), window não existe → retorna "dark" como fallback
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : "dark";
  });

  // Aplica classe no <html> e salva no localStorage
  // Esse efeito NÃO chama setState — só manipula o DOM (side effect legítimo)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre dark ↔ light
  // Usa callback form (prev =>) para garantir que pega o valor mais recente
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
