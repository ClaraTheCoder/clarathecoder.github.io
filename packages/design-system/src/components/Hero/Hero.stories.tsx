import preview from '../../../.storybook/preview';
import { Hero } from './Hero';
import { Text } from '../Text';
import { Link } from '../Link';

const meta = preview.meta({
  title: 'Components/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  render: () => (
    <Hero title="Hi, I'm Clara">
      <Text variant="lead">
        I like building things and helping people. At the moment I'm mostly working on{' '}
        <Link href="#">design systems</Link>, tinkering with online tools and toys, making music,
        and <Link href="#">writing</Link> about it all.
      </Text>
      <Text variant="lead">
        <strong>I'm available for hire.</strong> Read about <Link href="#">what I can do</Link>, or{' '}
        <Link href="#">say hi</Link>.
      </Text>
    </Hero>
  ),
});
