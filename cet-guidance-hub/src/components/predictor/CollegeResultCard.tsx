import { MapPin } from "lucide-react";

import { CHANCE_META, type CollegeResult } from "@/lib/admission-data";
import { Card } from "@/components/ui/card";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2 text-center">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold tabular-nums">{value.toFixed(2)}</p>
    </div>
  );
}

export function CollegeResultCard({ result }: { result: CollegeResult }) {
  const meta = CHANCE_META[result.chance];

  return (
    <Card className="gap-0 rounded-xl border-border/80 p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug">{result.college}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {result.city}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.badge}`}
        >
          {meta.label}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs font-medium text-accent-foreground">{result.branch}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Min" value={result.min} />
        <Stat label="Avg" value={result.avg} />
        <Stat label="Max" value={result.max} />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{meta.blurb}</p>
    </Card>
  );
}
