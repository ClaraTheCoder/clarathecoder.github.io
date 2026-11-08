import preview from '../../../.storybook/preview';
import { Testimonial } from './Testimonial';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/Testimonial',
  component: Testimonial,
  args: {
    name: 'Name Surname',
    role: 'Role, Company',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco.',
  },
});

export const Default = meta.story({
  render: (args) => (
    <Box style={{ inlineSize: 'min(480px, 100%)' }}>
      <Testimonial {...args} />
    </Box>
  ),
});
