import preview from '../../../.storybook/preview';
import { RuledHeading } from './RuledHeading';

const meta = preview.meta({
  title: 'Components/RuledHeading',
  component: RuledHeading,
  parameters: { fullWidth: true },
});

export const Default = meta.story({
  args: { children: '2026' },
});

export const Large = meta.story({
  args: { children: 'What I do', variant: 'heading-1' },
});
