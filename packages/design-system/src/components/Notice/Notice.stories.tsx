import preview from '../../../.storybook/preview';
import { Notice } from './Notice';

const meta = preview.meta({
  title: 'Components/Notice',
  component: Notice,
  args: { children: '🚧 Under construction 🚧' },
  parameters: { fullWidth: true },
});

export const Default = meta.story({});
