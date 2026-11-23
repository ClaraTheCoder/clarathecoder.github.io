---
title: Opinionated or composable? Drawing the line in a component API
slug: opinionated-or-composable
draft: true
description: 'When to lock a component down with props, and when to hand consumers the pieces'
---

<!-- Principle post. Neo as an example, not the subject. Notes only. -->

- Two camps: prop-driven, locked-down APIs (consistency, guaranteed semantics) vs composable children (flexibility, unanticipated use cases)
- Locked down done well: a Stepper that takes a `steps` array, so the list semantics can’t be wrong; an InlineAlert whose icon follows its variant; icons that must be labelled or hidden
- Where locked down breaks: Cards and ListItems. You can’t anticipate every use case in large components
- The middle path: a flexible base component plus approved patterns (ArticleCard, PromoCard) with a few custom props
- Other systems were proud of their flexibility and saw opinionated as a negative. Both are right, for different components
- A rule of thumb: the smaller and more universal the component, the more opinionated it can be
- People and agents differ: give people flexibility with guidance, and give agents firm guardrails
- “We’re not the design system police”: enforcement is worthless if nobody adopts the system
