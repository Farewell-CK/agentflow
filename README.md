# AgentFlow

AgentFlow is an AI-driven managed digital delivery network. The MVP focuses on managed mobile marketing pages for small merchants.

## Current Repository State

This repository contains the AgentFlow MVP application, normalized product specs, implementation instructions, and optimized prototype images.

## Product Direction

The recommended route is the managed delivery platform model:

- Users buy standardized service packages.
- Agent workflows generate the first delivery draft.
- AgentFlow hosts the result instead of handing off unmaintainable source code.
- Certified AI Operators handle quality checks and complex fallback work.
- Platform assets accumulate as templates, components, SOPs, QA rules, hosting capability, and an Operator network.

## Repository Layout

```text
.
├── docs/                  # Product specs, PRD, implementation instructions
├── prototype_images/      # Exported prototype screenshots
├── README.md              # Repository overview and direction
├── .gitignore             # Files that must stay out of Git
├── .gitattributes         # Line ending and binary file handling
└── .editorconfig          # Basic editor formatting defaults
```

Planned application layout:

```text
apps/web/                  # Next.js App Router MVP
packages/ui/               # Shared UI components, if reuse becomes useful
packages/domain/           # Shared types and mock domain data, if needed
```

## Source Materials

- Product options: `docs/product-options.md`
- PRD and prototype notes: `docs/prd.md`
- Implementation instruction: `docs/implementation-instructions.md`
- Prototype screenshots: `prototype_images/`

## Local Development

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Demo accounts:

- `merchant@agentflow.dev` / `agentflow123`
- `operator@agentflow.dev` / `agentflow123`
- `admin@agentflow.dev` / `agentflow123`

## Next Milestones

1. Install and enable the remaining Codex skills after restarting Codex.
2. Replace the generated placeholder visual direction with final approved hero assets.
3. Migrate SQLite to PostgreSQL before production deployment.
4. Expand Playwright coverage for the full order and Operator flows.

## Repository Governance

See `docs/REPOSITORY_GUIDE.md` for branch, version, release, and file tracking rules.

See `docs/TESTING_STRATEGY.md` for the testing plan.
