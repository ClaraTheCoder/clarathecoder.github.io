import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** “Earning trust when you’re…” → `earning-trust-when-youre`. */
const slugify = (title: string): string =>
  title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const writing = defineCollection({
  // The slug comes from the title, so a title change moves the URL. Set
  // `slug` in the frontmatter to pin it once a post is published.
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/writing',
    generateId: ({ data }) => (data.slug as string | undefined) ?? slugify(data.title as string),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    /** Undated drafts get a page but stay out of the list and the pager. */
    date: z.coerce
      .date()
      .transform((date) => date.toISOString().slice(0, 10))
      .optional(),
    /** Drafts only exist under `astro dev`. */
    draft: z.boolean().default(false),
    /** Groups a case study's posts, e.g. on the work page. */
    series: z.string().optional(),
    video: z
      .object({
        label: z.string(),
        poster: z.string(),
        captions: z.string(),
        transcript: z.string().optional(),
        sources: z.array(z.object({ src: z.string(), media: z.string().optional() })),
      })
      .optional(),
  }),
});

export const collections = { writing };
