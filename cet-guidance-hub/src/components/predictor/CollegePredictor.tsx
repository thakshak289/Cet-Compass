import { useState } from "react";
import {
  AlertTriangle,
  Loader2,
  School,
  Search,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BRANCHES,
  CATEGORIES,
  CHANCE_META,
  type Chance,
  type CollegeResult,
} from "@/lib/admission-data";

import { CollegeResultCard } from "./CollegeResultCard";

const GROUPS: Chance[] = ["high", "good", "possible"];

/*
 * Response coming from Spring Boot
 *
 * Example:
 * {
 *   "collegeName": "COEP Technological University",
 *   "branch": "Computer Engineering",
 *   "seatType": "GOBCS",
 *   "minCutoff": 99.73,
 *   "meanCutoff": 99.80,
 *   "maxCutoff": 99.87,
 *   "recommendation": "HIGH CHANCE"
 * }
 */

type BackendRecommendation = {
  id?: number;
  collegeName: string;
  branch: string;
  seatType: string;
  minCutoff: number;
  meanCutoff: number;
  maxCutoff: number;
  recommendation: string;
};

export function CollegePredictor() {
  const [percentile, setPercentile] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CollegeResult[]>([]);

  const submit = async () => {
    const value = Number(percentile);

    // Validate percentile
    if (
      !percentile.trim() ||
      Number.isNaN(value) ||
      value < 0 ||
      value > 100
    ) {
      setError("Enter a valid percentile between 0 and 100.");
      setStatus("error");
      return;
    }

    // Validate category and branch
    if (!category || !branch) {
      setError("Please select both your category and preferred branch.");
      setStatus("error");
      return;
    }

    setError(null);
    setResults([]);
    setStatus("loading");

    try {
      /*
       * Send the student's information to Spring Boot.
       */
      const response = await fetch(
        "https://cet-compass.onrender.com/api/cutoffs/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            percentile: value,
            category: category,
            branch: branch,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status} ${response.statusText}`,
        );
      }

      const data: BackendRecommendation[] = await response.json();

      /*
       * Convert Spring Boot response into the format
       * expected by CollegeResultCard.
       */
      const convertedResults: CollegeResult[] = data
        .map((item, index) => {
          const recommendation =
            item.recommendation?.toUpperCase().trim() || "";

          let chance: Chance | null = null;

          if (recommendation.includes("HIGH")) {
            chance = "high";
          } else if (recommendation.includes("GOOD")) {
            chance = "good";
          } else if (recommendation.includes("POSSIBLE")) {
            chance = "possible";
          }

          /*
           * Ignore anything such as LOW CHANCE / NOT POSSIBLE.
           */
          if (!chance) {
            return null;
          }

          return {
            id: String(item.id ?? `${item.collegeName}-${index}`),
            college: item.collegeName,
            city: "Maharashtra",
            branch: item.branch,
            min: Number(item.minCutoff),
            avg: Number(item.meanCutoff),
            max: Number(item.maxCutoff),
            chance,
          };
        })
        .filter((result): result is CollegeResult => result !== null)
        /*
         * Highest cutoff first.
         */
        .sort((a, b) => b.avg - a.avg);

      setResults(convertedResults);
      setStatus("done");
    } catch (err) {
      console.error("Recommendation API error:", err);

      setError(
        "Unable to connect to the recommendation server. Make sure your Spring Boot backend is running on port 8080.",
      );

      setStatus("error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)]">
        <div className="border-b bg-accent/40 px-6 py-8 sm:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            MHT-CET 2026 · CAP Rounds
          </span>

          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
            Find engineering colleges that match your percentile
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Enter your MHT-CET percentile, category and preferred branch. We
            compare it against historical CAP closing cutoffs across
            Maharashtra to shortlist realistic options.
          </p>
        </div>

        {/* Input section */}
        <div className="grid gap-5 px-6 py-6 sm:px-8 md:grid-cols-[1fr_1fr_1.4fr_auto] md:items-end">
          {/* Percentile */}
          <div className="space-y-2">
            <Label htmlFor="percentile">MHT-CET Percentile</Label>

            <Input
              id="percentile"
              inputMode="decimal"
              placeholder="e.g. 92.45"
              value={percentile}
              onChange={(e) => setPercentile(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              aria-invalid={
                status === "error" && !!error?.includes("percentile")
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Branch */}
          <div className="space-y-2">
            <Label htmlFor="branch">Preferred Branch</Label>

            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger id="branch" className="w-full">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>

              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            size="lg"
            className="h-10 w-full md:w-auto"
            onClick={submit}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}

            {status === "loading"
              ? "Finding Colleges..."
              : "Find My Colleges"}
          </Button>
        </div>

        {/* Error */}
        {status === "error" && error && (
          <div className="mx-6 mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive sm:mx-8">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </section>

      {/* Initial state */}
      {status === "idle" && (
        <Card className="items-center gap-2 border-dashed bg-card/60 px-6 py-14 text-center shadow-none">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <School className="size-5 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium">No predictions yet</p>

          <p className="max-w-sm text-sm text-muted-foreground">
            Fill in your percentile, category and branch above, then select
            “Find My Colleges”.
          </p>
        </Card>
      )}

      {/* Loading */}
      {status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="gap-3 p-5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />

              <div className="mt-2 grid grid-cols-3 gap-2">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* No results */}
      {status === "done" && results.length === 0 && (
        <Card className="items-center gap-2 border-dashed px-6 py-14 text-center shadow-none">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="size-5 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium">
            No close matches for this combination
          </p>

          <p className="max-w-md text-sm text-muted-foreground">
            Try a different branch or category, or check institutes in later
            CAP rounds where cutoffs typically relax.
          </p>
        </Card>
      )}

      {/* Results */}
      {status === "done" &&
        GROUPS.map((group) => {
          const list = results.filter((r) => r.chance === group);

          if (list.length === 0) {
            return null;
          }

          const meta = CHANCE_META[group];

          return (
            <section key={group} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`size-2.5 rounded-full ${meta.dot}`} />

                <h2 className="text-lg font-semibold">{meta.label}</h2>

                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {list.length} colleges
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((result) => (
                  <CollegeResultCard key={result.id} result={result} />
                ))}
              </div>
            </section>
          );
        })}

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-xl border border-warning/35 bg-warning/10 px-4 py-3">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning-foreground" />

        <p className="text-xs text-muted-foreground sm:text-sm">
          <span className="font-medium text-foreground">Disclaimer:</span>{" "}
          These recommendations are generated from historical CAP cutoff data
          and are indicative only. Actual cutoffs vary each year with seat
          matrix, applicant pool and round. This is not a guarantee of
          admission.
        </p>
      </div>
    </div>
  );
}