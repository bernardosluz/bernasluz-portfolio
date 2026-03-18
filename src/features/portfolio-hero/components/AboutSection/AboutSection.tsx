// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION — Seção "Sobre Mim"
// ═══════════════════════════════════════════════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerFast } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

export default function AboutSection() {
  // Achata o objeto de skills em um array único: ["React", "Next.js", ...]
  // Object.values() pega os arrays de cada categoria
  // .flat() junta todos em um só
  const allSkills = Object.values(siteConfig.skills).flat();
  const playlist = siteConfig.studyPlaylist;

  return (
    <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
      {/* py-24/36 = espaço generoso em cima e embaixo → separa visualmente das outras seções */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        // whileInView = anima quando entra na viewport (lazy animation)
        viewport={{ once: true, margin: "-80px" }}
      // once: true = anima só 1 vez (não repete ao scrollar de volta)
      // margin: "-80px" = dispara 80px antes de realmente aparecer
      >
        {/* Label — usa classe modular .section-label */}
        <motion.div variants={fadeInUp} className="section-label">
          <span>Sobre Mim</span>
        </motion.div>

        {/* Título */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Resumo Profissional e Estudantil
        </motion.h2>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg sm:text-xl leading-relaxed"
          // leading-relaxed = line-height: 1.625 → leitura confortável em parágrafos
          style={{ color: "var(--text-secondary)" }}
        >
          {siteConfig.about}
        </motion.p>

        {/* Skills — cada badge anima individualmente */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {allSkills.map((skill) => (
            <motion.span
              key={skill}
              variants={fadeInUp}
              className="badge"
            // .badge é a classe modular do globals.css
            // Já tem padding, border-radius, cores do tema, hover, tudo pronto
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Playlist de Música */}
        <motion.h2
          variants={fadeInUp}
          className="mt-12 text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {playlist.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg sm:text-xl leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {playlist.description}
        </motion.p>

        {/* Gêneros — cada badge anima individualmente */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {playlist.genres.map((genre) => (
            <motion.span
              key={genre}
              variants={fadeInUp}
              className="badge"
            // .badge é a classe modular do globals.css
            // Já tem padding, border-radius, cores do tema, hover, tudo pronto
            >
              {genre}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-6 overflow-hidden rounded-xl border flex items-center justify-center md:px-10 md:py-10 lg:px-14 lg:py-16"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--accent-hover)" }}
        >
          <iframe
            src={playlist.videoEmbedUrl}
            title="Playlist de Música"
            className="block w-full md:w-[86%] lg:w-[82%] max-w-[900px] aspect-video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>

          <div className="btn-primary hidden"></div>
        <motion.div>
          <a
            href={playlist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-hover"
          >
            Abrir playlist completa
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
