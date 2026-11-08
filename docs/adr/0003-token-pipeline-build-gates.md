# 3. Three-tier token pipeline with build-time gates

- Status: Accepted
- Date: 2026-10-27

## Context

Styling is driven entirely by design tokens, and the site ships several themes that must stay mutually consistent. Tokens cover every styling decision — not just colour, but spacing, sizing, typography, radius, elevation, motion, and stacking order. They therefore need a single source of truth, a clear structure, and automated guarantees — a theme that quietly omits a value or drifts out of parity is worse than no theme.

## Decision

Author tokens as structured JSON in three tiers:

- **Primitive** — raw literal values, no semantics. Organised as complete scales: `color` ramps, `dimension` (`space`, `size`), `typography` (`font.*`), `radius`, `motion` (`duration`, `ease`), and `z`. A scale is allowed to be complete without every rung being consumed — the palette and scales are the raw material, not a usage list.
- **Semantic** — roles that alias primitives (`color.accent`, `focus-ring.width`, the composite typography roles).
- **Component** — per-component values that reference semantics or primitives.

A build step (`build.js`) compiles them into layered CSS custom properties; any `tokens/primitives/*.json` file is auto-wired into `:root` and into the reference-validation set, so adding a scale needs no build changes. That step also acts as a gate: it fails the build on key-parity drift between themes (every theme defines the same keys for every mode) and on any `{…}` reference that does not resolve.

**Purity.** The semantic and component tiers reference tokens (`{…}`); they do not hard-code literal values or magic numbers — a raw value belongs in a primitive the tier can reference. Two kinds of value are a **documented exception**, because they have no token representation and the gates cannot check them:

- Free-form brand expression with no primitive equivalent — CSS gradients, `backdrop-filter`, and a preset's bespoke shadow _geometry_ (e.g. `pow`'s zero-blur offset `5px 5px 0 {color…}`). The colour inside still flows through a primitive; only the irreducible shape is literal.
- References to _generated composite sub-properties_ that have no `{…}` path, such as `var(--text-body-font-family)` (produced by exploding a typography composite).

## Consequences

### Positive

- One source of truth: components consume tokens only, never arbitrary literals.
- Integrity is enforced mechanically — an unresolved token reference breaks the build rather than surfacing as an unstyled value in production.
- Adding or editing a theme is safe: missing or mismatched keys fail fast with a clear error instead of surfacing as a visual bug later.
- The three tiers localise change: a palette or scale tweak flows through semantics to components without hand-editing each consumer.

### Negative

- Indirection has a learning cost: tracing a rendered value means walking component → semantic → primitive.
- A custom build step is a maintained dependency; its logic and the gate thresholds are project-specific and must be kept current.
- Strict key parity means every new token must be added to every theme at once, which is more upfront work when themes legitimately differ.
- The exception classes (brand geometry, generated composites) hold free-form CSS that bypasses the gates and relies on review to stay valid.

## Alternatives considered

- **Hand-written CSS custom properties:** no tooling to maintain, but no enforcement of cross-theme consistency, and no tiered structure.
- **A framework's theme configuration:** couples tokens to that framework and typically lacks build-time parity and reference gates.
