# 5. shadcn + Base UI for interactive components

- Status: Superseded by [0009](0009-native-html-interactive-components.md)
- Date: 2026-10-27
- Revised: 2026-11-08

## Context

A handful of components need real interaction behaviour: a modal dialog, a menu, and a segmented single-select control. Getting these right means focus trapping, roving focus, keyboard navigation, dismissal handling, and correct ARIA — work that is easy to get subtly wrong by hand and central to the site's accessibility commitment. The visual design, however, must be fully owned by the token system.

## Decision

Scaffold these interactive components with shadcn, configured against its Base UI primitive layer. shadcn distributes component source we copy into and own in this repo rather than a styled package we install; Base UI supplies the headless, accessible behaviour underneath. Our own tokenised CSS supplies the entire appearance, replacing whatever starter styling the generated source ships with.

Base UI is scoped strictly to that interaction behaviour. **Element polymorphism does not use Base UI's `useRender`.** Its `render` prop takes a React _element_, which cannot survive the Astro boundary: an element written in an `.astro` expression isn't a React element, so a statically-rendered DS component (ADR 0001) can't clone it. Static components are therefore hand-authored plain React components (consistent with the "static ones stay hand-authored" consequence below), and those that swap their element do so through a plain `as` tag prop (typed via `Polymorphic<E, Own>` in `src/utils/polymorphic.ts`) — a tag name serialises through Astro's static render where a `render` element does not.

## Consequences

### Positive

- Accessibility behaviour — focus management, keyboard support, ARIA, dismissal — comes correct out of the box from Base UI instead of being re-implemented per component.
- Base UI is headless, so theming is unconstrained; tokens drive the look with nothing to override.
- Because shadcn hands us the component source to own, we can delete the starter styling outright and compose behaviour onto our tokenised CSS directly, rather than layering over opinionated defaults.
- Consistent interaction semantics across dialog, menu, and control reduce surprises for keyboard and assistive-technology users.

### Negative

- Base UI now sits on the critical interaction path; its updates, API changes, and bundle cost must be tracked.
- We own the generated component source, so upstream shadcn fixes don't arrive automatically — picking them up is a manual re-sync.
- Each primitive imposes a composition shape; bending it to an unusual pattern can be more effort than a bespoke build.
- Only interactive components justify the dependency — static ones stay hand-authored, so the codebase mixes two approaches.
- Some JavaScript is required for these components to function, so each is an island and absent when scripting is unavailable.

## Alternatives considered

- **shadcn on Radix:** the other primitive layer shadcn supports, and comparable in capability, but Base UI was chosen for this project instead.
- **A styled component kit:** faster to assemble, but its built-in styling fights a token-driven system and is hard to fully override.
- **Hand-rolled components:** maximal control, but re-implementing focus traps and ARIA correctly is high-risk and slow, with ongoing maintenance.
