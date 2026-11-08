import preview from '../../../.storybook/preview';
import { Link } from './Link';
import { Flex } from '../Layout';

const meta = preview.meta({
  title: 'Components/Link',
  component: Link,
  args: { children: 'a text link', href: '#' },
  argTypes: {
    variant: { control: 'inline-radio', options: [undefined, 'quiet'] },
  },
});

/** Default (underlined) next to the quiet variant (underline on hover). */
export const Variants = meta.story({
  render: () => (
    <Flex direction="column" gap="300">
      <p>
        Read about <Link href="#">what I can do</Link>, or <Link href="#">say hi</Link>.
      </p>
      <nav>
        <Flex gap="500">
          <Link variant="quiet" href="#">
            Writing
          </Link>
          <Link variant="quiet" href="#">
            Work
          </Link>
        </Flex>
      </nav>
    </Flex>
  ),
});
