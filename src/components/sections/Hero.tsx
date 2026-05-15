"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center noise-bg"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <motion.div
        className="section-container relative z-10 py-28 md:py-36"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border"
            style={{ 
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              background: "var(--bg-card)"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Disponível para projetos
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
          style={{ color: "var(--text-primary)" }}
        >
          {siteConfig.name}
          <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-xl sm:text-2xl md:text-3xl font-light"
          style={{ color: "var(--text-secondary)" }}
        >
          {siteConfig.role}
          <span className="mx-3 opacity-30">—</span>
          <span className="text-gradient">{siteConfig.tagline}</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {siteConfig.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary">
            Ver projetos
          </a>
          <a href="#contact" className="btn-outline">
            Entrar em contato
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
