// ═══════════════════════════════════════════════════════════════════════════════
// BANNER HERO — Imagem em cima, informações embaixo
// ═══════════════════════════════════════════════════════════════════════════════
//
// NOVO LAYOUT:
// ┌──────────────────────┐
// │                      │
// │   IMAGEM (parallax)  │  ← 65vh no mobile, 70vh no desktop
// │                      │
// │ ░░ gradiente fade ░░ │  ← transição suave para o fundo
// ├──────────────────────┤
// │  Bernardo Luz         │
// │  Eng. Computação / UFS│
// │  📍 Aracaju, SE      │
// │  [gh] [li] [ig]      │  ← ícones sociais
// └──────────────────────┘
//
// POR QUE ABAIXO DA IMAGEM?
// - Na web com tela larga, texto sobre imagem escura nem sempre é legível
// - Separar imagem e texto garante contraste perfeito em qualquer tema
// - No mobile fica mais limpo — scroll natural de cima para baixo

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, MapPin } from "lucide-react";
// Instagram → novo ícone importado do lucide-react
// lucide-react tem +1000 ícones, importar individualmente = tree-shaking
// (só o código dos ícones usados vai pro bundle final)
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const BANNER_IMAGE = "/lofi_bernardo_recortado.jpg";

export default function BannerHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax mais sutil (10%) — imagem se move devagar ao scrollar
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  // Zoom sutil de 1x → 1.05x no scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={sectionRef}>
      {/* ─── BLOCO DA IMAGEM ─── */}
      {/* Ocupa 65% da viewport no mobile, 70% no desktop */}
      {/* relative + overflow-hidden = o parallax não vaza pra fora */}
      <div className="relative h-[65svh] md:h-[70vh] overflow-hidden">
        {/* Imagem com parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={BANNER_IMAGE}
            alt="Bernardo Luz - Ilustração estilo lofi"
            className="w-full h-full object-cover object-[center_20%]"
          />
        </motion.div>

        {/* Gradiente na base — faz a imagem "derreter" no fundo da página */}
        {/* Esse gradiente é o que cria a transição suave entre imagem e conteúdo */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)`,
          }}
        />

        {/* Gradiente lateral sutil — vinheta nas bordas */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, var(--bg-primary) 100%)`,
          }}
        />
      </div>

      {/* ─── BLOCO DO CONTEÚDO ─── */}
      {/* mt negativo puxa o conteúdo pra cima, sobrepondo levemente o gradiente */}
      {/* Isso elimina a "quebra" visual entre imagem e texto */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="-mt-16 relative z-10 px-5 sm:px-8 pb-24 md:pb-32"
        // -mt-16 = sobe 4rem, sobrepõe a área do gradiente
        // pb-24/32 = espaço generoso embaixo → separa visualmente do About
      >
        <div className="max-w-3xl mx-auto">
          {/* Nome */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            {siteConfig.name}
          </motion.h1>

          {/* Role / Universidade */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg sm:text-xl md:text-2xl font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.role}
            <span
              className="mx-2 opacity-40"
              style={{ color: "var(--accent)" }}
            >
              /
            </span>
            {siteConfig.university}
          </motion.p>

          {/* Localização */}
          <motion.div
            variants={fadeInUp}
            className="mt-3 flex items-center gap-2 text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            <MapPin size={16} style={{ color: "var(--accent)" }} />
            <span>{siteConfig.location}</span>
          </motion.div>

          {/* ─── Links sociais ─── */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
