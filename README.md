# clara-site

Personal site for Clara — a design-systems engineer and tech lead — and the design system it is built on.

A pnpm monorepo:

| Package                                           | What it is                                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `packages/design-system` (`@clara/design-system`) | Token-driven, accessible React components. Styled with vanilla CSS + custom properties. Documented in Storybook. |
| `apps/site` (`@clara/site`)                       | The site itself: Astro, static output, React islands only where interactivity is needed.                         |

## Prerequisites

- Node (see `.node-version`)
- pnpm (via Corepack, or installed globally)

## Commands

```sh
pnpm install          # install the workspace
pnpm tokens           # build tokens.css from the DTCG JSON
pnpm storybook        # component workbench
pnpm dev              # run the site
pnpm build            # build every package
pnpm lint             # lint
pnpm format           # format with Prettier
```

## Principles

- **Token-based everything** — colour, type, spacing, radius, motion and fonts are all tokens. Components reference semantic tokens only, never raw palette values or magic numbers.
- **Progressive enhancement** — a page is fully readable with no JavaScript. JS ships only for genuinely interactive islands (theme switching, demos).
- **Accessible** — WCAG 2.2 AA, validated at the component level (`eslint-plugin-jsx-a11y`, Storybook a11y addon).

## Deploying

The site deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. One-time setup: on GitHub, set **Settings → Pages → Source** to **GitHub Actions**. It's configured as a user page served at the domain root; update `site` in `apps/site/astro.config.mjs` to your `<username>.github.io`.
