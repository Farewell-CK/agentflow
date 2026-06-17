# Testing Strategy

The current repository contains product material only. Tests should be added as soon as the Next.js MVP is created.

## Test Layers

Use a small but reliable testing pyramid:

- Unit tests: domain helpers, pricing rules, order status logic, form validation, mock data transforms.
- Component tests: service package cards, requirement form steps, timeline, editable admin fields.
- Integration tests: submit requirement form, create mock order, update localStorage state, render progress and preview.
- End-to-end smoke tests: primary happy path on desktop and mobile viewport.

## Recommended Tooling

For the planned Next.js stack:

- Vitest for unit tests.
- React Testing Library for component behavior.
- Playwright for browser smoke tests and responsive checks.
- ESLint and TypeScript for static checks.

## Required Checks Before Release

Each release candidate should pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

After Playwright is configured:

```bash
npm run test:e2e
```

## Initial Test Targets

The first application milestone should include tests for:

- Service package price, boundary, and included-feature rendering.
- Requirement form validation for merchant name, phone, address, and selected package.
- TaskSpec generation from form data.
- Order progress status mapping.
- Editable admin save behavior using mock/localStorage state.

## Coverage Expectations

Do not chase arbitrary coverage numbers before the MVP shape is stable. The first useful target is:

- Critical domain helpers: high coverage.
- Form and order flows: at least happy path plus one validation failure.
- Visual pages: smoke coverage through Playwright screenshots or route assertions.

Coverage can become a CI threshold after the main app flow stabilizes.
