// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS.TS — Variantes do Framer Motion reutilizáveis
// ═══════════════════════════════════════════════════════════════════════════════
//
// O QUE SÃO VARIANTS?
// São objetos que definem estados de animação nomeados ("hidden", "visible").
// Em vez de escrever animate={{ opacity: 1, y: 0 }} em cada componente,
// definimos uma vez aqui e referenciamos com variants={fadeInUp}.
//
// A ease [0.25, 0.4, 0.25, 1] é uma curva cubic-bezier customizada:
// - Começa devagar (0.25, 0.4)
// - Termina suave (0.25, 1)
// - Resultado: movimento natural, não robótico

import { Variants } from "framer-motion";
// Variants = tipo TypeScript que define a estrutura { [nome]: TargetAndTransition }

// Aparece de baixo para cima com fade
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Fade simples (sem movimento)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Escala de 97% para 100% com fade — bom para cards
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Container que anima filhos em sequência (stagger)
// staggerChildren = intervalo entre cada filho começar a animar
// delayChildren = delay antes do primeiro filho começar
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Versão mais rápida do stagger para listas longas (badges, tags)
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

// Desliza da esquerda
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Desliza da direita
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};
