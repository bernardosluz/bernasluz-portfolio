// ═══════════════════════════════════════════════════════════════════════════════
// THEME PROVIDER - GERENCIADOR DE TEMA (ESCURO / CLARO)
// ═══════════════════════════════════════════════════════════════════════════════
//
// O QUE É UM CONTEXT?
// No React, dados normalmente fluem de PAI para FILHO via props.
// Mas e se um componente lá no fundo da árvore precisa de um dado?
// Teríamos que passar a prop por 5, 10 componentes intermediários.
// Isso é o "prop drilling" — chato e difícil de manter.
//
// Context resolve isso: cria um "canal global" que qualquer componente
// pode acessar diretamente, não importa onde esteja na árvore.
//
// COMO FUNCIONA AQUI:
// 1. Criamos o contexto com createContext (o "canal")
// 2. ThemeProvider é o componente que PROVÊ o valor (tema atual + função de trocar)
// 3. useTheme() é o hook que CONSOME o valor em qualquer componente
//
// COMO O TEMA É APLICADO:
// Adicionamos a classe "dark" ou "light" no elemento <html>.
// No globals.css, usamos html.dark { ... } e html.light { ... }
// para definir variáveis CSS diferentes para cada tema.
// Todos os componentes usam essas variáveis → tema muda instantaneamente!

"use client";
// "use client" porque usamos useState, useEffect, createContext — tudo client-side

import { createContext, useContext, useState, useEffect } from "react";
// createContext → cria o "canal" de dados global
// useContext → hook para CONSUMIR dados de um Context
// useState → estado local (qual tema está ativo)
// useEffect → efeito colateral (aplicar classe no <html>, salvar preferência)

import type { ReactNode } from "react";
// ReactNode → tipo para "qualquer coisa que o React pode renderizar"

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

// Os dois temas possíveis
type Theme = "dark" | "light";
// "dark" | "light" é um Union Type do TypeScript
// Significa: o valor SÓ pode ser "dark" OU "light", nada mais

// O que o Context disponibiliza para os consumidores
interface ThemeContextType {
  theme: Theme; // Tema atual
  toggleTheme: () => void; // Função para alternar entre temas
}
// void → a função não retorna nada (só muda o estado)

// ═══════════════════════════════════════════════════════════════════════════════
// CRIAÇÃO DO CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════
// undefined como valor inicial → será preenchido pelo Provider
// Se alguém tentar usar useTheme() fora do Provider, o valor será undefined
// e o hook lançará um erro explicativo (veja abaixo)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════════════════════════
// HOOK CUSTOMIZADO: useTheme
// ═══════════════════════════════════════════════════════════════════════════════
// Por que criar um hook ao invés de usar useContext diretamente?
// 1. Encapsula a verificação de erro (se Context for undefined)
// 2. Quem usa não precisa importar o ThemeContext, só o useTheme
// 3. Autocomplete melhor no editor (retorna ThemeContextType, não undefined)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme precisa estar dentro de um <ThemeProvider>");
    // Esse erro aparece se você usar useTheme() num componente que NÃO
    // está dentro do ThemeProvider na árvore de componentes
  }
  return context;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PROVIDER
// ═══════════════════════════════════════════════════════════════════════════════
// Envolve toda a app (fica no layout.tsx) e fornece o tema para todos os filhos
export default function ThemeProvider({ children }: { children: ReactNode }) {
  // ═══ INICIALIZAÇÃO INTELIGENTE ═══
  // useState aceita uma FUNÇÃO como valor inicial (chamada "lazy initializer").
  // Essa função roda SÓ UMA VEZ, na primeira renderização.
  //
  // Antes (causava o erro):
  //   const [theme, setTheme] = useState("dark");  ← sempre "dark"
  //   useEffect(() => { setTheme(localStorage...) }, []);  ← setState dentro de effect!
  //
  // Agora: já lê do localStorage na inicialização, sem precisar de efeito.
  const [theme, setTheme] = useState<Theme>(() => {
    // typeof window === "undefined" → estamos no SERVIDOR (SSR do Next.js)
    // O servidor não tem localStorage, então retornamos "dark" como fallback.
    // No client, o código roda de novo e aí sim lê do localStorage.
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : "dark";
  });

  // ═══ EFEITO: APLICA CLASSE NO <html> E SALVA ═══
  // Esse useEffect continua porque ele FAZ coisas no DOM (side effect legítimo),
  // não chama setState — só manipula classList e localStorage.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
