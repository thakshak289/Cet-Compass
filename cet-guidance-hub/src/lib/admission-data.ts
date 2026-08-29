export const CATEGORIES = [
  { value: "OPEN", label: "Open / General" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "VJDT", label: "VJ / DT" },
  { value: "NTB", label: "NT-B" },
  { value: "NTC", label: "NT-C" },
  { value: "NTD", label: "NT-D" },
  { value: "EWS", label: "EWS" },
] as const;

export const BRANCHES = [
  "Computer Engineering",
  "Information Technology",
  "Electronics and Telecommunication Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
] as const;

export type Chance = "high" | "good" | "possible";

export type CollegeResult = {
  id: string;
  college: string;
  city: string;
  branch: string;
  min: number;
  avg: number;
  max: number;
  chance: Chance;
};

type Seed = { id: string; college: string; city: string; base: number };

const SEEDS: Seed[] = [
  { id: "coep", college: "COEP Technological University", city: "Pune", base: 99.2 },
  { id: "vjti", college: "Veermata Jijabai Technological Institute", city: "Mumbai", base: 99.0 },
  { id: "ictm", college: "Institute of Chemical Technology", city: "Mumbai", base: 98.4 },
  { id: "sppu-pict", college: "Pune Institute of Computer Technology", city: "Pune", base: 98.1 },
  { id: "vit-pune", college: "Vishwakarma Institute of Technology", city: "Pune", base: 96.5 },
  { id: "spit", college: "Sardar Patel Institute of Technology", city: "Mumbai", base: 97.6 },
  { id: "kjsce", college: "K. J. Somaiya College of Engineering", city: "Mumbai", base: 96.0 },
  { id: "dypcoe", college: "D. Y. Patil College of Engineering", city: "Pune", base: 92.0 },
  { id: "wce", college: "Walchand College of Engineering", city: "Sangli", base: 93.5 },
  { id: "sggs", college: "SGGS Institute of Engineering & Technology", city: "Nanded", base: 91.4 },
  { id: "gcoe-amravati", college: "Government College of Engineering", city: "Amravati", base: 89.2 },
  { id: "gcoe-nagpur", college: "Government College of Engineering", city: "Nagpur", base: 88.0 },
  { id: "rait", college: "Ramrao Adik Institute of Technology", city: "Navi Mumbai", base: 87.5 },
  { id: "mit-aoe", college: "MIT Academy of Engineering", city: "Pune", base: 85.6 },
  { id: "pccoe", college: "Pimpri Chinchwad College of Engineering", city: "Pune", base: 89.8 },
  { id: "sinhgad", college: "Sinhgad College of Engineering", city: "Pune", base: 83.4 },
  { id: "dbatu", college: "Dr. Babasaheb Ambedkar Technological University", city: "Lonere", base: 80.2 },
  { id: "gcoe-karad", college: "Government College of Engineering", city: "Karad", base: 86.9 },
  { id: "rcoem", college: "Shri Ramdeobaba College of Engineering", city: "Nagpur", base: 88.6 },
  { id: "fcrit", college: "Fr. C. Rodrigues Institute of Technology", city: "Vashi", base: 84.1 },
];

const BRANCH_OFFSET: Record<string, number> = {
  "Computer Engineering": 0,
  "Information Technology": -1.1,
  "Electronics and Telecommunication Engineering": -3.4,
  "Electrical Engineering": -6.2,
  "Mechanical Engineering": -7.8,
  "Civil Engineering": -11.5,
};

const CATEGORY_OFFSET: Record<string, number> = {
  OPEN: 0,
  EWS: -1.5,
  OBC: -3.5,
  VJDT: -6.5,
  NTB: -7.2,
  NTC: -7.8,
  NTD: -8.4,
  SC: -12.5,
  ST: -18.0,
};

const clamp = (n: number) => Math.max(20, Math.min(99.99, Number(n.toFixed(2))));

export function predictColleges(
  percentile: number,
  category: string,
  branch: string,
): CollegeResult[] {
  const offset = (BRANCH_OFFSET[branch] ?? 0) + (CATEGORY_OFFSET[category] ?? 0);

  return SEEDS.map((seed) => {
    const avg = clamp(seed.base + offset);
    const min = clamp(avg - 2.6);
    const max = clamp(avg + 1.4);
    const margin = percentile - min;

    let chance: Chance | null = null;
    if (margin > 9) chance = null;
    else if (margin >= 2) chance = "high";
    else if (margin >= -0.5) chance = "good";
    else if (margin >= -3.5) chance = "possible";

    return chance
      ? { id: `${seed.id}-${branch}`, college: seed.college, city: seed.city, branch, min, avg, max, chance }
      : null;
  })
    .filter((r): r is CollegeResult => r !== null)
    .sort((a, b) => b.avg - a.avg);
}

export const CHANCE_META: Record<
  Chance,
  { label: string; blurb: string; badge: string; dot: string }
> = {
  high: {
    label: "High Chance",
    blurb: "Your percentile is comfortably above recent closing cutoffs.",
    badge: "bg-success/12 text-success border-success/25",
    dot: "bg-success",
  },
  good: {
    label: "Good Chance",
    blurb: "You are near the closing cutoff — a realistic option-form pick.",
    badge: "bg-info/12 text-info border-info/25",
    dot: "bg-info",
  },
  possible: {
    label: "Possible",
    blurb: "Slightly below cutoffs; may open up in later CAP rounds.",
    badge: "bg-warning/15 text-warning-foreground border-warning/35",
    dot: "bg-warning",
  },
};
