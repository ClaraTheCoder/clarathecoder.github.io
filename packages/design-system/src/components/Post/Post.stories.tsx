import preview from '../../../.storybook/preview';
import { Post, PostList } from './Post';

const POSTS = [
  {
    meta: '2 Nov · 8 min read',
    title: 'Nam libero tempore cum soluta',
    href: '#',
    description: 'Soluta nobis est eligendi optio cumque nihil impedit quo minus.',
  },
  {
    meta: '18 Sept · 5 min read',
    title: 'Itaque earum rerum hic tenetur',
    href: '#',
    description: 'Tenetur a sapiente delectus reiciendis voluptatibus maiores alias.',
  },
  {
    meta: '7 Jul · 4 min read',
    title: 'Maiores alias consequatur aut',
    href: '#',
    description: 'Aut perferendis doloribus asperiores repellat earum voluptatem.',
  },
];

const meta = preview.meta({
  title: 'Components/Post',
  component: Post,
  parameters: { fullWidth: true },
});

export const List = meta.story({
  render: () => (
    <PostList title="2026">
      {POSTS.map((post) => (
        <Post key={post.title} {...post} />
      ))}
    </PostList>
  ),
});
