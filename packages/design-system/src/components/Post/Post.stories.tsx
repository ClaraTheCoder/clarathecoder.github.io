import preview from '../../../.storybook/preview';
import { Post, PostList } from './Post';

const POSTS = [
  {
    meta: '2 Nov 2026',
    title: 'Nam libero tempore cum soluta',
    href: '#',
    description: 'Soluta nobis est eligendi optio cumque nihil impedit quo minus.',
  },
  {
    meta: '18 Sep 2026',
    title: 'Itaque earum rerum hic tenetur',
    href: '#',
    description: 'Tenetur a sapiente delectus reiciendis voluptatibus maiores alias.',
  },
  {
    meta: '7 Jul 2026',
    title: 'Maiores alias consequatur aut',
    href: '#',
    description: 'Aut perferendis doloribus asperiores repellat earum voluptatem.',
  },
];

const meta = preview.meta({
  title: 'Components/Post',
  component: Post,
  parameters: { layout: 'fullscreen' },
});

export const List = meta.story({
  render: () => (
    <PostList>
      {POSTS.map((post) => (
        <Post key={post.title} {...post} />
      ))}
    </PostList>
  ),
});
