import preview from '../../../.storybook/preview';
import { Testimonial } from './Testimonial';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/Testimonial',
  component: Testimonial,
  args: {
    name: 'Name Surname',
    role: 'Role',
    company: 'Company',
    children: (
      <>
        Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod
        tempor incididunt ut <strong>labore et dolore magna aliqua</strong>, quis nostrud
        exercitation ullamco.
      </>
    ),
  },
});

export const Default = meta.story({
  render: (args) => (
    <Box style={{ inlineSize: '36rem', maxInlineSize: '100%' }}>
      <Testimonial {...args} />
    </Box>
  ),
});

export const Wide = meta.story({
  args: { wide: true },
  parameters: { fullWidth: true },
});
