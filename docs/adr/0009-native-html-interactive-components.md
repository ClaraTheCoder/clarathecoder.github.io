# 9. Native HTML elements for interactive components

- Status: Accepted
- Date: 2026-11-09
- Supersedes: [0005](0005-shadcn-base-ui-interactive-primitives.md)

## Context

ADR 0005 chose shadcn on Base UI for interactive components. In practice it was never used: Base UI sat in `package.json` with no imports, and both interactive components built so far went native instead.

The deciding constraint is **raw mode**. The site's theme picker includes a "Raw" option that strips all author CSS (`:root[data-raw] * { all: revert !important }`) so visitors can see the unstyled document. Every interactive component must keep working there, and the picker itself must stay usable, since it is how you leave raw mode.

JS-driven headless primitives break under that revert. Base UI's Dialog renders its popup as a plain `<div>` portalled to the end of `<body>` and relies on author CSS for positioning; reverted, it falls below the footer, off-screen, while still trapping focus. Its radio primitive hides the real input with an inline style that can't be un-hidden. Native elements instead fall back to UA styles that still work: a modal `<dialog>` is centred in the top layer with a `::backdrop`, and radios render as radios.

## Decision

Build interactive components on native platform elements — `<dialog>` with `showModal()`, `<input type="radio">` groups, and later `popover` and friends — and add only the JavaScript the platform doesn't supply. Remove the Base UI dependency; don't use shadcn scaffolding.

Current cases:

- **SegmentedControl**: native radios in a `role="radiogroup"`; the browser gives single-select and arrow-key roving focus.
- **Dialog**: native `<dialog>` + `showModal()`; the browser gives the top layer, `::backdrop`, focus trapping, inert background and Escape to close. We add open-state wiring, backdrop-click dismissal (`closedby="any"` plus a click fallback) and focus return.

Carried over from ADR 0005 unchanged: **element polymorphism is a plain `as` tag prop** (typed via `Polymorphic<E, Own>` in `src/utils/polymorphic.ts`), never a `render`-element prop. A React element passed to `render` can't cross Astro's static-render boundary (ADR 0001); a tag name can.

## Consequences

### Positive

- Components degrade to working, UA-styled HTML in raw mode with no special-casing.
- Accessibility semantics come from the platform rather than a re-implementation, and there is no third-party primitive layer to track.
- Less JavaScript per island.

### Negative

- The gaps the platform leaves (backdrop-click close where `closedby` is unsupported, explicit focus return, labelling) are ours to build and test.
- No primitive library for harder widgets (menus, comboboxes); each needs its own native-first design when it arrives.
- `showModal()` still needs JavaScript, so dialogs remain islands with no no-JS fallback.

## Alternatives considered

- **Keep Base UI and accept raw-mode breakage**, mitigated by auto-closing the dialog or pinning an exit control. Rejected: it makes one site mode a second-class citizen and special-cases every component.
- **Base UI with `render={<dialog>}`**: without `showModal()` there is no top layer or modal behaviour, so it doesn't fix the problem.
