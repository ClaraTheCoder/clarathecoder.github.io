---
title: Teaching agents to build with Neo
description: How Vodafone’s design system presents itself to coding agents, and how benchmarking showed us where to improve
date: 2026-11-22
video:
  label: Migrating a page to Neo with one prompt
  poster: /videos/neo-migration-promo-poster.jpg
  captions: /videos/neo-migration-promo.en.vtt
  sources:
    - src: /videos/neo-migration-promo-1080.mp4
      media: '(min-width: 52rem)'
    - src: /videos/neo-migration-promo-720.mp4
---

Neo is built to be read by machines, too. Each component’s contract is generated from its types and feeds both the Storybook docs and the metadata agents read, so the two can’t drift apart. On top of that sit Figma Code Connect, a Figma Make kit, an index of when to use each component (and when not to), and a guide to migrating off the old system.

Together they let a product engineer, or a designer with an AI tool, build a working, on-brand page from a single prompt. To check it really worked, I built a tool that gets several models to build the same page and tracks how long each one takes and how many tokens it uses. Whenever one got stuck, I fixed the system so the next one wouldn’t.

## What an agent can’t see

- A published library is compiled JavaScript and type declarations: no variants, no usage rules, no composition
- Storybook has the answers, but buried in story files written for people
- What agents did without help: invented their own components

## Contracts generated from types

- `<Name>.meta.json` and its schema: summary, description for a reader with no visual context, props, usage (when, avoid, alternatives), composition (ADR 0017)
- Moving from hand-written metadata to contracts generated from the type surface
- One contract feeding both Storybook and agents, so the two can’t drift
- A short example contract

## Code Connect, the Make kit, the index and the migration guide

- `llms.txt`, and the source-of-truth hierarchy that tells an agent which source wins
- The when-to-use index
- Figma Code Connect, published publicly; the Figma Make kit
- The Source Web migration guide, written for agents

## The benchmark

- Claude Code with a clean config, only the published packages and Neo’s own agent setup
- Three workflows: from a Figma design, from a written brief, migrating a Source Web page
- Haiku, Sonnet and Opus at different efforts, plus one GPT run
- What it records: working time, prompts from a person, model responses, tokens by type; never currency
- Results: which figures you can publish

## Fixing the system, not the prompt

- Findings that became fixes: grid widths, Footer, Accordion focus, illustration imports, sharper page-composition guidance
- The migration demo: 19m 31s, one prompt, 27 Neo components (check it’s yours to quote)

## What I’d tell another team

- Lessons, three or four of them

The foundations this all rests on are in [Laying Neo’s foundations](/writing/neo-foundations).
