# CLAUDE.md

Personal site for Clara + the design system it's built on. pnpm monorepo, Node ≥24.

## Layout

- `packages/tokens` (`@clara/tokens`) — DTCG JSON → CSS custom properties via Style Dictionary (`build.js`). Three tiers: primitives → semantic → component. Build: `pnpm tokens`. Output in `dist/*.css` is auto-generated — never hand-edit.
- `packages/design-system` (`@clara/design-system`) — React 19 components, vanilla CSS + custom properties, documented in Storybook (`pnpm storybook`).
- `apps/site` (`@clara/site`) — Astro, static output, React islands only where interactive. `pnpm dev`.

## Conventions

- **Styling**: plain CSS organised with native cascade layers (`@layer reset, base, components, utilities`), semantic class names, no utility classes, no CSS-in-JS (ADR 0002). Every styled property reads a token custom property — never hard-code a literal value or magic number.
- **Components**: plain React components composed with the local `cx` helper (`src/utils/cx.ts`). Element polymorphism is a plain `as` prop (typed via `Polymorphic<E, Own>` in `src/utils/polymorphic.ts`), **not** Base UI's `useRender` — a `render` element can't cross Astro's static-render boundary (ADR 0005). One folder per component: `Name.tsx` + `Name.css` + `Name.stories.tsx`. BEM-ish class names (`.card`, `.card__header`). Re-exported from `src/index.ts`.
- **Theming** is two-axis via data attributes (ADR 0004): `[data-theme='light'|'dark']` and `[data-preset='<name>']` (presets: `datum`, `opal`). Presets are partial, override-only layers over the default theme; the token build enforces this plus reference integrity.
- **Typography** tokens are responsive composites exploded into per-subproperty custom props (`--text-<role>-font-size`, etc.) — ADR 0007.

## ADRs

See `docs/adr/`: 0001 static Astro + React islands · 0002 vanilla CSS + cascade layers · 0003 token pipeline build gates · 0004 two-axis theming via data attributes · 0005 shadcn + Base UI primitives · 0006 pnpm monorepo · 0007 responsive typography tokens.

## Commands

`pnpm tokens` · `pnpm storybook` · `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm format`
