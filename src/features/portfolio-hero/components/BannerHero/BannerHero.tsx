// ═══════════════════════════════════════════════════════════════════════════════
// BANNER HERO - TEMA-AWARE
// ═══════════════════════════════════════════════════════════════════════════════
//
// MUDANÇA PARA TEMAS:
// Antes: cores fixas do Tailwind (text-white, bg-slate-950, text-amber-500)
// Agora: CSS variables que mudam conforme o tema
//
// Em vez de "text-white" usamos style={{ color: "var(--text-primary)" }}
// Em vez de "bg-amber-500" usamos style={{ background: "var(--accent)" }}
//
// POR QUE INLINE STYLES PARA CORES?
// O Tailwind não conhece nossas variáveis CSS customizadas nativamente.
// Poderíamos configurar no tailwind.config.js, mas inline styles com var()
// é mais direto e funciona sem configuração extra.
// Classes de LAYOUT (flex, px-6, rounded-full) continuam do Tailwind normalmente.

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const BANNER_IMAGE = "/lofi_bernardo_recortado.jpg";

export default function BannerHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Imagem com parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={BANNER_IMAGE}
          alt="Bernardo Luz - Ilustração estilo lofi"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Gradientes — agora usam variáveis CSS do tema */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--gradient-hero-mid), var(--gradient-hero-end))`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, var(--gradient-hero-mid), transparent, var(--gradient-hero-mid))`,
        }}
      />

      {/* Conteúdo */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-16 md:pb-20"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-xl md:text-2xl font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.role}
            <span
              className="mx-3"
              style={{ color: "var(--accent)", opacity: 0.5 }}
            >
              •
            </span>
            {siteConfig.university}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="mt-4 flex items-center gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <MapPin size={14} style={{ color: "var(--accent)" }} />
            <span>{siteConfig.location}</span>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            {/* Botão CTA */}
            <a
              href={siteConfig.links.email}
              className="group relative px-7 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
                boxShadow: "0 10px 25px var(--accent-muted)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Entrar em contato</span>
            </a>

            {/* Ícones sociais */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-300"
                style={{
                  background: "var(--btn-social-bg)",
                  border: "1px solid var(--btn-social-border)",
                  color: "var(--text-secondary)",
                }}
              >
                <Github size={20} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-300"
                style={{
                  background: "var(--btn-social-bg)",
                  border: "1px solid var(--btn-social-border)",
                  color: "var(--text-secondary)",
                }}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: "2px solid var(--border)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
