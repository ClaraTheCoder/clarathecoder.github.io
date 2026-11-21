import preview from '../../../.storybook/preview';
import { Link } from '../Link';
import { Text } from '../Text';
import { Banner } from './Banner';

const meta = preview.meta({
  title: 'Components/Banner',
  component: Banner,
  parameters: { fullWidth: true },
});

export const Default = meta.story({
  render: () => (
    <Banner title="Drop me a line">
      <Text variant="lead">
        If what you need doesn’t fit neatly into any of those, get in touch anyway.{' '}
        <Link href="mailto:hello@example.com">Send me an email</Link> and tell me what you’re
        working on.
      </Text>
    </Banner>
  ),
});
