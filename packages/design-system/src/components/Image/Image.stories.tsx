import preview from '../../../.storybook/preview';
import { Image } from './Image';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/Image',
  component: Image,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  render: () => (
    <Box py="500" style={{ inlineSize: 'min(720px, 100%)' }}>
      <Image />
    </Box>
  ),
});
