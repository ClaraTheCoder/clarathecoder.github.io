# Writing about Neo

Notes for writing the Neo posts, for Clara and any agent helping her. This repo is public, so these notes give rules, not the private reasons behind them.

## The series

| Order | File                 | Slug                                | Date        | What it is                                                                     |
| ----- | -------------------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------ |
| 1     | `neo-foundations.md` | `design-system-foundations`         | 23 Nov 2026 | Technical: the decisions under Neo, and why they held up                       |
| 2     | `neo-trust.md`       | `one-more-competing-standard`       | 30 Nov 2026 | Organisational: winning over teams that already had a design system            |
| 3     | `neo-for-agents.md`  | `teaching-agents-to-build-with-neo` | 7 Dec 2026  | General how-to: making a design system readable by agents, and benchmarking it |

- The posts are in `apps/site/src/content/writing/`. Each opens with an HTML comment covering its purpose, length and through line. Those comments are public too, so keep them to editorial notes.
- The order comes from the dates: the article pager follows them. Each post must also stand alone.
- All three have `series: neo`, which the work page lists, and `draft: true` until they're published. Drafts only appear under `pnpm dev`, along with the unlinked `/writing/drafts` page.
- The outlines are bullet points, not prose. `[Brackets]` mark planned MDX components (`CaseMeta`, `Callout`, `StatGroup`, `PullQuote`, `Steps`, `Figure`).
- Length: about 1,200 words for posts 1 and 2, and up to 2,000 for post 3. Never more than 2,000.

Principle posts that cite Neo but are about ideas, not Vodafone: `opinionated-vs-composable.md`, `context-aware-components.md`, `adoption-ladders.md`, `video-in-html.md`. These are undated drafts.

## Rules

- **Story over detail.** Each post needs a coherent shape; drop anything that doesn't serve it. Clara's answers in interviews can run long, so distil them hard.
- **Tone: positive.** The project was a success. Frame anything that went wrong as a lesson, never a failure, and never anyone's fault.
- **People.** Don't name or credit colleagues, including where a source document names them; write Clara's own work as “I”. Don't call Clara the first or only engineer. The agreed wording is that she “joined the design team to work on the technical side” and made the early engineering decisions (React Aria, the testing strategy, Button and form fields).
- **Leave out:** unannounced plans, releases and milestones; anything about Clara's terms of engagement; costs or prices from the benchmark.
- **Audience:** people who know design systems but not Vodafone. Drop internal jargon: say “local markets” and “the central team”, never Vodafone's own names for them.
- **Adoption, honestly:** there are three levels (design only → tokens and pipeline → React components), and teams have taken up tokens much more than components. Present it as a ladder where each level builds trust for the next, not as full adoption. Talking up the token package was the turning point to widespread adoption.

## Through lines

- **Foundations:** decisions that outlast the people who made them.
- **Trust:** Neo was one more competing standard (xkcd 927) in a company full of systems, many of them unmaintained. It earned trust by being built to last (React Aria, the audit), predictable (semver, regular releases with notes, labs → stable), open (a support channel, visual regression for designers), and adoptable at your own pace (the ladder, opinionated where it matters).
- **Agents:** you can test real models against your design system's agent tooling instead of guessing or taking experts' word for it. The benchmark matters as much as the docs. End with “What's next”: an MCP server, which adds checking, discovery, smaller context and feedback on top of plain files.

## Sources

Sibling checkouts next to this repo:

- `../neo-design-system`: the library. ADRs are in `docs/decisions/`; Clara wrote 0012, 0013, 0017, 0018, 0021, 0036, 0045, 0046, 0048 and 0049. Release notes are in `packages/design-system-web/CHANGELOG.md`.
- `../neo-design-system-website`, branch `feat/agent-benchmark`: the agent benchmark. See `README.md`, `docs/test-plan.md`, `docs/scoring.md`, `docs/findings.md` and `results/`. Neo 0.18.0 shipped the fixes it found. The headline run is `c-opus-xhigh-neo018-1`: a page migrated in 19m 31s from one prompt, using 27 stable Neo components and no hard-coded colours.

## Still to find out (marked TODO in the outlines)

- Component count across web and React Native
- One example of a support-channel question that changed the system
- Clara's part in the token work
- Why class-name assertions were banned in tests
- The ADR count to quote
