import preview from '../../../.storybook/preview';
import { RadioCard, RadioCards } from './RadioCards';

const meta = preview.meta({
  title: 'Components/RadioCards',
  component: RadioCards,
});

export const Default = meta.story({
  render: () => (
    <div style={{ inlineSize: '36rem', maxInlineSize: '100%' }}>
      <RadioCards legend="Theme" value="default" onValueChange={() => {}}>
        <RadioCard value="default" title="Default" description="Good for reading" />
      </RadioCards>
    </div>
  ),
});
