import preview from '../../../.storybook/preview';
import { Hero } from './Hero';
import { Text } from '../Text';
import { Link } from '../Link';
import { Button } from '../Button';

const meta = preview.meta({
  title: 'Components/Hero',
  component: Hero,
  parameters: { fullWidth: true },
});

export const Default = meta.story({
  render: () => (
    <Hero title="Hi, I’m Clara">
      <Text variant="lead">
        I like building things and helping people. At the moment I’m working on{' '}
        <Link href="#">design systems</Link>, tinkering with online tools and toys, and making music.
        Sometimes I <Link href="#">write</Link> about those things.
      </Text>
      <Text variant="lead">
        <strong>I’m available for hire.</strong> Read about <Link href="#">what I can do</Link>, or{' '}
        <Link href="#">say hi</Link>.
      </Text>
    </Hero>
  ),
});

export const WithActions = meta.story({
  render: () => (
    <Hero title="Hi, I’m Clara" actions={<Button size="lg">Pick a theme</Button>}>
      <Text variant="lead">
        I like building things and helping people. At the moment I’m working on{' '}
        <Link href="#">design systems</Link>, tinkering with online tools and toys, and making music.
        Sometimes I <Link href="#">write</Link> about those things.
      </Text>
      <Text variant="lead">
        <strong>I’m available for hire.</strong> Read about <Link href="#">what I can do</Link>, or{' '}
        <Link href="#">say hi</Link>.
      </Text>
    </Hero>
  ),
});
