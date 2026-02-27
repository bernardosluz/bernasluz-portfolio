import { Home } from "../features/portfolio-hero";

export default function Page() {
  return (
    // bg e text agora vêm do globals.css via variáveis CSS
    // min-h-screen garante que a página ocupe pelo menos a tela toda
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Home />
    </div>
  );
}
