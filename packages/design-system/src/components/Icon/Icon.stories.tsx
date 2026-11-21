import preview from '../../../.storybook/preview';
import { Icon, type IconName } from './Icon';

const meta = preview.meta({
  title: 'Components/Icon',
  component: Icon,
});

const NAMES: IconName[] = [
  'arrow-left',
  'arrow-right',
  'circle-check',
  'circle-x',
  'heart',
  'house',
  'info',
  'monitor',
  'moon',
  'palette',
  'play',
  'plus',
  'settings',
  'sun',
  'triangle-alert',
  'x',
];

export const All = meta.story({
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-400)' }}>
      {NAMES.map((name) => (
        <Icon key={name} name={name} title={name} />
      ))}
    </div>
  ),
});
