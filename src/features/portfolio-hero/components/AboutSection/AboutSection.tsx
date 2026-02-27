"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto"
      >
        {/* Label decorativa */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px w-12" style={{ background: "var(--accent)" }} />
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Sobre
          </span>
        </motion.div>

        {/* Título */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Sobre Mim
        </motion.h2>

        {/* Texto */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {siteConfig.about}
        </motion.p>

        {/* Badges de skills — usam variáveis CSS do tema */}
        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-2">
          {Object.values(siteConfig.skills)
            .flat()
            .map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 cursor-default"
                style={{
                  background: "var(--badge-bg)",
                  border: "1px solid var(--badge-border)",
                  color: "var(--text-secondary)",
                }}
              >
                {skill}
              </span>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
