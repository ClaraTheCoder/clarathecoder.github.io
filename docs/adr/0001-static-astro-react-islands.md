# 1. Static Astro site with React islands

- Status: Accepted
- Date: 2026-10-27

## Context

The site is a personal blog and portfolio. It must be cheap to host, fast to load, and readable by anyone — including with JavaScript disabled or still loading. At the same time it needs room for richer interactive features over time: a live theme switcher, interactive code demos, and similar showpieces.

Hosting is GitHub Pages, which serves static files only and runs no server-side code.

## Decision

Build the site with Astro, output fully static HTML, and hydrate only the few genuinely interactive pieces as React "islands" (`client:only`/`client:*`). Everything else — layout, prose, navigation, styling — is rendered to HTML at build time and ships with no JavaScript.

React is the island runtime so the interactive components and the design-system package share one component model.

## Consequences

### Positive

- Hosting is free and operationally trivial: static files on GitHub Pages, no server, database, or runtime to maintain or secure.
- Content is readable with zero JavaScript; interactivity is additive, so the core experience degrades gracefully.
- Fast first paint and strong Core Web Vitals — most pages ship little or no JS, and only island code is hydrated.
- Clear boundary: if something needs client state, it is deliberately an island, which keeps the default path static by construction.
- The build is reproducible and verifiable in CI without a running backend.

### Negative

- No server-side logic. Anything needing secrets, dynamic data, or per-request work must move to a client-side call to an external service or a future backend — a migration, not a config change.
- Island state does not share a React tree, so cross-island coordination (e.g. the theme) needs an out-of-band mechanism (DOM attributes plus a shared store) rather than plain React context.
- A second framework runtime (React) is shipped for the islands; care is needed to keep bundles small and avoid hydrating more than necessary.
- Fully dynamic, logged-in, or personalised experiences are out of scope without re-architecting.

## Alternatives considered

- **Server-rendered framework (e.g. Next.js with SSR):** supports dynamic logic but requires a hosting platform that runs server code, adding cost and operational surface we do not need yet.
- **Single-page application:** one large client bundle; the page is blank until JavaScript loads, failing the no-JS readability requirement.
- **Static HTML/CSS with no component framework:** maximally simple, but offers no clean path to the interactive features the site is expected to grow.
