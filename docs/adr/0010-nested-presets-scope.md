# 10. Nested presets: default base on every preset, component tokens in `@scope`

- Status: Accepted
- Date: 2026-11-21
- Extends: [0004](0004-two-axis-theming-data-attributes.md)

## Context

ADR 0004 scopes theming to data attributes on the root: `[data-preset]` and `[data-theme]` on `<html>`. The theme picker now previews each preset on its own card, so a `[data-preset]` element has to render correctly _inside_ a page wearing a different preset. Two things broke that:

1. **Partial presets inherit the page's values.** Presets are override-only, so a nested Opal card only redeclares the tokens Opal overrides. Everything else (a radius, a type role, a motion distance) is inherited from the page's preset rather than falling back to the default theme. A Default card has no attribute block at all, so inside an Opal page it was simply Opal.
2. **Component preset tokens are descendant selectors.** `[data-preset='opal'] .button` matches any button below an Opal ancestor, and outranks the base `.button` block by specificity. A Default card's button inside an Opal page was dressed by Opal, whatever the card's own attribute said.

## Decision

- **Default base on every preset element.** The default-theme semantic, typography and base blocks are emitted for `:root, :where([data-preset])` (and the dark-scheme media block for `:where([data-preset]):not([data-theme='light'])`). A nested preset element re-establishes the complete default base on itself, then its own preset block (later, and higher specificity) overrides it. `:where()` keeps the extra selector at zero specificity, so nothing at the root changes. A card previews the default theme with `data-preset="default"`, which matches the base and no preset block.
- **Component tokens in `@scope`.** The base block for each component is emitted as `@scope (:root, [data-preset]) { .<comp> { … } }` and each preset override as `@scope ([data-preset='<p>']) { .<comp> { … } }`. All blocks now share the specificity of `.<comp>`, so the cascade decides by scope proximity: the nearest preset ancestor wins. Between equally near scopes (the same element), source order applies and preset blocks come after the base, as before.
- **Light/dark is mirrored, not inherited.** `[data-preset='<p>'][data-theme='dark']` needs both attributes on the same element, so a nested preview mirrors the page's `data-theme` onto itself. When the page follows the system scheme, neither carries it and the media-query blocks apply to both.

## Consequences

- Any element can host a preset preview by carrying `data-preset` (and the page's `data-theme`): the semantic tier, type, base scalars and component tokens all resolve in that world. `RadioCards` relies on this for the theme picker.
- The build's override-only and reference-integrity gates (ADR 0003) are unchanged; only selectors changed.
- `@scope` is required for component tokens to apply at all: Chrome/Edge 118+, Safari 17.4+, Firefox 146+. In an older engine every component token block is dropped and components lose their themed values. Acceptable for this site; revisit if it needs to support older browsers (a fallback would be unscoped base blocks emitted before the scoped ones).
- Component CSS must keep reading component tokens on the component element itself (`.button { background: var(--button-primary-bg) }`), never on a wrapper, so the scoped declarations land where they're read.
