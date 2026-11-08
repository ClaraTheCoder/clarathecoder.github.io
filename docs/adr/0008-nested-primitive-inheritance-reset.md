# 8. Nested layout primitives reset inherited responsive rungs

- Status: Accepted
- Date: 2026-11-08

## Context

The hybrid layout engine (ADR 0002) carries responsive layout values on inline custom properties that a utility class reads through a per-breakpoint `var()` fallback chain. Custom properties inherit, so a nested primitive inherits an ancestor's breakpoint rung and the chain never reaches the child's own value: `<Grid columns={2}>` inside `<Grid columns={{ initial: 1, md: 12 }}>` renders as twelve columns at ≥1024px, not two. The only workaround was to restate the prop at every covering breakpoint on every nested primitive — unenforced and easy to forget.

## Decision

Make every primitive an inheritance boundary. Box, Flex, and Grid carry a shared, style-free `.box` marker, and the token build emits one `:where(.box) { … }` rule declaring every arbitrary custom property — base rung plus each breakpoint rung — to `initial` (the guaranteed-invalid value). An unset rung on a child then reads invalid and the `var()` chain falls through to the child's own value. Rungs the child _did_ set are inline, which outrank the reset, so the within-primitive fall-to-nearest-smaller-rung behaviour is preserved and only inherited values are masked. The rule is generated from the same prop and breakpoint lists as the utilities, so the two can't drift; `:where()` keeps it at specificity 0.

## Consequences

- Nesting just works — no per-usage workaround, and the fix stays in sync with the prop list automatically.
- Layout custom properties no longer inherit _through_ a primitive at all (the intended semantics); code that deliberately relied on that must now set the value explicitly.
- ~190 custom-property declarations land on every primitive's computed style. The cost is volume, not correctness.
