# AgentFlow

AgentFlow is an AI-driven managed digital delivery network. The MVP focuses on managed mobile marketing pages for small merchants.

## Current Repository State

This repository currently contains normalized product specs, implementation instructions, and optimized prototype images. The application code has not been generated yet.

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

## Next Milestones

1. Create the Next.js 14 + TypeScript + Tailwind application.
2. Implement mock domain models and seed data.
3. Build the user flow: home, package selection, requirement form, order progress, preview, and editable admin.
4. Build the Operator workbench and CLI/Skill demo screens.
5. Add lint, typecheck, unit tests, and smoke tests before the first release.

## Repository Governance

See `docs/REPOSITORY_GUIDE.md` for branch, version, release, and file tracking rules.

See `docs/TESTING_STRATEGY.md` for the testing plan.
