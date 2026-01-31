'use client'

import { motion } from 'framer-motion';
import { Github, Linkedin, Terminal, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      {/* Glow Effects (Efeito Neon) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto w-full"
      >
        <header className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
            {siteConfig.name}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-light text-slate-400">
            {siteConfig.role} <span className="text-slate-700">|</span> {siteConfig.university}
          </h2>
        </header>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-lg text-slate-400 max-w-xl leading-relaxed"
        >
          {siteConfig.bio}
        </motion.p>

        <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
          <MapPin size={14} />
          <span>{siteConfig.location}</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-5 items-center"
        >
          <a href={siteConfig.links.email} className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20">
            Entrar em contato
          </a>
          
          <div className="flex items-center gap-4">
            <a href={siteConfig.links.github} target="_blank" className="text-slate-400 hover:text-white transition-colors">
              <Github size={26} />
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={26} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};