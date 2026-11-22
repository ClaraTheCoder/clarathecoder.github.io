---
title: Laying Neo’s foundations
description: The engineering base under Vodafone’s global design system, from an accessible primitive layer and a testing strategy to every decision written down.
date: 2026-11-22
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

Neo is Vodafone’s new global design system, used by teams across the company. I joined a small team of designers to build it from scratch, and set the engineering foundations everything else relies on: React Aria as an accessible base layer, token architecture for white-labelling across sub-brands, the forms and interaction patterns, metadata for AI legibility, and the testing strategy.

Every decision was written down as an Architectural Decision Record, so engineers who joined later could pick up the system and build on it with very little onboarding, and the architecture held as the library grew past a hundred components across web and React Native.

## Why Neo needed to exist

- Product teams were each building their own UI, so brand and accessibility drifted from product to product
- One shared system only wins if using it costs a team less than building their own
- Started February 2026; who else was on the team (check wording with Phil, whose write-up calls him the first engineer)

## React Aria as an accessible base layer

- What was coming: Select, Combobox, DatePicker, Dialog, Menu, Tabs, Accordion
- Radix vs React Aria Components, and why RAC won: locale-aware date and calendar handling, RTL from the locale (ADR 0013)
- What it freed Neo’s own code to focus on: tokens, variants, the Vodafone brand
- Where RAC stopped and you built your own: `useInteractiveControl`, the stretched overlay control, gesture-driven overlays with Motion

## Tokens and white-labelling

- The token architecture for sub-brands, and your part in it
- One token source for web and React Native; the plain-CSS output, with Tailwind as a mapping layer
- Resetting the default Tailwind spacing scale and enforcing spacing tokens (ADR 0048)

## Forms and interaction patterns

- Who owns validation, and who owns loading state (ADRs 0037, 0021)
- One worked example, with a screenshot or snippet

## The testing strategy

- Three tiers, each with one job: unit tests for behaviour, accessibility checks on every documented example, visual snapshots in real browsers (ADR 0012)
- Why class-name assertions were banned
- What a failing check blocks

## Writing it all down

- 64 ADRs by November 2026, ten of them yours
- How later joiners onboarded from them
- A decision that was hard, and the record that settled it

## Where it landed

- Past a hundred components across web and React Native
- Adoption: the part still going
- What you’d do differently

Neo was also built to be read by machines. That’s its own story: [Teaching agents to build with Neo](/writing/neo-for-agents).
