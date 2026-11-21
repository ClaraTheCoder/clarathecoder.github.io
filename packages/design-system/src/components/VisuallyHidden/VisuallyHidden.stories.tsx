import preview from '../../../.storybook/preview';
import { Button } from '../Button';
import { VisuallyHidden } from './VisuallyHidden';

const meta = preview.meta({
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
});

export const IconButtonLabel = meta.story({
  render: () => (
    <Button variant="ghost" iconOnly icon="x">
      <VisuallyHidden>Close</VisuallyHidden>
    </Button>
  ),
});
