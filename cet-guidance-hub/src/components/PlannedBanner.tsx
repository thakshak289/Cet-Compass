import { Info } from "lucide-react";

export function PlannedBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-info/25 bg-info/8 px-4 py-3 text-sm text-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-info" />
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}
