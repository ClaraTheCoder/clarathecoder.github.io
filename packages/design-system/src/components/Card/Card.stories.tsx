import preview from '../../../.storybook/preview';
import { Card } from './Card';
import { Box } from '../Layout';
import { Text } from '../Text';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  args: {
    children: (
      <Text>
        Lorem ipsum <strong>dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    ),
  },
  render: (args) => (
    <Box style={{ inlineSize: '48rem', maxInlineSize: '100%' }}>
      <Card {...args} />
    </Box>
  ),
});

/** Two-column cards span a post's full article column, so they get a wider stage. */
const renderWide: typeof meta.input.render = (args) => (
  <Box style={{ inlineSize: '72rem', maxInlineSize: '100%' }}>
    <Card {...args} />
  </Box>
);

export const Primary = meta.story({});

export const Secondary = meta.story({ args: { variant: 'secondary' } });

/** One paragraph flowed into two columns, key phrases highlighted. */
export const TwoColumns = meta.story({
  render: renderWide,
  args: {
    columns: 2,
    children: (
      <Text as="div" variant="lead">
        Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
        <strong>Duis aute irure dolor</strong> in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    ),
  },
});
