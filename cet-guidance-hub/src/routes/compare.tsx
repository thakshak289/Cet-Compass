import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { PlannedBanner } from "@/components/PlannedBanner";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Colleges — CET Compass" },
      {
        name: "description",
        content:
          "Compare Maharashtra engineering colleges side by side on cutoffs, fees, intake and placements before filling the option form.",
      },
      { property: "og:title", content: "Compare Engineering Colleges — CET Compass" },
      {
        property: "og:description",
        content: "Side-by-side comparison of cutoffs, fees, intake and placement indicators.",
      },
    ],
  }),
  component: Compare,
});

const COLUMNS = [
  { name: "COEP Technological University", city: "Pune" },
  { name: "Veermata Jijabai Technological Institute", city: "Mumbai" },
];

const ROWS = [
  { label: "Institute type", values: ["Government", "Autonomous"] },
  { label: "CS closing percentile (OPEN)", values: ["99.42", "99.28"] },
  { label: "Annual fees", values: ["₹ 86,000", "₹ 92,000"] },
  { label: "Total intake", values: ["780", "720"] },
  { label: "Median placement", values: ["₹ 11.5 LPA", "₹ 10.8 LPA"] },
  { label: "Hostel", values: ["Available", "Available"] },
];

function Compare() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Decision support"
        title="Compare Colleges"
        description="Put shortlisted institutes side by side on cutoffs, fees, intake and placements."
      />

      <PlannedBanner>
        Illustrative comparison. Selection, live metrics and export will be added with backend
        integration.
      </PlannedBanner>

      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((c) => (
          <Card key={c.name} className="gap-1 p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.city}</p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${c.name}`}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
          </Card>
        ))}
        <Card className="items-center justify-center gap-2 border-dashed p-5 text-center shadow-none">
          <div className="flex size-9 items-center justify-center rounded-full bg-muted">
            <Plus className="size-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Add a college</p>
          <p className="text-xs text-muted-foreground">Compare up to three institutes</p>
        </Card>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">Parameter</th>
                {COLUMNS.map((c) => (
                  <th key={c.name} className="px-5 py-3 font-medium">
                    {c.city}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="px-5 py-3 text-muted-foreground">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-5 py-3 font-medium tabular-nums">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
