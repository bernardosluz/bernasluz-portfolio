// ═══════════════════════════════════════════════════════════════════════════════
// INDEX.TS - "BARREL EXPORT" (EXPORTAÇÃO CENTRALIZADA)
// ═══════════════════════════════════════════════════════════════════════════════
//
// O QUE É UM BARREL EXPORT?
// É um arquivo que re-exporta componentes de vários sub-diretórios.
// Assim, quem importar não precisa saber a estrutura interna das pastas.
//
// SEM barrel:
//   import { Home } from "@/features/portfolio-hero/components/Home/Home"
//   import Sidebar from "@/features/portfolio-hero/components/Sidebar/Sidebar"
//
// COM barrel:
//   import { Home, Sidebar } from "@/features/portfolio-hero"
//
// Muito mais limpo! E se mudarmos a estrutura de pastas, só ajustamos aqui.

export { default as Sidebar } from "./components/Sidebar/Sidebar";
export { Home } from "./components/Home/Home";
export { default as BannerHero } from "./components/BannerHero/BannerHero";
export { default as AboutSection } from "./components/AboutSection/AboutSection";
export { default as ProjectsCarousel } from "./components/ProjectsCarousel/ProjectsCarousel";
