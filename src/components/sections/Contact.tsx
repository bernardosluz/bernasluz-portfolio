"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          >
            
          <motion.div variants={fadeInUp} className="section-label">
            <span>Contato</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Vamos trabalhar juntos?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Estou sempre aberto a novas oportunidades e projetos interessantes.
            Se você tem uma ideia ou quer conversar, entre em contato.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
            {/* Seu comentário aqui 
            <a href={siteConfig.links.email} className="btn-primary">
              <Mail size={16} />
              Enviar email
            </a>
            */}
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 glow-line mx-auto max-w-xs"
          />
        </motion.div>
      </div>
    </section>
  );
}
