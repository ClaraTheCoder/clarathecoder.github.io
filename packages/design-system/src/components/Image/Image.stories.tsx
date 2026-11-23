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

export const MaxWidthProse = meta.story({
  render: () => (
    <Box py="500">
      <Image maxWidth="prose" />
    </Box>
  ),
});

export const Portrait = meta.story({
  render: () => (
    <Box py="500" style={{ maxWidth: 320 }}>
      <Image ratio="4 / 5" />
    </Box>
  ),
});
