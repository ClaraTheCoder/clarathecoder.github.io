// Fake posts for the layout wireframe. One shared source so the home teaser
// list, the /writing archive, and the /writing/[slug] routes all agree and
// every link resolves. Content is lorem ipsum — structure only.

export interface TocEntry {
  id: string;
  label: string;
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
}

export const POSTS: Post[] = [
  {
    slug: 'nam-libero-tempore',
    date: '2026-11-02',
    title: 'Nam libero tempore cum soluta nobis est eligendi optio cumque',
    description: 'Soluta nobis est eligendi optio cumque nihil impedit quo minus.',
    readingTime: 8,
    toc: [
      { id: 'context', label: 'Context' },
      { id: 'approach', label: 'The approach' },
      { id: 'tradeoffs', label: 'Trade-offs' },
      { id: 'where-it-landed', label: 'Where it landed' },
    ],
  },
  {
    slug: 'itaque-earum-rerum',
    date: '2026-09-18',
    title: 'Itaque earum rerum hic tenetur a sapiente delectus reiciendis',
    description: 'Tenetur a sapiente delectus reiciendis voluptatibus maiores alias.',
    readingTime: 5,
    // No toc — rail shows meta only.
  },
  {
    slug: 'maiores-alias-consequatur',
    date: '2026-07-07',
    title: 'Maiores alias consequatur aut perferendis doloribus',
    description: 'Aut perferendis doloribus asperiores repellat earum voluptatem.',
    readingTime: 4,
    toc: [
      { id: 'context', label: 'Context' },
      { id: 'approach', label: 'The approach' },
      { id: 'where-it-landed', label: 'Where it landed' },
    ],
  },
  {
    slug: 'temporibus-autem',
    date: '2025-11-21',
    title: 'Temporibus autem quibusdam et aut officiis debitis rerum',
    description: 'Et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
    readingTime: 11,
  },
  {
    slug: 'nam-libero-soluta',
    date: '2025-02-09',
    title: 'Nam libero tempore soluta, nobis eligendi cumque impedit',
    description: 'Ut et voluptates repudiandae sint et molestiae non recusandae.',
    readingTime: 3,
  },
];

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
