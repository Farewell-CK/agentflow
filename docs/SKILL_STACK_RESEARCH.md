# Skill Stack Research

This document records useful Codex skills for building AgentFlow as a polished, technology-forward product.

Research date: 2026-06-17

## Sources Checked

- Official OpenAI curated skills: `https://github.com/openai/skills/tree/main/skills/.curated`
- Official OpenAI system skills: `https://github.com/openai/skills/tree/main/skills/.system`
- Local installed Lark skills under `/home/duchaoke/.agents/skills`

The official experimental skills path was checked but was not available at the time of research.

## Already Available In This Environment

System skills:

- `imagegen`: generate or edit raster images.
- `openai-docs`: use current OpenAI documentation.
- `plugin-creator`: create Codex plugins.
- `skill-creator`: create new Codex skills.
- `skill-installer`: list and install curated or GitHub-hosted skills.

Lark skills:

- `lark-doc`, `lark-sheets`, `lark-base`, `lark-slides`, `lark-whiteboard`, `lark-wiki`, `lark-drive`
- `lark-calendar`, `lark-task`, `lark-im`, `lark-mail`, `lark-contact`
- `lark-minutes`, `lark-vc`, `lark-workflow-meeting-summary`, `lark-workflow-standup-report`

These are useful if AgentFlow planning, design reviews, meeting notes, or product specs move through Lark/Feishu.

## Recommended Install Set

Install these first because they directly support the MVP workflow.

| Area | Skill | Why it matters for AgentFlow |
| --- | --- | --- |
| UI/UX implementation | `playwright` | Browser automation, screenshots, form flows, responsive smoke tests. |
| UI/UX debugging | `playwright-interactive` | Faster iterative visual debugging of the local app. |
| Design handoff | `figma` | Read Figma context, screenshots, variables, and assets if we move prototypes to Figma. |
| Design-to-code | `figma-implement-design` | Translate Figma pages/components into production UI with visual fidelity. |
| Design system | `figma-create-design-system-rules` | Turn project UI conventions into explicit Figma-to-code rules. |
| Deployment | `vercel-deploy` | The implementation instruction already targets Vercel. |
| Security | `security-best-practices` | Secure-by-default review for TypeScript/Next.js code. |
| Security | `security-threat-model` | Threat model once auth, orders, hosted links, or user uploads appear. |
| Algorithm/prototyping | `jupyter-notebook` | Useful for algorithm experiments, scoring rules, QA heuristics, or template evaluation. |
| API/AI docs | `openai-docs` | Already available; use for current OpenAI API/model guidance. |

## Install Later When Needed

| Area | Skill | Trigger |
| --- | --- | --- |
| Figma library | `figma-generate-library` | When AgentFlow needs a formal design system in Figma. |
| Figma screens | `figma-generate-design` | When we want Codex to write screens into Figma from code or descriptions. |
| Figma component mapping | `figma-code-connect-components` | When code components and Figma components need formal mapping. |
| Figma write operations | `figma-use` | Required before writing or programmatically inspecting Figma files. |
| CI repair | `gh-fix-ci` | When GitHub Actions checks fail and need investigation. |
| PR review handling | `gh-address-comments` | When review comments need systematic cleanup. |
| Observability | `sentry` | After the app has production error tracking. |
| Alternate deploy | `cloudflare-deploy`, `netlify-deploy`, `render-deploy` | Only if we choose a platform other than Vercel. |
| Project management | `linear` | Only if the project uses Linear. |
| Notion workflow | `notion-spec-to-implementation`, `notion-research-documentation` | Only if specs and tasks move to Notion. |
| CLI productization | `cli-creator` | If AgentFlow later needs a real Operator CLI, not only a UI demo. |
| PDF workflows | `pdf` | If we need to generate customer-facing PDF reports or review PDF layouts. |

## Not Recommended For This Project Right Now

- `aspnet-core`: not aligned with the planned Next.js stack.
- `winui-app`: desktop Windows app scope, not needed for this web MVP.
- `hatch-pet`: not relevant to AgentFlow product delivery.
- `speech` and `transcribe`: defer until voice/video workflows become part of the product.

## Proposed Project-Specific Skills To Create Later

The generic skill catalog is useful, but AgentFlow will benefit from custom project skills once the codebase takes shape.

1. `agentflow-product`: read PRD/roadmap, enforce product positioning, and prevent drifting into a low-price marketplace.
2. `agentflow-ui`: enforce the visual language, responsive rules, component density, and "managed delivery network" feel.
3. `agentflow-operator-workflow`: model Operator task queues, QA checklists, CLI demo flows, and handoff rules.
4. `agentflow-testing`: run the project's lint, typecheck, unit, build, and Playwright checks in the right order.
5. `agentflow-release`: prepare changelog entries, version tags, release notes, and demo evidence.

Use `skill-creator` when these become stable enough to codify.

## Recommended Next Action

Install the first wave:

```bash
python /home/duchaoke/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo openai/skills \
  --path skills/.curated/playwright \
  --path skills/.curated/playwright-interactive \
  --path skills/.curated/figma \
  --path skills/.curated/figma-implement-design \
  --path skills/.curated/figma-create-design-system-rules \
  --path skills/.curated/vercel-deploy \
  --path skills/.curated/security-best-practices \
  --path skills/.curated/security-threat-model \
  --path skills/.curated/jupyter-notebook
```

Restart Codex after installing new skills so they are available in future turns.
