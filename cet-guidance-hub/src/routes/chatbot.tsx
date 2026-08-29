import { createFileRoute } from "@tanstack/react-router";
import { Bot, Paperclip, Send, User } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { PlannedBanner } from "@/components/PlannedBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Admission Helper Chatbot — CET Compass" },
      {
        name: "description",
        content:
          "Chat interface for MHT-CET admission questions: CAP rounds, TFWS, documents and option form guidance.",
      },
      { property: "og:title", content: "Admission Helper Chatbot — CET Compass" },
      {
        property: "og:description",
        content: "Ask admission questions about CAP, TFWS, documents and deadlines.",
      },
    ],
  }),
  component: Chatbot,
});

const CHIPS = [
  "What is CAP?",
  "What documents do I need?",
  "Explain TFWS",
  "How does CAP Round 1 work?",
  "What is the option form?",
  "Difference between Home and Other University seats?",
];

function Chatbot() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Assistant"
        title="Admission Helper"
        description="Ask anything about the Maharashtra engineering admission process — CAP rounds, documents, quotas and deadlines."
      />

      <PlannedBanner>
        Interface preview. Responses will be powered by the admission knowledge base once the backend
        is connected.
      </PlannedBanner>

      <Card className="flex h-[560px] flex-col gap-0 overflow-hidden p-0">
        <div className="flex items-center gap-3 border-b px-5 py-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">CET Compass Assistant</p>
            <p className="text-xs text-muted-foreground">Offline preview</p>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-4" />
            </div>
            <div className="max-w-lg rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
              Hi! I can explain the CAP process, eligibility, documents and seat types. Pick a
              suggestion below to get started.
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <div className="max-w-lg rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground">
              What is CAP?
            </div>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <User className="size-4" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-4" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-4">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t bg-card px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Attach file" disabled>
              <Paperclip className="size-4" />
            </Button>
            <Input placeholder="Ask about CAP rounds, documents, TFWS…" disabled />
            <Button size="icon" aria-label="Send message" disabled>
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
