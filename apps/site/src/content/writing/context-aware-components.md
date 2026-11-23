---
title: Components that read their context
draft: true
description: 'Flexible inside the system, tight at the API: composing components that adapt to where they’re used'
---

<!-- Principle post. Notes only. -->

- MenuList works on its own as a plain list, wraps itself in the default branded Popover inside a MenuListTrigger, and skips the wrap if you supply your own Popover
- How it works: it reads two contexts (am I inside a trigger? am I already inside a popover?). The trigger never inspects its children, so a custom Popover simply wins without special-casing element types
- Prior art: React Spectrum’s Menu / InPopoverContext
- Internal primitives (Neo ADR 0036): shared building blocks such as field chrome, messages and listbox rows live in `_internal/`, are flexible inside the system, are never exported, and carry no semver burden
- Higher-order components (TextField, Select, PhoneNumberField) present a tight API to consumers
- Semantics drive the split: listbox vs menu share a presentational row but not ARIA roles
- Trade-offs: context is invisible at the call site, so it needs documenting and tests
