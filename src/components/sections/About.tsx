"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer, staggerFast } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="section-label">
            <span>Sobre</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Um pouco sobre mim
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.about}
          </motion.p>

          {/* Info cards */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <InfoCard
              icon={<MapPin size={18} />}
              label="Localização"
              value={siteConfig.location}
            />
            <InfoCard
              icon={<GraduationCap size={18} />}
              label="Universidade"
              value={`${siteConfig.university} — ${siteConfig.tagline}`}
            />
            <InfoCard
              icon={<Briefcase size={18} />}
              label="Trabalho"
              value={siteConfig.experience[0].role}
            />
          </motion.div>

          {/* Experience timeline */}
          <motion.div variants={fadeInUp} className="mt-16">
            <h3
              className="text-lg font-semibold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Experiência
            </h3>
            <div className="space-y-6">
              {siteConfig.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative pl-6 border-l-2"
                  style={{ borderColor: i === 0 ? "var(--accent)" : "var(--border)" }}
                >
                  <div
                    className="absolute left-[-5px] top-2 w-2 h-2 rounded-full"
                    style={{ background: i === 0 ? "var(--accent)" : "var(--text-muted)" }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <h4 className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {exp.role}
                    </h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full w-fit"
                      style={{
                        background: i === 0 ? "var(--accent-muted)" : "var(--bg-elevated)",
                        color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
    >
      <div className="flex items-center gap-2 mb-2" style={{ color: "var(--accent)" }}>
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}
