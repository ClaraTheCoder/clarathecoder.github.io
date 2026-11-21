import preview from '../../../.storybook/preview';
import { Link } from './Link';

const meta = preview.meta({
  title: 'Components/Link',
  component: Link,
  args: { children: 'a text link', href: '#' },
  argTypes: {
  },
});

export const Default = meta.story({
  render: () => (
      <p>
        Read about <Link href="#">what I can do</Link>, or <Link href="#">say hi</Link>.
      </p>
  ),
});

/** For links whose context already says "this is a link", like a list of post titles. */
export const Plain = meta.story({
  render: () => (
    <Link variant="plain" href="#">
      A post title
    </Link>
  ),
});
