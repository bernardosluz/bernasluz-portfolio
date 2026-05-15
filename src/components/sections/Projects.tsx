"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="section-label">
            <span>Projetos</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Trabalhos selecionados
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-lg text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Alguns dos projetos que venho desenvolvendo.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {siteConfig.projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={scaleIn}
              className={`card group ${i === 0 ? "md:col-span-2" : ""}`}
            >
              {/* Cover */}
              <div className="relative h-36 md:h-44 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, var(--bg-elevated), var(--bg-card))`,
                    }}
                  />
                )}
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, var(--accent-glow), transparent 60%)`,
                  }}
                />
                {/* Number overlay */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <span
                    className="text-6xl font-bold"
                    style={{
                      color: project.image ? "white" : "var(--accent)",
                      opacity: project.image ? 0.25 : 0.1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--accent), transparent)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="text-xl md:text-2xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon"
                        aria-label="GitHub"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon"
                        aria-label="Live"
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="badge-tech">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
