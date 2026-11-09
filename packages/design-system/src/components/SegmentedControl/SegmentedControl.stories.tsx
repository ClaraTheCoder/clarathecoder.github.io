import { useState } from 'react';
import preview from '../../../.storybook/preview';
import { SegmentedControl, type SegmentedControlOption } from './SegmentedControl';

const meta = preview.meta({
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
});

const Demo = ({
  label,
  options,
  initial,
}: {
  label: string;
  options: SegmentedControlOption[];
  initial?: string;
}) => {
  const [value, setValue] = useState(initial ?? options[0]?.value ?? '');
  return (
    <SegmentedControl
      aria-label={label}
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
};

const THEME_OPTIONS: SegmentedControlOption[] = [
  { value: 'raw', label: 'Raw' },
  { value: 'default', label: 'Default' },
  { value: 'opal', label: 'Opal' },
];

export const Default = meta.story({
  render: () => <Demo label="Theme preset" options={THEME_OPTIONS} initial="default" />,
});