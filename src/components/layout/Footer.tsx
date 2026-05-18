"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Youtube /*, Mail */ } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const socialLinks = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.links.youtube, icon: Youtube, label: "YouTube" },
  /*{ href: siteConfig.links.email, icon: Mail, label: "Email" }, */
];

export default function Footer() {
  return (
    <footer className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
      <motion.div
        className="section-container flex flex-col items-center gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Feito com Next.js, Framer Motion & Tailwind CSS
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
