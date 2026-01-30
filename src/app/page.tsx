import { Hero } from '../features/portfolio-hero';

export default function Home() {
  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Aqui poderás adicionar uma Navbar futuramente */}
      <Hero />
      {/* As outras secções virão aqui depois */}
    </main>
  );
}