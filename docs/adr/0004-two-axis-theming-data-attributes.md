# 4. Two-axis theming via data attributes

- Status: Accepted
- Date: 2026-10-27

## Context

Theming has two independent axes: which theme is active, and whether it renders light or dark. The choice must survive navigation, respect the operating system's light/dark preference by default, and apply before first paint to avoid a flash of the wrong theme. Interactive controls are separate islands that do not share a single component tree.

## Decision

Represent both axes as data attributes on the root element: one for the active theme, one for the mode. A small inline script in the document head applies the stored choice before any styling is evaluated. A shared external store (outside any single island) holds the current selection and notifies every island, and a stored value that no longer matches a known theme falls back to the default.

Themes other than the default are **partial, override-only presets**: a preset emits only the keys it changes, overriding the matching `:root` custom property through the cascade and otherwise inheriting the default. A preset therefore carries **as few custom tokens as necessary** — it must not restate a value it would already inherit, since a preset key whose resolved value equals the default's (for the same key and mode) is inert dead weight. A preset close to the default is expected to be the leanest, and a preset that overrides nothing at a given tier — defining no component tokens at all, say — simply inherits it; that is correct, not a gap.

## Consequences

### Positive

- No flash of the wrong theme: the inline script sets the attributes before the first paint.
- The two axes compose cleanly — any theme works in either mode without a combinatorial explosion of selectors.
- All islands stay in sync through one shared store, despite not sharing a React tree.
- The default path needs no JavaScript: the OS preference still applies through CSS, and the markup ships a sensible default theme.
- Stale or invalid stored selections degrade safely to the default rather than rendering an unstyled page.
- Presets stay lean and legible: each file is only the genuine deltas from the default, so what a preset actually changes is obvious at a glance.

### Negative

- An inline head script is a small piece of logic that must stay in step with the stored-value format and the known theme list.
- State lives partly in the DOM and partly in a hand-rolled store rather than in idiomatic framework state, which is less familiar to newcomers.
- Reading from storage and the DOM assumes a browser; server or build-time rendering must guard for their absence.
- Persisted selections can outlive a renamed or removed theme, so a validation and fallback step is mandatory, not optional.

## Alternatives considered

- **Class-based theming:** workable, but attributes read more clearly for two orthogonal axes and avoid long combined class names.
- **Framework context only:** cannot span independent islands and does nothing before hydration, so the flash-of-wrong-theme problem would remain.
- **No persistence (session only):** simpler, but the visitor's choice would be lost on every navigation and reload.
