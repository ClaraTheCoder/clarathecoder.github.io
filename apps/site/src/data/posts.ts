import { getCollection, render, type CollectionEntry } from 'astro:content';

export interface TocEntry {
  id: string;
  label: string;
}

type PostData = CollectionEntry<'writing'>['data'];

export interface Post extends Omit<PostData, 'slug'> {
  slug: string;
  readingTime: number;
  /** Optional per ADR of this wireframe: present → the article rail shows a
   *  sticky Contents list; omitted → the rail carries meta only. */
  toc?: TocEntry[];
  Content: Awaited<ReturnType<typeof render>>['Content'];
}

export type PostVideo = NonNullable<PostData['video']>;
export type DatedPost = Post & { date: string };

const WORDS_PER_MINUTE = 200;

/** Drafts are listed and built under `astro dev` only. */
const SHOW_DRAFTS = import.meta.env.DEV;

const entries = await getCollection('writing', ({ data }) => SHOW_DRAFTS || !data.draft);

/** Every post that gets a page. */
export const ALL_POSTS: Post[] = await Promise.all(
  entries.map(async (entry) => {
    const { Content, headings } = await render(entry);
    return {
      ...entry.data,
      slug: entry.id,
      readingTime: Math.max(1, Math.round((entry.body ?? '').split(/\s+/).length / WORDS_PER_MINUTE)),
      toc: headings
        .filter((heading) => heading.depth === 2)
        .map((heading) => ({ id: heading.slug, label: heading.text })),
      Content,
    };
  }),
);

/** Dated posts, newest first: the writing list and the article pager. */
export const POSTS: DatedPost[] = ALL_POSTS.filter((post): post is DatedPost => Boolean(post.date)).sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Drafts for the dev-only drafts page: dated ones newest first, then undated ones by title. */
export const DRAFTS: Post[] = ALL_POSTS.filter((post) => post.draft).sort(
  (a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.title.localeCompare(b.title),
);

/** A series' dated posts in reading order, oldest first. */
export const postsInSeries = (series: string): DatedPost[] =>
  POSTS.filter((post) => post.series === series).reverse();

export const formatDate = (iso: string, { year = true } = {}): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(year && { year: 'numeric' }),
  });

export const postsByYear = (posts: DatedPost[]): [string, DatedPost[]][] => {
  const groups = new Map<string, DatedPost[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups];
};
