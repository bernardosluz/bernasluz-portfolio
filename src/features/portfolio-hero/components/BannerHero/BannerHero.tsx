// ═══════════════════════════════════════════════════════════════════════════════
// BANNER HERO — Layout responsivo mobile / desktop
// ═══════════════════════════════════════════════════════════════════════════════
//
// MOBILE (< 768px):
// ┌────────────────────────┐
// │ IMAGEM (full bleed)    │  ← ponta a ponta, 65svh
// │ ░░░ gradiente ░░░░░░░░ │
// ├────────────────────────┤
// │ Bernardo Luz           │  ← px-5 (20px de margem)
// │ Eng. Computação / UFS  │
// │ 📍 Aracaju, SE        │
// │ [gh] [li] [ig]        │
// └────────────────────────┘
//
// DESKTOP (≥ 768px):
//     ┌──────────────────┐
//     │                  │
//     │  IMAGEM contida  │  ← max-w-5xl, bordas arredondadas
//     │  (rounded-2xl)   │
//     │ ░░ gradiente ░░░ │
//     ├──────────────────┤
//     │ Bernardo Luz     │  ← alinhado com a imagem
//     │ Eng. Computação  │
//     │ [gh] [li] [ig]   │
//     └──────────────────┘
//
// POR QUE CONTER A IMAGEM NO DESKTOP?
// - Em telas largas (1440px+), object-cover em full width corta muito
// - Imagem contida com bordas arredondadas = visual limpo e moderno
// - O conteúdo não fica perdido num canto da tela

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const BANNER_IMAGE = "/lofi_bernardo_recortado.jpg";

export default function BannerHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative">
      {/* ═══ BLOCO DA IMAGEM ═══ */}
      <div
        className="relative w-full h-[65svh] md:h-auto md:max-w-[600px] md:mx-auto md:px-8 overflow-hidden md:rounded-2xl flex items-center justify-center"
        style={{
          backgroundColor: "var(--accent)",
          aspectRatio: "16 / 20",
        }}
        // Mobile: full width, altura 65svh
        // Desktop: máximo 600px de largura, centrado, aspect ratio 16:20
        // flex items-center justify-center: centraliza a imagem
      >
        <motion.div
          className="relative w-full h-full"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={BANNER_IMAGE}
            alt="Bernardo Luz - Ilustração estilo lofi"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Gradiente inferior — imagem "derrete" no fundo */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)`,
          }}
        />

        {/* Vinheta lateral */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, var(--bg-primary) 100%)`,
          }}
        />
      </div>

      {/* ═══ CONTAINER PRINCIPAL ═══
            Mobile: sem padding (imagem full bleed)
            Desktop: padding lateral + max-width + centralizado
            
            md:px-8  → 32px de margem lateral a partir de 768px
            md:pt-6  → pequeno espaço no topo (a imagem não gruda no topo da página)
            max-w-5xl = 1024px máximo → imagem nunca fica larga demais
            mx-auto  → centraliza horizontalmente
        */}
      <div className="md:px-8 lg:px-12 md:pt-6 md:max-w-5xl md:mx-auto">
        {/* ═══ BLOCO DO CONTEÚDO ═══
          Usa o MESMO max-width e padding do container da imagem
          → o texto fica alinhado com as bordas da imagem no desktop
          
          -mt-16 puxa pra cima → sobrepõe a área do gradiente
      */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="-mt-16 relative z-10 px-5 sm:px-8 lg:px-12 pb-24 md:pb-32 md:max-w-5xl md:mx-auto"
        >
          <div>
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

            {/* Links sociais */}
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
      </div>
    </section>
  );
}
