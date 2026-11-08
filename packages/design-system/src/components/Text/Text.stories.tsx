import preview from '../../../.storybook/preview';
import { Text, type TextVariant } from './Text';
import { Flex } from '../Layout';

const VARIANTS: TextVariant[] = [
  'display-1',
  'display-2',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'lead',
  'body',
  'body-sm',
  'caption',
  'overline',
  'code',
];

const meta = preview.meta({
  title: 'Components/Text',
  component: Text,
  args: { variant: 'body', children: 'The quick brown fox jumps over the lazy dog' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
  },
});

/** Every role in the scale, top to bottom. */
export const Roles = meta.story({
  render: () => (
    <Flex direction="column" gap="400">
      {VARIANTS.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant} — The quick brown fox jumps over the lazy dog
        </Text>
      ))}
    </Flex>
  ),
});

/** The `color` prop maps to the semantic text-colour tokens. */
export const Colors = meta.story({
  render: () => (
    <Flex direction="column" gap="300">
      <Text color="default">default — var(--color-text)</Text>
      <Text color="muted">muted — var(--color-text-muted)</Text>
      <Text color="subtle">subtle — var(--color-text-subtle)</Text>
    </Flex>
  ),
});

/** Polymorphic: `as` swaps the element while the role class stays. */
export const Polymorphic = meta.story({
  render: () => (
    <Flex direction="column" gap="300">
      <Text variant="display-1" as="h1">
        Rendered as an h1
      </Text>
      <Text variant="heading-3" as="h2">
        Rendered as an h2
      </Text>
      <Text variant="code" as="code">
        const answer = 42;
      </Text>
    </Flex>
  ),
});
