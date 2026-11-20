import preview from '../../../.storybook/preview';
import { Image } from './Image';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/Image',
  component: Image,
  parameters: { fullWidth: true },
});

export const Default = meta.story({
  render: () => (
    <Box py="500">
      <Image />
    </Box>
  ),
});
