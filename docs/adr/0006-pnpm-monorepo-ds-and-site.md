# 6. pnpm monorepo: design system and site

- Status: Accepted
- Date: 2026-10-27

## Context

The work splits naturally into two concerns: a reusable, themeable design system (components, tokens, and their documentation) and the personal site that consumes it. The design system is intended to stand on its own and be showcased independently, not to live as an inseparable part of the site.

## Decision

Use a single pnpm workspace with two packages: a design-system package (including its component workbench) and the site application that depends on it. They share one lockfile and tooling configuration, and the site consumes the design system as a workspace dependency.

## Consequences

### Positive

- The design system has a clear boundary and its own documentation surface, reinforcing that it is reusable rather than site-specific.
- The site always builds against the current design-system source, so changes are exercised immediately with no publish step.
- Shared tooling and a single lockfile keep linting, formatting, and dependency versions consistent across both packages.
- A second consumer — now or later — can be added to the workspace without restructuring.

### Negative

- Workspace mechanics add setup and a learning curve over a single flat project.
- Package boundaries must be respected deliberately; it is easy to let site-specific concerns leak into the shared package.
- One toolchain serves both packages, so a version bump affects everything at once, for better and worse.
- Until the design system is published, outside reuse still means consuming it from this repository.

## Alternatives considered

- **Single application, no separate package:** simplest to start, but blurs the boundary and makes the design system hard to extract or reuse later.
- **Separate repositories:** strongest isolation, but forces publish-and-bump cycles for every design-system change and splits the tooling.
- **A different workspace manager:** equivalent in concept; pnpm was chosen for its efficient linking and first-class workspace support.
