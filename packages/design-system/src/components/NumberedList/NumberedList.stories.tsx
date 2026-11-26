import preview from '../../../.storybook/preview';
import { NumberedList, NumberedListItem } from './NumberedList';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/NumberedList',
  component: NumberedList,
  args: {
    children: (
      <>
        <NumberedListItem lead="Lorem ipsum dolor sit amet.">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </NumberedListItem>
        <NumberedListItem lead="Ut enim ad minim veniam.">
          Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </NumberedListItem>
        <NumberedListItem>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </NumberedListItem>
      </>
    ),
  },
  render: (args) => (
    <Box style={{ inlineSize: '48rem', maxInlineSize: '100%' }}>
      <NumberedList {...args} />
    </Box>
  ),
});

export const Default = meta.story({});
