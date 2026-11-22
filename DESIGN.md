---
name: Clara's Site
description: One token architecture wearing three looks — Default, Blueprint and Opal — for a personal site that wants to be poked.
colors:
  cream-ground: 'oklch(0.971 0.006 58)'
  ink: 'oklch(0.32 0.0045 120)'
  ash: 'oklch(0.41 0.005 120)'
  stone-rule: 'oklch(0.833 0.0045 120)'
  stone-strong: 'oklch(0.505 0.0055 120)'
  lavender: 'oklch(0.44 0.213 293)'
  lavender-deep: 'oklch(0.271 0.079 293)'
  lavender-dusk: 'oklch(0.378 0.166 293)'
  lavender-night: 'oklch(0.242 0.024 293)'
  saffron-wash: 'oklch(0.936 0.023 58)'
  saffron-glow: 'oklch(0.714 0.14 58)'
  saffron-light: 'oklch(0.796 0.117 58)'
  celadon: 'oklch(0.58 0.0888 172)'
  celadon-bright: 'oklch(0.68 0.0945 172)'
  paper: 'oklch(0.98 0 0)'
  white: '#ffffff'
  graphite: 'oklch(0.255 0.0035 120)'
  carbon: 'oklch(0.195 0.003 120)'
  viridian: 'oklch(0.502 0.145 150)'
  vermilion: 'oklch(0.502 0.205 20)'
  cerulean: 'oklch(0.54 0.225 262)'
typography:
  display:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 'clamp(4.5rem, 2.5rem + 8vw, 9rem)'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: '-0.02em'
  headline:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 'clamp(2.5rem, 2rem + 2.5vw, 4rem)'
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: '-0.01em'
  title:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 'clamp(1.5rem, 1.375rem + 0.625vw, 1.875rem)'
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: '0em'
  lead:
    fontFamily: "'Nunito Variable', ui-rounded, sans-serif"
    fontSize: 'clamp(1.25rem, 1.1667rem + 0.4167vw, 1.5rem)'
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Nunito Variable', ui-rounded, sans-serif"
    fontSize: 'clamp(1rem, 0.9583rem + 0.2083vw, 1.125rem)'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Nunito Variable', ui-rounded, sans-serif"
    fontSize: 'clamp(0.8125rem, 0.7917rem + 0.1042vw, 0.875rem)'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '0.08em'
  code:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: 'clamp(1rem, 0.9583rem + 0.2083vw, 1.125rem)'
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: '2px'
  md: '12px'
  lg: '26px'
  full: '999px'
spacing:
  '25': '1px'
  '50': '2px'
  '100': '4px'
  '150': '6px'
  '200': '8px'
  '300': '12px'
  '400': '16px'
  '500': '24px'
  '600': '36px'
  '700': '48px'
  '800': '60px'
  '900': '72px'
components:
  button-primary:
    backgroundColor: '{colors.lavender}'
    textColor: '{colors.paper}'
    rounded: '{rounded.full}'
    padding: '0 16px'
    height: '48px'
  button-primary-hover:
    backgroundColor: '{colors.lavender-deep}'
  button-fixed:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.graphite}'
    rounded: '{rounded.full}'
    padding: '0 16px'
    height: '48px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    padding: '0 16px'
    height: '48px'
  surface:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
  radio-card:
    backgroundColor: '{colors.cream-ground}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '16px'
  link:
    textColor: '{colors.lavender}'
  link-hover:
    textColor: '{colors.lavender-deep}'
  link-plain:
    textColor: '{colors.ink}'
  link-plain-hover:
    textColor: '{colors.lavender}'
---

# Design System: Clara's Site

## Overview

**Creative North Star: "The Magician's Hat"**

One hat, endless tricks. Every page is the same structure — the same token tiers, components, spacing and motion — and the visitor reaches in and pulls out a different world: the warm, bookish **Default**; the strong, technical, precise **Blueprint**; the polished but friendly **Opal**. The magic is that nothing underneath changes. Swapping `data-preset` and `data-theme` (ADR 0004) re-dresses the whole site in one move, and the reveal is animated so the trick lands.

Each preset is a complete world in its own right, not a skin over Default. Presets are partial, override-only layers in the token build, but what they override — colour, type families, case, radius, depth, backdrop, entrance distance — is chosen so each one has a distinct personality. Everything should feel fun, a little magical, and worth poking: components spring, nudge and press back.

Density is relaxed. Content sits in a prose measure (68ch) or a 12-column grid with a fluid gutter, with plenty of air above and between blocks. Type is fluid (`clamp()` everywhere) rather than stepping at breakpoints (ADR 0007).

**Rejected:** the generic SaaS/template look — centred hero, three feature cards, gradient call-to-action. If a page could belong to any startup, it has drifted.

**Key Characteristics:**

- Three named presets × light/dark, all driven by the same semantic and component tokens.
- Each preset owns its type pairing, corner language and depth model.
- Springy, pokeable components with press-scale, nudging arrows and spring-in overlays.
- Fluid typography and spacing; no hard-coded values anywhere.
- Native HTML interactive components that work without JavaScript.

### The three looks

- **Default — warm and bookish.** Warm cream ground, neutral ink, lavender accent (saffron in dark mode, on lavender night). Fraunces serif headings over rounded Nunito body. Flat white surfaces with 12px corners, pill buttons.
- **Blueprint — strong, technical, precise.** Neutral paper ground, graphite ink, celadon accent. Saira Condensed headings, bold and uppercase with wide tracking; JetBrains Mono for every text role. 2px corners. A faint accent-tinted 36px grid backdrop; surfaces get an accent outline and soft accent glow. Entrances fade in place with no travel.
- **Opal — polished but friendly.** Neutral paper ground under a slowly drifting, rotating aurora (lavender, fuchsia, cerulean, celadon). Frosted-glass surfaces: translucent white, 30px blur, inner top highlight and a deep soft drop shadow. All-Nunito type with tight tracking; 26px corners. The accent is near-black ink, so the aurora supplies the colour.

**The Reading Default Rule.** Default is the landing look and the look for reading: someone arriving on an article should be able to just read. Default can become more distinctive, but never by adding distraction. No backdrop, ambient motion or decoration competes with the text; showier ideas belong in Opal or Blueprint.

## Colors

Colour comes from a named primitive palette of 13-step OKLCH ramps; semantic roles pick from them per preset and per mode, so components only ever see roles (`--color-accent`, `--color-surface`), never raw hues.

### Primary

- **Lavender** (`lavender`, lavender 800): Default's accent in light mode — links, primary buttons, the wordmark dot, year rules, testimonial marks and names. Deepens to **Lavender Deep** (lavender 900) on hover.
- **Saffron Wash** (`saffron-wash`): Default's subtle accent fill in light mode.
- **Saffron Glow** (`saffron-glow`, saffron 500): Default's accent in dark mode, lifting to **Saffron Light** on hover, so it reads on lavender night. **Lavender Dusk** (lavender 850) is the dark-mode subtle fill.

### Secondary

- **Celadon** (`celadon`, celadon 700; **Celadon Bright**, celadon 600, in dark mode): Blueprint's accent. Also drives the grid-backdrop lines (8% mix) and the surface glow (30%/28% mixes).

### Tertiary

- **Opal ink** (black at 80% alpha, hover 60%): Opal's accent. Deliberately colourless — the aurora backdrop is Opal's colour.

### Neutral

- **Cream Ground** (`cream-ground`, saffron 100): Default's light page background — warm, not white.
- **Ink** (`ink`, neutral 800): Default's light text. Text is neutral, not lavender-tinted.
- **Ash** (`ash`): muted text. Subtle text is the text colour at 55% (a `color-mix`), so it stays in each world's own ink.
- **Stone Rule** / **Stone Strong**: borders and strong borders (also the focus-ring colour), in every preset.
- **Lavender Night** (`lavender-night`): Default's dark-mode background and surface.
- **Paper** (`paper`): Blueprint and Opal light background; text-on-colour in light mode.
- **Carbon** (`carbon`, neutral 950): Blueprint and Opal dark background.
- **White** (`white`): Default's raised surface.
- **Graphite** (`graphite`): Blueprint and Opal text.

### Status

**Viridian** (success), **Vermilion** (danger), **Cerulean** (info) and Saffron 600 (warning), each with hover and subtle-fill steps.

### Named Rules

**The Kanto Rule.** Every primitive hue is named after a Kanto town from Pokémon — Lavender, Saffron, Celadon, Cerulean, Viridian, Vermilion, Fuchsia. A new hue gets a new Kanto town name, never a generic `blue`/`green`.

**The Roles-Only Rule.** Components read semantic or component tokens, never a primitive ramp step. The one sanctioned exception is a preset's own backdrop (the Opal aurora), which mixes primitives directly.

**The Override-Only Rule.** A preset may only override tokens the default theme already defines; the token build fails otherwise (ADR 0003/0004).

## Typography

**Default:** Fraunces (display/headings, 500–600) with Nunito Variable (body, lead, labels).
**Blueprint:** Saira Condensed (headings, 700, uppercase, +0.04em) with JetBrains Mono (all text roles).
**Opal:** Nunito Variable throughout — 400 at display sizes with −0.03em tracking, 700 for headings.
**Code:** system monospace in Default and Opal; JetBrains Mono in Blueprint.

**Character:** Default pairs a soft, bookish serif with a rounded, friendly sans — a well-loved notebook. Blueprint is a spec sheet: condensed caps over monospace. Opal is a single smooth sans, polished and approachable.

### Hierarchy

Roles are responsive composites exploded into per-property custom props (`--text-<role>-font-size`, etc., ADR 0007). Presets swap families, weights, tracking and case; sizes are shared.

- **Display 1 / 2** (Fraunces 500, size 1000 / 900, 1.0 line-height, −0.02em): hero titles only.
- **Heading 1–6** (Fraunces 600, sizes 800 → 300, 1.15 line-height; H1 −0.01em): section and component headings.
- **Lead** (Nunito 400, size 400, 1.55): hero intro paragraphs.
- **Body** (Nunito 400, size 200, 1.65): running text, set in a 68ch measure.
- **Body Small / Caption** (Nunito 400, size 100): secondary detail.
- **Overline** (Nunito 600, size 100, +0.08em, uppercase): small labels; Blueprint widens to +0.18em.
- **Code** (mono 400, size 200, 1.55).

### Named Rules

**The Shared Scale Rule.** Presets change _how_ type looks, never _how big_ it is. Size steps are global so layout is identical across worlds.

**The Eager Fonts Rule.** Every preset's faces are self-hosted and loaded up front, only in the weights the roles use, so switching worlds never flashes a fallback.

## Layout

- **Containers:** page container up to 1820px; prose container 68ch. Both use a fluid gutter, `clamp(16px, 5vw, 72px)`.
- **Grid:** 12 columns on large screens, collapsing to a single column on small. Pages place content across column spans rather than centring everything: Work hangs its case-study heading in a pinned rail (columns 1–4, sticky from 1280px) beside content in 5–12.
- **Hero:** left-aligned, prose-width, widening to the full content width at 1280px+. Its children enter with a staggered rise.
- **Breakpoints:** 768px (roomier header), 1024px, 1280px (12-column placements, wide testimonial).
- **Rhythm:** a 4px-based space scale (1px → 72px). Vertical gaps between blocks come from the role's paragraph-spacing token in prose.
- **Lists:** writing posts and Work's principles are ruled rows: hairlines between rows, generous 36px padding, everything stacked in one column.

## Elevation & Depth

Each preset owns its depth model; it is part of what makes a world.

- **Default: flat.** No shadows, no blur. Surfaces separate from the cream ground by being white with a stone-rule border.
- **Blueprint: glow.** Surfaces have an accent border plus `0 0 0 1px` accent at 30% and an 18px accent glow at 28%. The grid backdrop sits behind everything.
- **Opal: glass.** Translucent white surfaces (40%, 60% on hover) with `blur(30px) saturate(2)` and a white 60% border. Two shadows: a deep soft lift for panels (`0 22px 48px -24px rgba(12,18,40,0.6)` plus a 1px inset white highlight) and a tight one for buttons and thumbs (`0 4px 12px -4px` black 40% plus the highlight).

### Named Rules

**The Depth-Is-Preset Rule.** Never add a shadow or blur in component CSS. Components read `--color-surface-shadow`, `--color-surface-shadow-tight` and `--color-surface-backdrop`; the preset decides whether those are `none`, glow or glass.

## Shapes

Corners are a preset decision, set through `--surface-radius` and `--button-radius`:

- **Default:** soft 12px surfaces, full pill buttons.
- **Blueprint:** sharp 2px everywhere — surfaces, buttons, controls.
- **Opal:** generous 26px surfaces, pill buttons.

Nested radii subtract their padding. Borders are 1px. Links are underlined with a 0.15em offset.

## Components

The feel is **springy and pokeable**: every interactive thing gives a small physical reward when touched, and every reward has a reduced-motion fallback.

### Buttons

- **Shape:** pill in Default and Opal, 2px in Blueprint. Sizes sm/md/lg/xl (36/48/72/120px tall); icon-only buttons are square. Below 480px, md buttons tighten their inline padding from 16px to 12px.
- **Primary:** accent fill with text-on-colour in Default and Blueprint. In Opal it becomes a glass chip — surface fill, text colour, tight shadow, backdrop blur.
- **Fixed:** light fill with dark text that stays the same across modes, for buttons sitting on imagery or video. Opal makes it smoked glass (white 10%, white 30% border).
- **Ghost:** transparent, with a 5% black wash on hover; used for nav items, where `aria-current="page"` holds the hover fill.
- **Feedback:** colour changes over 150ms; the button presses down to 0.97 scale on `:active`; trailing arrows nudge 4px right on hover/focus (fine pointers only).
- **Focus:** 2px outline in the strong border colour at 2px offset; the shadow is removed while focused.

### Wordmark

"clara.place" in the header: Fraunces 600 in the text colour (the `text.brand` role, size 500, stepping down on small phones), with the dot drawn as a circle in the world's accent colour, so the mark is the one part of the identity that changes with the theme (lavender in Default light, saffron in Default dark, celadon in Blueprint, ink in Opal). A visually hidden "." inside the mark keeps the name intact for screen readers and raw mode.

The favicon is the dot alone, in Default's accents: `apps/site/public/favicon.svg` (lavender 800, saffron 500 when the browser is dark) and a 180px `apple-touch-icon.png` with the lavender dot on lavender 50 (the page ground is now cream, saffron 100; regenerate the touch icon if that matters). SVG favicons can't read tokens, so they carry hex conversions; keep them in step if Default's accent changes.

### Dialog

- Native `<dialog>`, prose width, with the surface's radius, border, shadow and backdrop. The frame slims from 36px to 12px padding below 480px.
- **Opening:** springs up from 16px below at 0.9 scale using the spring easing over 500ms. **Closing:** a quick 150ms fade. The backdrop is 60% black (Opal: 10% black with an 8px blur, and an 85% bg-tinted panel).
- `DialogClose` is a ghost button; the theme picker uses it icon-only in the header.

### Radio Cards

- Native radios in a `fieldset`, two columns at every width. Each radio is wrapped by its card's `label`, so the whole card is the control and arrow keys move the selection.
- A card is a small page: background, border, corner radius and surface shadow all come from the tokens in scope on it. Title in the heading-3 face at heading-4 size (heading-5 in narrow cards), optional muted description. The native radio sits top-right, restyled as a ring in the strong border colour that fills with the scope's accent and springs in a dot when checked; in narrow cards it moves above the title.
- Selection is a 2px ring in the **page's** strong border colour, captured on the group so it reads the same on every card. Focus pushes the ring out to 6px. Cards press to 0.97 on `:active`.
- **Signature use, the theme picker:** each card carries its own `data-preset` and mirrors the page's `data-theme`, so it renders in its own world (ADR 0010): Default with a lavender radio, Opal glass over a mini aurora, Blueprint on grid paper in celadon. The No CSS card wears browser defaults (Times, system colours, the native radio).
- **Raw mode:** a hidden separator turns each card into one readable radio line ("Default – Good for reading").

### Image

A framed picture at a fixed `ratio` (any CSS aspect ratio; default a wide 16 / 7.5) with medium corners. Empty, it is a dashed placeholder on the surface colour with a muted label, for layouts waiting on a photo. Holding an `<img>`, it crops the picture to the ratio with `object-fit: cover` and drops the dashed border.

### Video

A native `<video>` whose controls a small custom element covers with the poster and a fixed play button until first play, or until keyboard focus reaches the video. Without JavaScript the native controls show as normal. Captions are a required `<track>`, shown by default; a video with only music gets a single cue naming it. An optional transcript is a link below the video to a page holding the full text.

### Notice

A surface-coloured strip in muted text that turns to full text colour on hover. Used for the availability line.

### Post list

Posts grouped under a Ruled heading (a year on Writing; later "Recent writing" or "A few faves" on Home). Each row is spacious (36px padding, hairline rule between rows): a heading-4 title balanced to two lines, a muted description, then the date and reading time small and subtle underneath. Titles are plain links in ink that take the accent on hover (Opal: underline); the whole row is the click target, and the link's accessible name stays the title.

### Ruled heading

A heading followed by a 2px accent rule running to the right edge. Heading-3 by default; Work uses heading-2 for its section headings. The brand's section marker, shared by Writing and Work.

### Disclosure

A list of statements that each open to their detail, built on native `<details>`, so it works in raw mode. Hairlines above each row and below the list; a title in heading-3 type (a span, not a heading, so the summary stays one line in raw mode) on the left that takes the accent on hover, and an accent plus on the right that turns to a cross when open. The body sits at prose measure. Used for the principles in Work's How I work.

### Testimonial

A quote in the heading-2 role, with key phrases wrapped in `<strong>` shown in full text colour and the rest at 55% of the text colour, so the muted words stay in the world's own ink rather than grey. Two oversized quote marks (twice display size) in the display face and accent colour: the opening mark above the quote, the closing mark on the right of the attribution row. The name is in the heading-4 role; the role and company sit below on separate lines in subtle text. There is no avatar.

**Wide:** from 1280px the testimonial lays itself on the page's 12 columns (CSS subgrid) at the heading-1 role: the opening mark alone at the top of columns 1–2, the quote in 3–11 and the attribution in 3–10, the closing mark at the right edge. Below 1280px it is the stacked default. Work uses it full-width after the case study.

### Signature: preset backdrops

- **Opal aurora:** four radial gradients blurred 90px and saturated 3×, drifting over 20s, shifting hue over 30s, all inside a 120s rotation. Rendered on white in light mode and on a darkened bg in dark mode.
- **Blueprint grid:** 1px accent lines every 36px at 8% strength.

### Motion vocabulary

- **Entrance:** rise from 8px (Blueprint 0, Opal 16px) over 600ms using the out-easing, with a 150ms lead and 80ms stagger. Reduced motion uses a 200ms fade.
- **Theme change:** 600ms in-out — the trick's reveal.
- **Attention:** a ring that pulses out to 1.6× over 2s.

## Do's and Don'ts

### Do:

- **Do** keep Default calm enough to read an article in; push distinctiveness into other themes (The Reading Default Rule).
- **Do** read every styled property from a token custom property. No literal values in component CSS (ADR 0002).
- **Do** let the preset decide radius, depth, backdrop and type family. Components consume `--surface-*`, `--button-*` and `--color-surface-*` roles.
- **Do** describe each preset by its own personality when extending it: Default warm and bookish, Blueprint strong, technical and precise, Opal polished but friendly.
- **Do** give every interactive component a physical response (press, nudge, spring) and a `prefers-reduced-motion` fallback.
- **Do** build interactive pieces on native elements (`<dialog>`, radio inputs) so they work without JavaScript (ADR 0009).
- **Do** name new primitive hues after Kanto towns.

### Don't:

- **Don't** add backdrops, ambient motion or decoration to Default.
- **Don't** drift into the generic SaaS/template look: centred hero, three feature cards, gradient call-to-action.
- **Don't** hard-code a shadow, blur or radius in a component; that breaks the Depth-Is-Preset Rule.
- **Don't** change type _sizes_ per preset; only families, weights, tracking and case.
- **Don't** reference a primitive ramp step from a component (`--color-saffron-700`); use the semantic role.
- **Don't** add a preset token the default theme doesn't define; the build rejects it.
