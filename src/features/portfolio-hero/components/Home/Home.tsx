// ═══════════════════════════════════════════════════════════════════════════════
// HOME — Composição da página principal
// ═══════════════════════════════════════════════════════════════════════════════
//
// ESPAÇAMENTO ENTRE SEÇÕES:
// A separação visual vem do padding generoso de cada seção, não de linhas.
// - BannerHero: pb-24/32 (espaço embaixo)
// - AboutSection: py-24/36 (espaço em cima e embaixo)
// - ProjectsCarousel: py-24/36 (espaço em cima e embaixo)
// O espaço vazio entre módulos é suficiente para o olho perceber a separação.

import BannerHero from "../BannerHero/BannerHero";
import AboutSection from "../AboutSection/AboutSection";
import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";

export function Home() {
  return (
    <main className="relative">
      <BannerHero />
      <AboutSection />
      <ProjectsCarousel />

      <footer className="py-16 px-5 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2025 Bernardo Luz — Next.js + Framer Motion
        </p>
      </footer>
    </main>
  );
}
