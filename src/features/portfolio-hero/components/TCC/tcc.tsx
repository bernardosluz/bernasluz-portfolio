// ═══════════════════════════════════════════════════════════════════════════════
// TCC — Trabalho de Conclusão de Curso
// ═══════════════════════════════════════════════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerFast, scaleIn } from "@/lib/animations";
import { BookOpen, Code2, Target, FlaskConical, ExternalLink, FileText } from "lucide-react";
import { siteConfig } from "@/lib/config";

// ═══ Seções do TCC — ícones ficam aqui por serem componentes React ═══
const tccSections = [
    {
      icon: Target,
      title: "Objetivo",
      description:
        "Aqui terá a descrição do objetivo principal do TCC: qual problema foi identificado, " +
        "qual é a proposta de solução e o que se espera alcançar com o trabalho.",
    },
    {
      icon: FlaskConical,
      title: "Metodologia",
      description:
        "Aqui terá a explicação da metodologia adotada: pesquisa bibliográfica, desenvolvimento " +
        "experimental, validação, ferramentas e tecnologias utilizadas no processo.",
    },
    {
      icon: Code2,
      title: "Desenvolvimento",
      description:
        "Aqui terá detalhes do que foi construído: sistema, algoritmo, prova de conceito, " +
        "as principais decisões de arquitetura e tecnologia.",
    },
    {
      icon: BookOpen,
      title: "Resultados",
      description:
        "Aqui terá as apresentações dos resultados alcançados com evidências: métricas, comparações, " +
        "experimentos, validações com usuários ou estudos de caso.",
    },
  ];

export default function TCCSection() {
  const { tcc } = siteConfig;

  return (
    <main className="relative min-h-screen">
      {/* ═══ Banner centralizado com título ═══ */}
      <section
        className="w-full flex flex-col items-center justify-center text-center px-5 pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background: "linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))",
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl w-full"
        >
          <motion.div variants={fadeInUp} className="section-label mx-auto">
            <span>TCC</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mt-6 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {tcc.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base sm:text-lg"
            style={{ color: "var(--accent)" }}
          >
            {tcc.subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span>{tcc.institution}</span>
            <span>·</span>
            <span>{tcc.year}</span>
            <span>·</span>
            <span>Orientador: {tcc.advisor}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Resumo + Keywords ═══ */}
      <section className="py-16 md:py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tcc.abstract}
          </motion.p>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {tcc.keywords.map((kw) => (
              <motion.span key={kw} variants={fadeInUp} className="badge">
                {kw}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Cards das seções ═══ */}
      <section className="px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tccSections.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="card p-6 flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--accent-muted)" }}
              >
                <Icon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ Artigos publicados ═══ */}
      {tcc.articles.length > 0 && (
        <section className="px-5 sm:px-8 lg:px-12 py-16 md:py-24 max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Cabeçalho da seção */}
            <motion.div variants={fadeInUp} className="section-label">
              <span>Publicações</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl font-bold mt-4"
              style={{ color: "var(--text-primary)" }}
            >
              Artigos Publicados
            </motion.h2>

            {/* Lista de artigos */}
            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-col gap-3"
            >
              {(tcc.articles as { title: string; venue: string; year: string; url: string }[]).map((article) => (
                <motion.a
                  key={article.url}
                  variants={fadeInUp}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex items-start gap-4 group"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="mt-0.5 w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent-muted)" }}
                  >
                    <FileText size={18} style={{ color: "var(--accent)" }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm sm:text-base leading-snug group-hover:underline"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {article.title}
                    </p>
                    <p
                      className="mt-1 text-xs sm:text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {article.venue} · {article.year}
                    </p>
                  </div>

                  <ExternalLink
                    size={16}
                    className="flex-shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      <footer className="py-16 px-5 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © Bernardo Luz
        </p>
      </footer>
    </main>
  );
}
