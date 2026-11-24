---
title: Laying the foundations for a global, multi-brand design system
slug: design-system-foundations
description: The technical decisions under Vodafone’s Neo design system, and why they held up as it grew from web to React Native
date: 2026-11-23
draft: true
series: neo
video:
  label: 'Showreel: Vodafone Neo'
  poster: /videos/showreel-2026-10-poster.webp
  captions: /videos/showreel-2026-10.en.vtt
  transcript: /transcripts/showreel-2026-10/
  sources:
    - src: /videos/showreel-2026-10-1080.mp4
      media: '(min-width: 52rem)'
    - src: /videos/showreel-2026-10-720.mp4
---

<!--
Post 1 of 3 on Neo. Outline, not prose. Target ~1000 words, stretch to 1200.
Technical. Must stand alone: brief context first. The "why teams trusted it"
story is in one-more-competing-standard (next); the agents work is in neo-for-agents.
Series order is set by date, a week apart: foundations 23 Nov, trust 30 Nov, agents 7 Dec.
Through line: building at scale (multi-theme, multi-brand, multi-platform).
Each new axis multiplies the work; the foundations keep that multiplication cheap.
Framing: the team's work, an engineering take on a topic usually written up by designers.
Be honest about what's proven: light/dark ships on both platforms, breakpoints on web,
brand and density are in the architecture but not in components yet.
Rules and sources: docs/writing/neo.md.
[Brackets] = planned MDX components.
-->

[CaseMeta] Role: technical side of the Neo design team · Timeline: February 2026 to present · Platforms: web, React Native · Focus: accessible foundations, testing, core components, component metadata

- Hook: TODO. Scale as multiplication, not as a component count (81 stable on web, 14 in labs on React Native, so don't say "past a hundred")

## Context

- Neo is Vodafone’s new global design system, and the first with a shared React library rather than Figma files each team implemented its own way
- The axes it has to serve, each multiplying the others:
  - Theme: light and dark
  - Brand: sub-brands themed from one source
  - Platform: web, then React Native
  - Breakpoint: four on web (React Native is mobile-only)
  - Locale: many languages, including right-to-left
- One line on the team: I joined the design team in February 2026 to work on the technical side

## Tokens: a base and sparse overlays

- One token source for web (plain CSS, with Tailwind as a mapping layer, Tailwind Variants) and React Native, built in-project with Style Dictionary
- Each axis value is an overlay that only holds what it changes, merged over one complete base at build time (ADR 0033)
- [StatGroup] Complete trees for every combination of theme, density and breakpoint would be 2 × 3 × 4 = 24; overlays make a new axis one more set of files, not a multiplication
- A collision between two overlays fails the build rather than silently winning
- Light/dark doesn't stop at colour: `Image` takes a `dark` source too
- Brand is the next overlay. Don't claim it ships, and don't mention unannounced plans
- Density: in the tokens but not in components, because it isn't in Figma. Leave it out, or use it only to illustrate the 24
- [Figure] Base + overlays, one per axis, merging into a resolved set
- TODO: answers to the tokens questions (pain of full trees, what component code doesn't have to write, why dark images, what adding a brand would take)

## One component contract, two platforms

- The same idea one layer up: each component's contract is a shared file plus sparse web and React Native overlays (ADR 0060)
- Shared fields flow to every platform, so differences are explicit and listed with a reason (e.g. `testID` vs `data-testid`)
- When React Native arrived, the contract was the specification: no requirements gathering, no rediscovering edge cases
- [Callout: impact] Infrastructure plus the first 10 React Native components in two weeks, by an engineer who joined late and was productive within days

## Tests across the combinations

- Unit tests for behaviour, accessibility checks on every documented example, visual snapshots in real browsers (ADR 0012)
- Web visual tests run per theme × breakpoint on every PR, plus a right-to-left pass: one Arabic-locale story per component, about 80 baselines (light mode only, so don't claim RTL × theme); React Native has its own tiers, with visual regression in light and dark on an Android emulator
- Caught real regressions when later, more complex components needed changes to Text, Link, Button and Popover
- [Callout: finding] The first RTL run caught a real consumer bug: Modal, FullScreenModal and MegaMenu didn't mirror. Overlays render into `<body>`, outside the element where the provider sets `dir` and `lang`, so any RTL app following the setup docs was affected. Dark mode had hit the same issue and been patched per overlay; direction never had. Overlays now re-apply direction and language alongside colour mode, guarded by a unit test and the baselines
- Lesson, tied to the through line: fixing one axis doesn't fix the next. Each axis needs its own test, or the multiplication hides gaps
- Don't imply the platforms have equal coverage: React Native visual runs locally, Android only

## An accessible base layer with locale support (only if it fits)

- React Aria Components as the headless primitive layer (ADR 0013): keyboard, focus, RTL and locale-aware dates handled for every market
- Accessibility: WCAG 2.2 AA, required by law
- Why not Radix: no DatePicker or Calendar primitive, and its RTL is layout-only, so date formatting and calendar systems would have been ours to build
- React Aria derives direction from the locale, so RTL is mostly handled inside the component tree; overlays rendered outside it were the exception (→ the RTL callout above); DatePicker and Calendar handle calendar systems (Gregorian, Hijri, Buddhist, Persian) and locale formatting
- Base UI: had momentum but no track record yet
- Most thoroughly accessibility-tested, Radix development slowing - briefly - don't duplicate the trust post too much
- React Native follows its own platform model for right-to-left (ADR 0055)

## Close

- What's proven so far, and what the foundations are ready for: brand as the next overlay

Next: [Earning trust when you’re one more competing standard](/writing/one-more-competing-standard), how Neo won over teams that already had a design system of their own.
