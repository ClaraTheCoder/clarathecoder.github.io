import type { MarkdownInstance } from 'astro';

export interface TocEntry {
  id: string;
  label: string;
}

export interface PostVideo {
  label: string;
  poster: string;
  captions: string;
  transcript?: string;
  sources: { src: string; media?: string }[];
}

export interface Post {
  slug: string;
  date: string;
  title: string;
  description: string;
  readingTime: number;
  /** Optional per ADR of this wireframe: present → the article rail shows a
   *  sticky Contents list; omitted → the rail carries meta only. */
  toc?: TocEntry[];
  Content: MarkdownInstance<PostFrontmatter>['Content'];
  video?: PostVideo;
}

interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  video?: PostVideo;
}

const WORDS_PER_MINUTE = 200;

const posts: Post[] = Object.entries(
  import.meta.glob<MarkdownInstance<PostFrontmatter>>('../content/writing/*.md', { eager: true }),
).map(([path, md]) => ({
  slug: path.split('/').pop()!.replace(/\.md$/, ''),
  ...md.frontmatter,
  readingTime: Math.max(1, Math.round(md.rawContent().split(/\s+/).length / WORDS_PER_MINUTE)),
  toc: md
    .getHeadings()
    .filter((heading) => heading.depth === 2)
    .map((heading) => ({ id: heading.slug, label: heading.text })),
  Content: md.Content,
}));

export const POSTS: Post[] = posts.sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string, { year = true } = {}): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(year && { year: 'numeric' }),
  });

export const postsByYear = (posts: Post[]): [string, Post[]][] => {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups];
};
