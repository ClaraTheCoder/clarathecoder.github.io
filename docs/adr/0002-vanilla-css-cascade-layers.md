# 2. Vanilla CSS with cascade layers, driven by tokens

- Status: Accepted
- Date: 2026-10-27

## Context

The site's defining feature is runtime theming: visitors can switch the entire look — colour, type, shape, motion — on the fly. That means styling has to be expressed as values that can be swapped at runtime, not baked into markup. The styling approach also has to stay legible as the component set grows, with a predictable override order.

## Decision

Write plain CSS, organised with native cascade layers (`@layer reset, base, components, utilities`). Every styled property reads from a CSS custom property (a design token) rather than a literal value. Components carry semantic class names and no CSS-in-JS.

The rule about utility classes is specifically: **components do not take Tailwind-style utility classes in markup.** A `<Card>` renders `<div class="card">`, never `<div class="p-4 bg-white">`. Presentation lives in the component's own rule, keyed off tokens, so runtime theming keeps working.

**Layout primitives are the explicit, bounded exception.** A layout component (`Box`, `Flex`, `Grid`, `Container` — see `docs/specs/layout-primitives.md`) exists precisely to emit padding, gaps, and layout, so the component _is_ the utility. These components — and only these — may compose a finite, token-generated utility layer: enumerable props (the spacing scale, flex/grid enums) compile to classes emitted by `@clara/tokens` into the utilities tier of `dist/tokens.css`, and arbitrary values ride inline custom properties the component sets. Every class still resolves to a token, and the whole set lives in the `utilities` layer so layer order — not specificity — governs precedence over the `components`-layer base classes. The exception does not extend to ordinary components, whose markup stays free of presentational classes.

## Consequences

### Positive

- Runtime theming is essentially free: swapping the values of custom properties restyles everything, because components only ever reference tokens.
- Cascade layers make override order explicit and stable, so component styles cannot be accidentally outranked by base or reset rules.
- Styling ships as static CSS with no runtime style engine, keeping islands small and the no-JS path fully styled.
- Semantic class names keep the DOM readable and the CSS greppable.

### Negative

- No utility-class ergonomics for ordinary components; common adjustments require writing or extending a rule rather than composing classes in markup. Layout spacing is the one place the utility layer buys that ergonomics back.
- The generated layout utility layer is sizable (hundreds of rules across props × spacing steps × breakpoints). It is finite, gzips well, and ships as static CSS, but its class count is worth watching.
- Discipline is required to never hard-code a value — a stray literal silently opts out of theming and is easy to miss in review.
- Shared conventions (naming, file layout) are enforced by habit and linting rather than by a framework's constraints.
- Global class names carry the usual collision risk, mitigated by layering and naming discipline rather than by scoping tooling.

## Alternatives considered

- **Utility-first CSS framework:** fast to write, but theming becomes a build config concern and markup fills with presentational classes, which fights the goal of values that change at runtime.
- **CSS Modules:** solves scoping, but adds a build step per component and still needs a token layer on top for runtime theming.
- **CSS-in-JS:** ties styling to the JavaScript runtime, inflating island bundles and undermining the fully-styled no-JS path.
