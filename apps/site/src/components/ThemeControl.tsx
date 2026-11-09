import { useState } from 'react';
import { Flex, Link, SegmentedControl, Text } from '@clara/design-system';

type Mode = 'raw' | 'default' | 'opal' | 'blueprint';

const OPTIONS = [
  { value: 'raw', label: 'Raw' },
  { value: 'default', label: 'Default' },
  { value: 'opal', label: 'Opal' },
  { value: 'blueprint', label: 'Blueprint' },
];

declare global {
  interface Window {
    __setThemeMode?: (mode: Mode) => void;
  }
}

export function ThemeControl() {
  const [mode, setMode] = useState<Mode>(document.documentElement.dataset.themeMode as Mode ?? 'default');

  const handleChange = (next: string) => {
    setMode(next as Mode);
    window.__setThemeMode?.(next as Mode);
  };

  return (
    <Flex align="start" direction="column" gap="500">
      <Text as="p" color="muted">This site is styled with <Link href="https://www.designtokens.org/">design tokens</Link>. Pick a theme:</Text>
      <SegmentedControl
        aria-label="Pick a theme"
        options={OPTIONS}
        value={mode}
        onValueChange={handleChange}
      />
    </Flex>
  );
}
