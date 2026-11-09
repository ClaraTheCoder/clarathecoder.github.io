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
