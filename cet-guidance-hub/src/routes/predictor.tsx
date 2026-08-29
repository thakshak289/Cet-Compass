import { createFileRoute } from "@tanstack/react-router";

import { CollegePredictor } from "@/components/predictor/CollegePredictor";

export const Route = createFileRoute("/predictor")({
  head: () => ({
    meta: [
      { title: "College Predictor — CET Compass" },
      {
        name: "description",
        content:
          "Enter your MHT-CET percentile, category and preferred branch to shortlist Maharashtra engineering colleges by chance of admission.",
      },
      { property: "og:title", content: "MHT-CET College Predictor — CET Compass" },
      {
        property: "og:description",
        content: "Shortlist colleges grouped as High Chance, Good Chance and Possible.",
      },
    ],
  }),
  component: () => <CollegePredictor />,
});
