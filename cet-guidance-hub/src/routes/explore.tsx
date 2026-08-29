import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Search, Users } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { PlannedBanner } from "@/components/PlannedBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Colleges — CET Compass" },
      {
        name: "description",
        content:
          "Browse Maharashtra engineering colleges by city, branch, intake and institute type ahead of the CAP option form.",
      },
      { property: "og:title", content: "Explore Maharashtra Engineering Colleges" },
      {
        property: "og:description",
        content: "Search institutes by city, branch and intake to build your option list.",
      },
    ],
  }),
  component: Explore,
});

const COLLEGES = [
  { name: "COEP Technological University", city: "Pune", type: "Government", intake: 780 },
  { name: "Veermata Jijabai Technological Institute", city: "Mumbai", type: "Autonomous", intake: 720 },
  { name: "Pune Institute of Computer Technology", city: "Pune", type: "Private Aided", intake: 660 },
  { name: "Walchand College of Engineering", city: "Sangli", type: "Government Aided", intake: 540 },
  { name: "Sardar Patel Institute of Technology", city: "Mumbai", type: "Autonomous", intake: 480 },
  { name: "Shri Ramdeobaba College of Engineering", city: "Nagpur", type: "Autonomous", intake: 900 },
  { name: "Government College of Engineering", city: "Amravati", type: "Government", intake: 600 },
  { name: "Pimpri Chinchwad College of Engineering", city: "Pune", type: "Private", intake: 1020 },
  { name: "SGGS Institute of Engineering & Technology", city: "Nanded", type: "Government", intake: 570 },
];

const FILTERS = ["All", "Pune", "Mumbai", "Nagpur", "Government", "Autonomous", "Private"];

function Explore() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Directory"
        title="Explore Colleges"
        description="Browse Maharashtra engineering institutes by city, type and intake to shape your CAP option list."
      />

      <PlannedBanner>
        Sample layout with placeholder institutes. Live college data, filters and detail pages will be
        wired to the backend.
      </PlannedBanner>

      <Card className="gap-4 p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by college, city or branch…" disabled />
          </div>
          <Button variant="secondary" disabled>
            Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              type="button"
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                i === 0
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COLLEGES.map((c) => (
          <Card
            key={`${c.name}-${c.city}`}
            className="gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Building2 className="size-4" />
            </div>
            <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" /> {c.city}
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3" /> {c.intake} seats
              </span>
            </div>
            <span className="w-fit rounded-full border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              {c.type}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
