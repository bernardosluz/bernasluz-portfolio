// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS CAROUSEL — Setas + autoplay + loop infinito
// ═══════════════════════════════════════════════════════════════════════════════
//
// ABORDAGEM SIMPLIFICADA:
// Em vez de drag + spring + MotionValue (que criou conflitos),
// agora usa CSS transition no translateX — muito mais previsível.
//
// NAVEGAÇÃO:
// - Setas esquerda/direita clicáveis
// - Autoplay a cada 5 segundos
// - Pausa ao clicar em qualquer coisa, retoma após 12s
//
// LOOP INFINITO (mesmo truque dos clones):
// Projetos reais:  [A, B, C]
// Array renderizado: [C'] [A] [B] [C] [A']
// Posição:            0    1   2   3   4
//
// Quando a transição CSS termina num clone (0 ou 4):
// 1. Desliga transition (transition: none)
// 2. Pula instantaneamente pro equivalente real
// 3. Liga transition de volta no próximo frame
// O usuário não percebe porque clone e real são visuais idênticos.

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/config";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
// ChevronLeft/Right → setas de navegação do carrossel

const AUTOPLAY_MS = 5000;
const RESUME_MS = 12000;
const GAP = 16;

// Duração da transição CSS em milissegundos
// 700ms com ease-out = deslize suave que desacelera naturalmente
const TRANSITION_MS = 700;

export default function ProjectsCarousel() {
  const projects = siteConfig.projects;
  const total = projects.length;

  // Array com clones: [último_clone, ...reais, primeiro_clone]
  const slides = [projects[total - 1], ...projects, projects[0]];

  // pos = posição no array estendido (0 a total+1)
  // Começa em 1 = primeiro projeto real
  const [pos, setPos] = useState(1);

  // Flag para desligar CSS transition durante o "teletransporte"
  const [animate, setAnimate] = useState(true);

  // Largura de um card (medida em runtime)
  const [cardWidth, setCardWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  // Timers
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flag pra evitar cliques durante transição
  const isMoving = useRef(false);

  // ═══ MEDIR LARGURA DO CARD ═══
  // Roda no mount e em resize
  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setCardWidth(measureRef.current.offsetWidth);
      }
    };
    // requestAnimationFrame garante que o browser já calculou o layout
    requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ═══ STEP ═══
  // Distância que o track se move a cada slide (largura do card + gap)
  const step = cardWidth + GAP;

  // ═══ POSIÇÃO X DO TRACK ═══
  // Simplesmente calcula: pos × step, negativo porque move pra esquerda
  const translateX = step ? -(pos * step) : 0;

  // ═══ ÍNDICE REAL (para os dots) ═══
  const activeReal = pos === 0 ? total - 1 : pos === total + 1 ? 0 : pos - 1;

  // ═══ TRANSIÇÃO CSS TERMINOU ═══
  // Chamado pelo onTransitionEnd do track.
  // Se parou num clone, faz o teletransporte instantâneo.
  const handleTransitionEnd = useCallback(() => {
    if (pos === total + 1) {
      // Clone do primeiro → pula pro primeiro real
      setAnimate(false); // Desliga transition
      setPos(1); // Move pra posição 1
      // requestAnimationFrame → espera o browser pintar SEM transition
      // Segundo rAF → liga transition de volta (precisa de 2 frames
      // porque o browser pode agrupar mudanças no mesmo frame)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          isMoving.current = false;
        });
      });
    } else if (pos === 0) {
      // Clone do último → pula pro último real
      setAnimate(false);
      setPos(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          isMoving.current = false;
        });
      });
    } else {
      isMoving.current = false;
    }
  }, [pos, total]);

  // ═══ NAVEGAÇÃO ═══
  const goNext = useCallback(() => {
    if (isMoving.current || !step) return;
    isMoving.current = true;
    setPos((prev) => prev + 1);
  }, [step]);

  const goPrev = useCallback(() => {
    if (isMoving.current || !step) return;
    isMoving.current = true;
    setPos((prev) => prev - 1);
  }, [step]);

  const goToReal = useCallback(
    (realIndex: number) => {
      if (isMoving.current || !step) return;
      isMoving.current = true;
      setPos(realIndex + 1);
    },
    [step],
  );

  // ═══ AUTOPLAY ═══
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(goNext, AUTOPLAY_MS);
  }, [goNext]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    // Retoma após 12s sem interação
    pauseTimerRef.current = setTimeout(startAutoplay, RESUME_MS);
  }, [startAutoplay]);

  // Inicia quando o card foi medido
  useEffect(() => {
    if (!cardWidth) return;
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [cardWidth, startAutoplay]);

  // Handlers das setas — pausa autoplay ao clicar
  const handleNext = () => {
    pauseAutoplay();
    goNext();
  };
  const handlePrev = () => {
    pauseAutoplay();
    goPrev();
  };
  const handleDotClick = (index: number) => {
    pauseAutoplay();
    goToReal(index);
  };

  return (
    <section className="py-24 md:py-36 overflow-hidden">
      {/* ─── Cabeçalho ─── */}
      <div className="px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="section-label">
            <span>Trabalhos</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Meus Projetos
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg sm:text-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Alguns dos projetos que venho desenvolvendo.
          </motion.p>
        </motion.div>
      </div>

      {/* ─── CARROSSEL ─── */}
      <div className="relative mt-12">
        {/* Container com overflow escondido */}
        <div className="overflow-hidden">
          {/* TRACK — a faixa que se move com translateX */}
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              paddingLeft: "20px",
              paddingRight: "20px",
              // translateX posiciona o track. Quando pos muda, o CSS transition anima.
              transform: `translateX(${translateX}px)`,
              // transition liga/desliga conforme a flag `animate`
              // cubic-bezier(0.25, 1, 0.5, 1) = ease-out suave (desacelera devagar)
              transition: animate
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((project, i) => (
              <div
                key={`slide-${i}`}
                ref={i === 1 ? measureRef : undefined}
                className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[380px]"
                // Larguras maiores: 85vw mobile, 340px tablet, 380px desktop
              >
                <div className="card h-full flex flex-col">
                  {/* Imagem / Placeholder */}
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Screenshot - ${project.title}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, var(--accent-muted), var(--bg-card))`,
                        }}
                      />
                      // Removido o span com a inicial do título
                      // Era o "N" que aparecia no screenshot — não acrescentava nada
                    )}
                    {/* Linha decorativa no topo */}
                    <div
                      className="absolute top-0 inset-x-0 h-px opacity-40"
                      style={{
                        background: `linear-gradient(to right, transparent, var(--accent), transparent)`,
                      }}
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mt-3 text-base leading-relaxed line-clamp-3 flex-1"
                      // text-base (16px) em vez de text-sm (14px) — muito mais legível
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((tech, techIdx) => (
                        <span key={`${tech}-${techIdx}`} className="badge-tech">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm w-fit"
                      >
                        <ExternalLink size={14} />
                        Ver projeto
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SETAS DE NAVEGAÇÃO ─── */}
        {/* Posicionadas nos lados do carrossel */}
        {/* Hidden no mobile pequeno (setas ficam apertadas), visíveis a partir de sm */}
        <button
          onClick={handlePrev}
          className="btn-icon absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex"
          aria-label="Projeto anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="btn-icon absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex"
          aria-label="Próximo projeto"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ─── Dots + setas mobile ─── */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Setas visíveis só no mobile (sm:hidden) — embaixo do carrossel */}
        <button
          onClick={handlePrev}
          className="btn-icon sm:hidden"
          aria-label="Projeto anterior"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              /* Cores passadas para o className via valores arbitrários do Tailwind para evitar bugs no mobile */
              className={`block flex-shrink-0 h-2 rounded-full transition-all duration-500 appearance-none border-none outline-none p-0 m-0 ${
                activeReal === index
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--text-muted)]"
              }`}
              style={{
                width: activeReal === index ? "28px" : "8px",
                minWidth: activeReal === index ? "28px" : "8px",
              }}
              aria-label={`Ir para projeto ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn-icon sm:hidden"
          aria-label="Próximo projeto"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
