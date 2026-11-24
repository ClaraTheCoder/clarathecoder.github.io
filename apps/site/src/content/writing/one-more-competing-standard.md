---
title: Earning trust when you’re one more competing standard
slug: one-more-competing-standard
description: How a new company-wide design system won over teams that already had one of their own
draft: true
image:
  src: https://imgs.xkcd.com/comics/standards_2x.png
  alt: 'xkcd comic. Panel 1: there are 14 competing standards. Panel 2: two people agree that’s ridiculous and they should develop one universal standard covering everyone’s use cases. Panel 3: there are 15 competing standards.'
  width: 500
  height: 283
  matte: true
  p: '500'
  caption: 'Standards by Randall Munroe, xkcd (CC BY-NC 2.5)'
  captionHref: https://xkcd.com/927/
---

<!--
Post 2 of 3 in the series. Outline, not prose. Target ~1200 words, hard limit 2000.
Through line: TRUST. Organisational story; technical detail lives in
the foundations post, the agents work in the agents post.
Never name the company or the design system in this post, comment included.
Rules and sources: the series notes in docs/writing/.
[Brackets] = planned MDX components.
-->

[CaseMeta] Role: technical side of the design team · Timeline: February 2026 to present · Platforms: web, React Native · Focus: accessible foundations, testing, core components

## Context

- A large company with product teams in markets around the world, plus a central team
- Plenty of design systems already existed: some built centrally, some federated, some local; some over a decade old and no longer maintained
- Most were built for the needs of a few teams, and most lived in Figma files that every team implemented its own way
- Ours is the first system meant for the whole company, and the first with a shared React library
- Goal: one standard for design and accessibility, with WCAG 2.2 AA required by law
- I joined the design team in February 2026 to work on the technical side

## The problem

- The new system was one more competing standard (refer back to the lead image)
- Markets didn’t need persuading that design systems were good. The usual answer was “we love design systems, we’ve already got one”
- Nobody wanted to go first: teams wouldn’t switch until the new system matched what they already had, and it couldn’t prove it was ready for production until someone used it
- [Callout: problem] A new design system only wins if using it costs a team less than building their own. The real job wasn’t building components, it was earning trust

## Impact

- [StatGroup] 18 releases in nine months, each with release notes · 100+ components across web and React Native (TODO: confirm) · an external accessibility audit found only a handful of minor issues, fixed in days · a page migrated in under 20 minutes from one prompt (→ agents post)
- [Steps] Three ways to adopt: design only → tokens and pipeline → React components
- The turning point: once we started talking about the token package, the system went from a few teams trying it out to widespread adoption
- Each level builds the trust needed for the next

## How the system earned trust

<!-- Four short sections. Each: what teams worried about → what we did → evidence. -->

### Built to last

- Teams had seen systems go unmaintained, so the foundations had to look like a safe long-term bet
- React Aria as the accessible base layer: backed by Adobe, which stakeholders brought up in meetings unprompted; the most thoroughly accessibility-tested option; i18n, RTL and date handling built in
- The alternatives looked riskier over the long term: Radix development was slowing, and Base UI had momentum but no track record yet
- [Callout: impact] The external accessibility audit: a handful of minor issues, all patched within days
- Every decision recorded, so the system doesn’t depend on who happens to be on the team (→ foundations post)

### Predictable releases

- Semantic versioning: teams know what a version number means before they upgrade
- A release roughly every two weeks, each with release notes
- New components start in a labs tier and are promoted to stable once design and engineering are happy, so “stable” means something

### Working in the open

- A support channel that teams actively use: we’re here to serve, not to police (TODO: one example of a question that changed the system)
- Designers had seen their work drift once it was built. Visual regression on every PR means whatever they sign off stays as signed off
- [PullQuote] “We’re not the design system police”

### Adoption at your own pace

- Tokens were always a separate package from the components, so teams can adopt one level at a time
- Opinionated where consistency matters: a Stepper takes a `steps` array so the markup is always right; an InlineAlert picks its icon from its variant
- Flexible where teams need room: a flexible Card, plus approved patterns such as ArticleCard and PromoCard (→ opinionated vs composable)

## What I’d do differently

- [Callout: learning] **Talk to consumers first.** We learned how many local systems there were only after three months building the MVP. Smaller releases with earlier feedback earn trust faster than a complete system nobody has used yet
- [Callout: learning] **Decide early what’s fixed and what’s flexible.** An icon should look the same everywhere, but large components need room. Agree the line with designers up front
- [Callout: learning] **Pitch the first step, not the whole system.** The ladder existed from day one, but we sold the full component set. Leading with tokens would have given teams an easier way in

Previously: [Laying the foundations for a global design system](/writing/design-system-foundations), the technical decisions underneath all of this. Next: [Teaching agents to build with the system](/writing/teaching-agents-to-build-with-neo).
