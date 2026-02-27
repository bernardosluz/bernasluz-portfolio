// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION — Seção "Sobre Mim"
// ═══════════════════════════════════════════════════════════════════════════════
//
// MUDANÇAS:
// 1. Usa .section-label do globals.css (antes era markup manual)
// 2. Usa .badge do globals.css (antes era style inline)
// 3. Badges animam individualmente com staggerFast (mais fluido)
// 4. Padding responsivo melhorado para mobile
// 5. Texto secundário com line-height mais confortável

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerFast } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

export default function AboutSection() {
  // Achata o objeto de skills em um array único: ["React", "Next.js", ...]
  // Object.values() pega os arrays de cada categoria
  // .flat() junta todos em um só
  const allSkills = Object.values(siteConfig.skills).flat();

  return (
    <section className="py-24 md:py-36 px-5 sm:px-8">
      {/* py-24/36 = espaço generoso em cima e embaixo → separa visualmente das outras seções */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        // whileInView = anima quando entra na viewport (lazy animation)
        viewport={{ once: true, margin: "-80px" }}
        // once: true = anima só 1 vez (não repete ao scrollar de volta)
        // margin: "-80px" = dispara 80px antes de realmente aparecer
        className="max-w-3xl mx-auto"
      >
        {/* Label — usa classe modular .section-label */}
        <motion.div variants={fadeInUp} className="section-label">
          <span>Sobre</span>
        </motion.div>

        {/* Título */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Sobre Mim
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
      </motion.div>
    </section>
  );
}
