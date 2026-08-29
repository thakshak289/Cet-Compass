import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenCheck, Building2, GitCompareArrows, MessagesSquare } from "lucide-react";

import { CollegePredictor } from "@/components/predictor/CollegePredictor";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CET Compass | MHT-CET Admission Guidance" },
      {
        name: "description",
        content:
          "Predict Maharashtra engineering colleges from your MHT-CET percentile, category and branch using historical CAP cutoff data.",
      },
      { property: "og:title", content: "CET Compass — MHT-CET College Predictor" },
      {
        property: "og:description",
        content:
          "AI-powered engineering admission guidance for Maharashtra: college predictor, CAP guide and admission helper.",
      },
    ],
  }),
  component: Dashboard,
});

const shortcuts = [
  {
    to: "/chatbot",
    icon: MessagesSquare,
    title: "Admission Helper",
    text: "Ask about CAP, TFWS, documents and deadlines.",
  },
  {
    to: "/explore",
    icon: Building2,
    title: "Explore Colleges",
    text: "Browse institutes by city, branch and intake.",
  },
  {
    to: "/compare",
    icon: GitCompareArrows,
    title: "Compare Colleges",
    text: "Put shortlisted colleges side by side.",
  },
  {
    to: "/guide",
    icon: BookOpenCheck,
    title: "Admission Guide",
    text: "Step-by-step CAP process timeline.",
  },
] as const;

function Dashboard() {
  return (
    <div className="space-y-10">
      <CollegePredictor />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Continue your admission journey</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {shortcuts.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card className="h-full gap-2 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <s.icon className="size-4" />
                </div>
                <p className="mt-2 text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.text}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
