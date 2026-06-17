# Roadmap

This roadmap turns the current product package into a maintainable MVP repository.

## Phase 0: Repository Baseline

Target version: `v0.1.0`

Scope:

- Keep canonical Markdown product specs and prototype screenshots in Git.
- Ignore local archives, dependencies, build output, secrets, logs, and test artifacts.
- Define branch, commit, version, release, and testing rules.

Exit criteria:

- `README.md` explains the product direction and repository layout.
- `.gitignore`, `.gitattributes`, and `.editorconfig` exist.
- Repository guide, testing strategy, and changelog exist.
- Redundant zip, PDF, and DOCX handoff files are no longer tracked by Git.

## Phase 1: App Scaffold

Target version: `v0.2.0`

Scope:

- Create a Next.js 14 App Router app with TypeScript.
- Add Tailwind CSS, shadcn/ui setup, and lucide-react.
- Add base layout, theme tokens, navigation, and route structure.
- Add domain types and mock data.

Exit criteria:

- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- The app has empty or skeletal routes for every MVP page.

## Phase 2: Demand-Side Flow

Target version: `v0.3.0`

Scope:

- Home and product entry.
- Service package selection.
- Four-step requirement form.
- TaskSpec preview.
- Mock order creation and localStorage persistence.
- Order progress timeline.

Exit criteria:

- A user can select a package, submit merchant information, and see a mock order progress page.
- Unit or component tests cover package rendering, form validation, and TaskSpec generation.

## Phase 3: Delivery Preview And Admin

Target version: `v0.4.0`

Scope:

- Mobile marketing page preview.
- Managed delivery link display.
- Editable merchant admin fields.
- Save and republish mock behavior.

Exit criteria:

- A user can view the generated mobile landing page and edit phone, address, and business hours.
- Tests cover editable admin save behavior.

## Phase 4: Operator And CLI Demo

Target version: `v0.5.0`

Scope:

- Operator workbench.
- Task queue.
- Agent execution plan.
- QA checklist.
- Terminal log panel.
- CLI/Skill command demo.

Exit criteria:

- Operator page demonstrates claim, plan, run, check, submit, and return flows with mock data.
- CLI demo page shows the full simulated workflow.

## Phase 5: Demo-Ready MVP

Target version: `v1.0.0`

Scope:

- Responsive polish.
- Accessibility pass for primary controls.
- Playwright smoke tests.
- Vercel deployment configuration.
- Release notes and screenshots.

Exit criteria:

- Desktop and mobile happy paths pass.
- `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e` pass.
- A GitHub Release documents scope, limitations, and demo URL.
