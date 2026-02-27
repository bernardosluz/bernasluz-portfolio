import BannerHero from "../BannerHero/BannerHero";
import AboutSection from "../AboutSection/AboutSection";
import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";

export function Home() {
  return (
    <>
      <BannerHero />
      <AboutSection />

      {/* Separador — agora usa variável do tema */}
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="h-px"
          style={{
            background: `linear-gradient(to right, transparent, var(--separator), transparent)`,
          }}
        />
      </div>

      <ProjectsCarousel />

      <footer className="py-12 px-6 text-center">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © 2025 Bernardo Luz — Feito com Next.js e Framer Motion
        </p>
      </footer>
    </>
  );
}
