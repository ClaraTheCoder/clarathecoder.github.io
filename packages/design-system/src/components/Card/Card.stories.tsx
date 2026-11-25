import preview from '../../../.storybook/preview';
import { Card } from './Card';
import { Box, Grid } from '../Layout';
import { Text } from '../Text';
import { NumberedList, NumberedListItem } from '../NumberedList';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  args: {
    heading: 'Heading',
    children: (
      <Text>
        Lorem ipsum <strong>dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    ),
  },
  render: (args) => (
    <Box style={{ inlineSize: 'min(48rem, 100%)' }}>
      <Card {...args} />
    </Box>
  ),
});

export const Primary = meta.story({});

export const Secondary = meta.story({ args: { variant: 'secondary' } });

export const NoHeading = meta.story({ args: { heading: undefined } });

/** Two statements side by side, key phrases highlighted. */
export const Statements = meta.story({
  args: {
    as: 'section',
    heading: 'Impact',
    children: (
      <Grid columns={{ initial: 1, md: 2 }} gapX="800" gapY="500">
        <Text as="div" variant="lead">
          Lorem ipsum <strong>dolor sit amet in two weeks</strong>, consectetur adipiscing elit.
        </Text>
        <Text as="div" variant="lead">
          <strong>A handful of issues</strong> ut labore et dolore magna aliqua, quis nostrud.
        </Text>
      </Grid>
    ),
  },
});

export const WithNumberedList = meta.story({
  args: {
    as: 'section',
    variant: 'secondary',
    heading: 'Learnings',
    children: (
      <NumberedList columns={2}>
        <NumberedListItem lead="Lorem ipsum dolor sit amet.">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </NumberedListItem>
        <NumberedListItem lead="Ut enim ad minim veniam.">
          Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
        </NumberedListItem>
      </NumberedList>
    ),
  },
});
