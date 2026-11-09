import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Flex,
  Link,
  SegmentedControl,
  Text,
} from '@clara/design-system';
import { ArrowRight, Palette } from 'lucide-react';
import { useId, useState } from 'react';

type Mode = 'raw' | 'default' | 'opal' | 'blueprint';
type Scheme = 'system' | 'light' | 'dark';

const MODE_OPTIONS = [
  { value: 'raw', label: 'Raw' },
  { value: 'default', label: 'Default' },
  { value: 'opal', label: 'Opal' },
  { value: 'blueprint', label: 'Blueprint' },
];

const SCHEME_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

declare global {
  interface Window {
    __setThemeMode?: (mode: Mode) => void;
    __setColorScheme?: (scheme: Scheme) => void;
  }
}

const readMode = () => (document.documentElement.dataset.themeMode as Mode | undefined) ?? 'default';
const readScheme = () => (document.documentElement.dataset.theme as Scheme | undefined) ?? 'system';

interface ThemeDialogProps {
  variant: 'hero' | 'header';
}

export function ThemeDialog({ variant }: ThemeDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(readMode);
  const [scheme, setScheme] = useState<Scheme>(readScheme);
  const modeLabelId = useId();
  const schemeLabelId = useId();

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setMode(readMode());
      setScheme(readScheme());
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {variant === 'hero' ? (
        <Flex align="start" direction="column">
          <DialogTrigger size="lg">
            Pick a theme <ArrowRight aria-hidden="true" />
          </DialogTrigger>
        </Flex>
      ) : (
        <DialogTrigger variant="ghost" iconOnly aria-label="Pick a theme">
          <Palette aria-hidden="true" />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogTitle>Pick a theme</DialogTitle>
        <DialogDescription>
          This site is styled with <Link href="https://www.designtokens.org/">design tokens</Link>. Choose an option to update the tokens and get a new look:
        </DialogDescription>
        <Flex direction="column" gap="200">
          <Text id={modeLabelId} variant="body-sm" color="muted">
            Theme
          </Text>
          <SegmentedControl
            aria-labelledby={modeLabelId}
            options={MODE_OPTIONS}
            value={mode}
            onValueChange={(next) => {
              setMode(next as Mode);
              window.__setThemeMode?.(next as Mode);
            }}
          />
        </Flex>
        <Flex direction="column" gap="200">
          <Text id={schemeLabelId} variant="body-sm" color="muted">
            Appearance
          </Text>
          <SegmentedControl
            aria-labelledby={schemeLabelId}
            options={SCHEME_OPTIONS}
            value={scheme}
            onValueChange={(next) => {
              setScheme(next as Scheme);
              window.__setColorScheme?.(next as Scheme);
            }}
          />
        </Flex>
      </DialogContent>
    </Dialog>
  );
}
