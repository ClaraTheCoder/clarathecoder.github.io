# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily Clara herself. The site is a personal home she wants to enjoy making and keeping up, not just a hiring funnel. It serves several audiences, peers are the priority:

- **Peers and readers**: design-systems and frontend people who come for the writing and the toys.
- **Friends and the curious**: people who want to see what she's up to (music, growing food, tinkering).
- **Hiring clients**: engineering/design leads and agencies considering Clara for contract design-system or product work.
- **Recruiters**: people hiring for permanent roles. She's open to these but isn't seeking them.

## Product Purpose

A personal site for Clara, a design-systems engineer and tech lead, built on her own design system (`@clara/design-system`). It exists to be fun, both to make and to visit, and to give her work, writing and interests one home. Finding work is a side effect, not the goal: she has several sources of incoming work. Success means the site feels like hers and she keeps wanting to add to it.

## Positioning

- **The site is the proof.** It runs on a design system she built herself, with DTCG tokens, two-axis theming and presets, and native-HTML interactive components. Visitors can see the craft in the thing they're using.
- **Design systems for the agentic era.** She has hands-on experience building systems for agentic development (Vodafone Neo).
- **Range.** She's a creative engineer with many interests (online tools and toys, music, growing food), not only a CV.

## Operating Context

- Pages: Home, Work (availability, ways to work, Vodafone Neo showreel), Writing (index plus article pages with an optional table of contents).
- Visitors can change the theme (light/dark) and preset (`blueprint`, `opal`) through a native `<dialog>` picker.
- Contact is by email (`example@example.com`), with LinkedIn and GitHub listed in `apps/site/src/data/site.ts`.
- The availability line is calculated from a lead time (`AvailableFrom.tsx`).

## Capabilities and Constraints

- Static Astro output deployed to GitHub Pages. React islands only where interactivity is needed (ADR 0001).
- Progressive enhancement: every page is fully readable with no JavaScript.
- Everything is token-driven. Components read semantic tokens only, with no hard-coded values (see CLAUDE.md and ADRs 0002–0009).
- She does contract work for clients and is open to the right permanent role.

## Evidence on Hand

- **Vodafone Neo**: public. The showreel, captions, poster and transcript are in `apps/site/src/assets/showreel/`. OK to name Vodafone and Neo.
- **Testimonials**: the Work page quote from Ashton Snook (Head of Design & Research, Vodafone Group) is real and approved for use. More real quotes are coming. Never invent quotes, names or roles.
- **Clients**: some past clients can't be named. Case studies about them stay anonymised or are left out. Never guess at or fill in client names.
- **Writing**: real articles are coming. `apps/site/src/data/posts.ts` is lorem ipsum layout scaffolding. Never present invented posts as real.
- The "ways to work" and "What I do" copy on the Work page is still placeholder text.
- Inspiration notes: `docs/inspo.md`.

## Product Principles

1. **Hers first.** When fun and personality compete with conversion polish, fun and personality win.
2. **The medium is the message.** Each page should show off the design system it runs on: theming, tokens and native components doing real work.
3. **Range over résumé.** Toys, music, growing food and writing sit alongside client work, not under it.
4. **Truthful by default.** Show only real work, quotes and clients. Placeholders stay obviously placeholders.
5. **Works without JavaScript.** Interactivity adds to the page but is never needed to read it.

## Accessibility & Inclusion

WCAG 2.2 AA, checked at component level (`eslint-plugin-jsx-a11y`, Storybook a11y addon). Video has captions and a descriptive transcript. Motion respects reduced-motion preferences.
