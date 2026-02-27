import { Home } from "../features/portfolio-hero";

export default function Page() {
  return (
    // O body já tem background via globals.css → não precisa repetir aqui
    <div className="min-h-screen">
      <Home />
    </div>
  );
}
