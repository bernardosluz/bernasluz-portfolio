"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

const CARD_WIDTH = 300;
const CARD_GAP = 16;

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calculateConstraints = () => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.offsetWidth;
      const totalWidth =
        siteConfig.projects.length * CARD_WIDTH +
        (siteConfig.projects.length - 1) * CARD_GAP;
      setDragConstraint(Math.min(0, -(totalWidth - containerWidth)));
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  const handleDragEnd = () => {
    const currentX = dragX.get();
    const index = Math.round(Math.abs(currentX) / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(
      Math.max(0, Math.min(index, siteConfig.projects.length - 1)),
    );
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="px-6 max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 mb-6"
          >
            <div
              className="h-px w-12"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Trabalhos
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Meus Projetos
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Alguns dos projetos que venho desenvolvendo.
          </motion.p>
        </motion.div>
      </div>

      {/* Carrossel arrastável */}
      <div ref={carouselRef} className="mt-12 overflow-visible">
        <motion.div
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          animate={{ x: -(activeIndex * (CARD_WIDTH + CARD_GAP)) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex gap-4 px-6 cursor-grab active:cursor-grabbing"
        >
          {siteConfig.projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="flex-shrink-0"
              style={{ width: CARD_WIDTH }}
            >
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1 : 0.95,
                  opacity: activeIndex === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                {/* Área da imagem */}
                <div className="relative h-44 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Screenshot do projeto ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, var(--accent-muted), var(--bg-card), var(--bg-secondary))`,
                      }}
                    >
                      <span
                        className="text-5xl font-bold"
                        style={{ color: "var(--accent)", opacity: 0.2 }}
                      >
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Linha decorativa no topo */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, var(--accent), transparent)`,
                      opacity: 0.5,
                    }}
                  />

                  {/* Gradiente na base da imagem */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background: `linear-gradient(to top, var(--card-bg), transparent)`,
                    }}
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed line-clamp-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "var(--tech-bg)",
                          border: "1px solid var(--tech-border)",
                          color: "var(--accent)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ExternalLink size={14} />
                      Ver projeto
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {siteConfig.projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: activeIndex === index ? "32px" : "8px",
              background:
                activeIndex === index ? "var(--accent)" : "var(--text-muted)",
            }}
            aria-label={`Ir para projeto ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
