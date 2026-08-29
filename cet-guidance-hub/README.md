# Admission Compass

Build a polished, modern frontend UI for my college admission project. This is an AI-powered engineering admission guidance system for Maharashtra/MHT-CET. Focus on a professional student-friendly dashboard, not a generic chatbot clone.

Core layout: a fixed left navigation sidebar with project branding and these navigation items: Dashboard, College Predictor, Admission Helper Chatbot, Explore Colleges, Compare Colleges, Admission Guide. Add a small profile/settings area at the bottom. Main content should default to the College Predictor/dashboard view.

College Predictor UI: prominent hero/header, percentile input (0-100), simple student-friendly category dropdown (Open / General, OBC, SC, ST, VJ / DT, NT-B, NT-C, NT-D, EWS), preferred branch dropdown (Computer Engineering, Information Technology, Electronics and Telecommunication Engineering, Mechanical Engineering, Electrical Engineering, Civil Engineering), and a strong 'Find My Colleges' CTA. Show an attractive results area with cards grouped as High Chance, Good Chance, Possible. Each card should show college name, branch, historical minimum/average/maximum cutoff, and a clear recommendation badge. Include a clear disclaimer that recommendations are based on historical cutoff data and are not a guarantee of admission.

Admission Helper Chatbot page: design the UI now as a polished chat screen with suggested question chips such as 'What is CAP?', 'What documents do I need?', 'Explain TFWS', 'How does CAP Round 1 work?', but do not invent backend functionality yet. It can be a visual placeholder for future integration.

Explore Colleges and Compare Colleges pages can be polished placeholder views with realistic cards/layouts for future backend integration. Admission Guide should have a clean timeline-style UI with stages like Registration, Document Verification, Option Form, CAP Allotment, Seat Acceptance, and Admission Confirmation, clearly marked as a planned content area unless data is supplied.

Visual direction: clean academic/ed-tech product, premium but simple, responsive, lots of whitespace, subtle shadows, rounded cards, restrained blue/indigo accent, good typography, accessible contrast, polished empty/loading/error states, and mobile-responsive sidebar behavior. Avoid excessive gradients, flashy animations, or stock imagery. Make navigation visually clear and make the predictor the main focus.

Use TypeScript + Tailwind + shadcn/ui. Keep the code modular with reusable components. Do not connect to a database or external AI service yet; this prompt is for the UI and front-end structure only. The existing Spring Boot backend will be connected later from our local project.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e9e896f-8be0-4d60-b964-64958b1a8f73).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
