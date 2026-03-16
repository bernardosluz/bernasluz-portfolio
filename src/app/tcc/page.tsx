import TCCSection from "@/features/portfolio-hero/components/TCC/tcc";

export const metadata = {
  title: "TCC | Bernardo Luz",
  description: "Trabalho de Conclusão de Curso — Engenharia de Computação (UFS)",
};

export default function TCCPage() {
  return (
    <div className="min-h-screen">
      <TCCSection />
    </div>
  );
}
