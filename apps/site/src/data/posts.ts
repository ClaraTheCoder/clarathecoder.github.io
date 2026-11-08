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
  /** Optional per ADR of this wireframe: present → the article rail shows a
   *  sticky Contents list; omitted → the rail carries meta only. */
  toc?: TocEntry[];
}

export const POSTS: Post[] = [
  {
    slug: 'nam-libero-tempore',
    date: '2026-11-02',
    title: 'Nam libero tempore cum soluta',
    description: 'Soluta nobis est eligendi optio cumque nihil impedit quo minus.',
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
    title: 'Itaque earum rerum hic tenetur',
    description: 'Tenetur a sapiente delectus reiciendis voluptatibus maiores alias.',
    // No toc — rail shows meta only.
  },
  {
    slug: 'maiores-alias-consequatur',
    date: '2026-07-07',
    title: 'Maiores alias consequatur aut',
    description: 'Aut perferendis doloribus asperiores repellat earum voluptatem.',
    toc: [
      { id: 'context', label: 'Context' },
      { id: 'approach', label: 'The approach' },
      { id: 'where-it-landed', label: 'Where it landed' },
    ],
  },
  {
    slug: 'temporibus-autem',
    date: '2026-04-21',
    title: 'Temporibus autem quibusdam',
    description: 'Et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
  },
  {
    slug: 'nam-libero-soluta',
    date: '2026-02-09',
    title: 'Nam libero tempore soluta nobis',
    description: 'Ut et voluptates repudiandae sint et molestiae non recusandae.',
  },
];

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
