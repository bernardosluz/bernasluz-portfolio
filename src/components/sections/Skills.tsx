"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer, staggerFast } from "@/lib/animations";

const skillCategories = [
  { title: "Frontend", items: siteConfig.skills.frontend, icon: "◆" },
  { title: "Backend", items: siteConfig.skills.backend, icon: "◇" },
  { title: "Low-Level", items: siteConfig.skills.lowLevel, icon: "⬡" },
  { title: "Ferramentas", items: siteConfig.skills.tools, icon: "○" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, var(--accent-muted), transparent)`,
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="section-label">
            <span>Skills</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Tecnologias & Ferramentas
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-lg text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            As tecnologias que utilizo no dia a dia para construir produtos digitais.
          </motion.p>
        </motion.div>

        {/* Skills grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-2xl border"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <span style={{ color: "var(--accent)" }}>{category.icon}</span>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-primary)" }}
                >
                  {category.title}
                </h3>
              </motion.div>

              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {category.items.map((skill) => (
                  <motion.span key={skill} variants={fadeInUp} className="badge">
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
