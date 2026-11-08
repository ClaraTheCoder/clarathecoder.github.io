import preview from '../../../.storybook/preview';
import { Video } from './Video';
import { Box } from '../Layout';

const meta = preview.meta({
  title: 'Components/Video',
  component: Video,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  render: () => (
    <Box py="500" style={{ inlineSize: 'min(640px, 100%)' }}>
      <Video />
    </Box>
  ),
});
