import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { PlannedBanner } from "@/components/PlannedBanner";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Admission Guide — CET Compass" },
      {
        name: "description",
        content:
          "Step-by-step Maharashtra CAP admission timeline: registration, document verification, option form, allotment, seat acceptance and confirmation.",
      },
      { property: "og:title", content: "MHT-CET CAP Admission Guide" },
      {
        property: "og:description",
        content: "Understand every stage of the Maharashtra engineering CAP process.",
      },
    ],
  }),
  component: Guide,
});

const STAGES = [
  {
    title: "Registration",
    status: "Completed",
    text: "Create your CET Cell account, fill personal and academic details, and pay the application fee.",
  },
  {
    title: "Document Verification",
    status: "Current",
    text: "Upload and verify marksheets, domicile, caste and income certificates at a facilitation centre or online.",
  },
  {
    title: "Option Form",
    status: "Upcoming",
    text: "Fill and lock your preference list of college and branch choices for the round.",
  },
  {
    title: "CAP Allotment",
    status: "Upcoming",
    text: "Seats are allotted based on merit, category, seat type and your locked preferences.",
  },
  {
    title: "Seat Acceptance",
    status: "Upcoming",
    text: "Accept the allotted seat, pay the acceptance fee and choose whether to stay in later rounds.",
  },
  {
    title: "Admission Confirmation",
    status: "Upcoming",
    text: "Report to the institute with original documents and complete the final admission formalities.",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Completed: "border-success/25 bg-success/12 text-success",
  Current: "border-primary/25 bg-primary/10 text-primary",
  Upcoming: "border-border bg-muted text-muted-foreground",
};

function Guide() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Process"
        title="Admission Guide"
        description="The Maharashtra engineering CAP process, stage by stage, from registration to final confirmation."
      />

      <PlannedBanner>
        Planned content area. Stage descriptions, official dates and checklists will be published once
        the CET Cell schedule is supplied.
      </PlannedBanner>

      <Card className="p-6 sm:p-8">
        <ol className="relative space-y-8 border-l pl-8">
          {STAGES.map((stage, i) => (
            <li key={stage.title} className="relative">
              <span
                className={`absolute -left-[41px] flex size-6 items-center justify-center rounded-full border-2 border-background text-[11px] font-semibold ${
                  stage.status === "Completed"
                    ? "bg-success text-success-foreground"
                    : stage.status === "Current"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {stage.status === "Completed" ? <Check className="size-3.5" /> : i + 1}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[stage.status]}`}
                >
                  {stage.status}
                </span>
              </div>
              <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{stage.text}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
