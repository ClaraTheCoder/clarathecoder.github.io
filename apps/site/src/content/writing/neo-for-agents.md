---
title: Teaching agents to build with Neo
description: How Vodafone’s design system presents itself to coding agents, and how benchmarking showed us where to improve
draft: true
series: neo
video:
  label: Migrating a page to Neo with one prompt
  poster: /videos/neo-migration-promo-poster.jpg
  captions: /videos/neo-migration-promo.en.vtt
  sources:
    - src: /videos/neo-migration-promo-1080.mp4
      media: '(min-width: 52rem)'
    - src: /videos/neo-migration-promo-720.mp4
---

<!--
Post 3 of 3 on Neo. Outline, not prose. Up to 2000 words.
A general how-to, with Neo as the worked example. Message: you can test real
models against your design system's agent tooling. Don't guess or take
the experts' word for it; build a repeatable harness, change one thing and
rerun. The benchmark matters as much as the docs.
No costs. No video how-to. Keep Vodafone-specific detail light.
Rules and sources: docs/writing/neo.md.
[Brackets] = planned MDX components.
-->

- Hook: this was the year coding agents joined everyone’s workflow, so a design system now has a second reader
- [Callout: impact] Migrating a real page to Neo: under 20 minutes, one prompt, 27 Neo components, no hard-coded colours, and the benchmark has already shown how to make it faster

## What an agent can’t see

- A published library is compiled JavaScript and type declarations: no variants, no usage rules, no composition
- Without help, agents couldn’t find the right component, so they made one up: either it looked like the design but wasn’t built from the components, or it missed the standard entirely, with the wrong radii, colours and patterns

## Making the system readable

- `llms.txt` ships inside the package, so the guidance always matches the installed version
- It points to everything else: per-component metadata (when to use, what to avoid, alternatives, composition, accessibility), an index of when to use each component, migration notes from the previous system, and which source wins when two disagree
- Also: Figma Code Connect and a Figma Make kit (one line each)
- [Callout: finding] Consumers don’t need to be prompt engineers or Neo experts: one line of setup in `AGENTS.md`, one sentence of prompt

## Measuring it, not guessing

- [PullQuote] Don’t take the experts’ word for what works. Build a harness, change one thing, run it again
- The harness: a clean agent configuration (no memory, plugins or personal settings), only the published packages, a fixed prompt, a script that copies a template, records the screen and totals usage from the session logs, never from asking the agent
- Isolation matters: runs happen outside the home folder, so the operator’s own agent instructions can’t leak in
- [Table] Three workflows, three ways teams really start:
  - From a Figma design
  - From a written brief, with no design at all
  - Migrating an existing page from the previous system
- A matrix of models and effort levels, plus one exploratory run on another vendor’s agent
- Measured: working time, prompts from a person (must be one), model responses, tokens by type

## Scoring without a single number

- No single accuracy percentage; a checklist instead: builds cleanly, content kept, built from the system’s components, accessibility checked at two widths, no broken images, side-by-side screenshots, and what a developer would need to fix
- A scoring script does what it can; people judge the rest

## What it found

- Very few hallucinations, even with no design context: every run typechecked, linted and built, and almost all used Neo components with no hard-coded colours
- It found real problems in the library itself, not just the docs: an accessibility bug in Accordion (closed panels kept their links focusable), footer landmarks, grid widths, a misleading import instruction
- Fixed in v0.18.0, then rerun
- [Callout: finding] What the counts missed: one run rebuilt cards from Neo primitives instead of using the card components. Every check passed, but the page would drift as the components changed. This is where docs reach their limit

## What’s next: an MCP server

- Plain files were the right place to start: versioned with the package, nothing to host, and they can’t be blocked (an organisation’s policy blocked an MCP server in one of the runs)
- What an MCP server would add:
  - Discovery: tools appear in the agent’s tool list automatically, with no `AGENTS.md` line needed
  - Checking, not just describing: a tool that reviews a page against the system and would have caught the hand-built cards
  - Smaller context: ask for one component’s contract instead of reading files
  - Reach and feedback: works where there’s no `node_modules` (design tools, chat), and shows what agents actually ask for, so the benchmark’s loop never stops

The component metadata comes from [Laying the foundations for a global design system](/writing/design-system-foundations).
