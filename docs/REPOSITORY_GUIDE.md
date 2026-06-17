# Repository Guide

This document defines how the AgentFlow repository should be maintained as a long-lived software project.

## What Belongs In Git

Track files that are source material, source code, configuration, or lightweight product documentation:

- Application source code.
- Product specs and implementation notes under `docs/`, preferably as Markdown.
- Prototype images under `prototype_images/` when they are referenced by design or implementation work.
- Configuration files such as `.gitignore`, `.editorconfig`, `.gitattributes`, `package.json`, lockfiles, TypeScript config, lint config, and test config.
- Test files, fixtures, and small mock data needed to run the app.

## What Must Stay Out Of Git

Do not commit files that are generated, local, secret, or redundant:

- `node_modules/`, `.next/`, `dist/`, `build/`, `out/`.
- `.env`, `.env.*`, API keys, tokens, credentials, cookies, exported account data.
- Coverage and test artifacts such as `coverage/`, `test-results/`, `playwright-report/`.
- Logs and temporary files.
- Delivery archive bundles such as `.zip`, `.tar.gz`, `.rar`, `.7z`.
- Binary handoff documents such as `.docx` and `.pdf` unless they are the only canonical source.

Large product source files can be kept only when they are the canonical reference. Redundant archives and binary handoff documents should stay local or move to a release artifact, not source control.

## Branch Model

Use a simple trunk-based model until the team has enough parallel work to justify more structure:

- `main`: always releasable. Protected once GitHub branch protection is configured.
- `feature/<short-name>`: product or implementation work.
- `fix/<short-name>`: bug fixes.
- `docs/<short-name>`: documentation-only changes.
- `release/<version>`: only when stabilizing a formal release.
- `hotfix/<short-name>`: urgent fixes from a released version.

Merge through pull requests once CI exists. Keep branches short-lived and delete them after merge.

## Commit Style

Use conventional commit prefixes:

- `feat:` user-visible product capability.
- `fix:` bug fix.
- `docs:` documentation-only change.
- `test:` tests or test infrastructure.
- `refactor:` behavior-preserving code change.
- `chore:` repository maintenance.
- `ci:` CI/CD configuration.

Examples:

```text
feat(web): add service package selection page
test(web): cover requirement form validation
docs: define release process
chore: ignore local delivery archives
```

## Versioning

Use semantic versioning once the MVP app exists:

- `0.x.y`: pre-MVP and early internal releases.
- `1.0.0`: first stable MVP that can be demoed end to end.
- Patch version: bug fixes only.
- Minor version: backward-compatible product additions.
- Major version: breaking workflow or data model changes.

Tag releases as `v0.1.0`, `v0.2.0`, `v1.0.0`.

## Release Process

For each release:

1. Ensure `main` is clean and CI is passing.
2. Update `CHANGELOG.md`.
3. Build locally or through CI.
4. Create an annotated Git tag, for example `v0.1.0`.
5. Create a GitHub Release with release notes, screenshots, and known limitations.
6. Attach large delivery bundles to the GitHub Release if needed instead of committing them.

## Proposed Early Releases

- `v0.1.0`: repository governance, product docs, implementation baseline.
- `v0.2.0`: static Next.js MVP with mock data and core user pages.
- `v0.3.0`: Operator workbench, CLI/Skill demo, editable preview admin.
- `v0.4.0`: tests, polish, responsive QA, deployable Vercel build.
- `v1.0.0`: demo-ready managed delivery MVP.

## Documentation Rules

- Product decisions that affect implementation should be written in Markdown.
- Prefer Markdown for living docs because it diffs cleanly.
- Move one-off binary handoff packages to GitHub Releases or external storage.
