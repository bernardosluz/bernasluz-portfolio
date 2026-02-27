// ═══════════════════════════════════════════════════════════════════════════════
// BARREL EXPORT — Re-exporta todos os componentes da feature
// ═══════════════════════════════════════════════════════════════════════════════
// Importação limpa: import { Home } from "@/features/portfolio-hero"
// Em vez de:        import { Home } from "@/features/portfolio-hero/components/Home/Home"

export { default as Sidebar } from "./components/Sidebar/Sidebar";
export { Home } from "./components/Home/Home";
export { default as BannerHero } from "./components/BannerHero/BannerHero";
export { default as AboutSection } from "./components/AboutSection/AboutSection";
export { default as ProjectsCarousel } from "./components/ProjectsCarousel/ProjectsCarousel";
