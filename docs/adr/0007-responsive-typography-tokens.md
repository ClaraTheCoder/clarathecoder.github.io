# 7. Responsive typography tokens: fluid primitive scale + composite semantic roles

- Status: Accepted
- Date: 2026-11-01

## Context

Typography follows colour's three tiers (ADR 0003), with two twists: it must be responsive without breakpoint snapping, and a role like `heading-1` is a _bundle_ of properties each theme styles to suit its font. It drives both component UI and Astro-markdown prose, whose bare `<h2>`/`<p>` tags cannot carry classes. The pre-rebuild system conflated roles with t-shirt sizes and made only a few sizes fluid by hand.

## Decision

**Primitive tier — a shared fluid scale.** Numbered, meaning-free steps (`font.size.100`–`900`), each a single `clamp()` interpolating small-screen to large-screen (Utopia method); plus line-height, weight, tracking ramps and a font-family pool. Sizes in `rem`, line-height unitless, tracking in `em`; `html { font-size }` is never overridden.

**Semantic tier — composite roles.** Thirteen roles (`display`, `heading-1`–`6`, `lead`, `body`, `body-sm`, `caption`, `overline`, `code`) authored as DTCG `typography` composites. We **follow Tokens Studio's typography model**, not the bare W3C draft: the composite carries its superset (`fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textCase, textDecoration, paragraphSpacing, paragraphIndent`). `textCase` is Tokens Studio's pre-spec extension, accepted as first-class. The `default` theme defines all roles; presets are override-only partials (like colour) and may change any sub-property, including re-pointing a role at a different shared step.

**Build — explode composites.** The existing hand-rolled `build.js` turns a composite `$value` into one custom property per sub-key (`--text-<role>-<css-suffix>`), emitted once (mode-independent) under `:root` and `[data-preset]`. We did **not** adopt `@tokens-studio/sd-transforms` — we follow the model, not the tooling, and do not author in Figma. Gates stay minimal: presets are override-only and every reference must resolve.

**Application.** `@clara/tokens` emits only custom properties; `@clara/design-system` applies them via zero-specificity `:where()` base defaults, a `.text-<role>` class per role, `prose.css` (measure, rhythm, markdown) and `fonts.css` (eager `@fontsource`, so a theme switch never flashes an unloaded font). Components that bundle a whole role consume the `--text-<role>-*` group directly; a control whose size varies per variant (e.g. Button `sm`/`md`/`lg`) instead reads the `--font-size-*` primitive steps per variant, since no single composite role expresses a multi-size control.

## Consequences

### Positive

- Responsive by construction — every step is a `clamp()`, no breakpoints.
- A theme differs by swapping font/case/weight/step while the ramp never moves.
- Roles stay cohesive and parity-gated; prose and components share them, and the no-JS path is fully styled. `rem` respects user font-size settings.

### Negative

- Deeper indirection, and we own a sub-key→CSS name-map plus reliance on Tokens Studio's pre-spec `textCase`.
- Eager fonts trade payload for no switch-flash; no type-specific a11y gate.

## Alternatives considered

- **DTCG composite → CSS classes:** a class is not a swappable value.
- **Atomic per-axis tokens:** flexible, but no enforced role cohesion.
- **`sd-transforms`:** ingestion machinery for a Figma export we do not produce.
- **Static scale, opt-in fluidity (legacy):** scatters responsiveness per role.
