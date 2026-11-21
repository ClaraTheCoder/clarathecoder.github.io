import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Flex,
  type IconName,
  Link,
  RadioCard,
  RadioCards,
  VisuallyHidden,
} from '@clara/design-system';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { revealTheme } from '../scripts/theme-reveal';

type Mode = 'raw' | 'default' | 'opal' | 'blueprint';
type Scheme = 'system' | 'light' | 'dark';

const MODES: { value: Mode; title: string; description: string; preset?: string }[] = [
  { value: 'default', title: 'Default', description: 'Good for reading', preset: 'default' },
  { value: 'opal', title: 'Opal', description: 'Oooh, shiny!', preset: 'opal' },
  { value: 'blueprint', title: 'Blueprint', description: 'One for the nerds', preset: 'blueprint' },
  { value: 'raw', title: 'No CSS', description: 'Just the bare bones' },
];

const SCHEMES = {
  system: { label: 'System', next: 'light', icon: 'monitor' },
  light: { label: 'Light', next: 'dark', icon: 'sun' },
  dark: { label: 'Dark', next: 'system', icon: 'moon' },
} as const satisfies Record<Scheme, { label: string; next: Scheme; icon: IconName }>;

declare global {
  interface Window {
    __setThemeMode?: (mode: Mode) => void;
    __setColorScheme?: (scheme: Scheme) => void;
  }
}

const readMode = () =>
  (document.documentElement.dataset.themeMode as Mode | undefined) ?? 'default';
const readScheme = () => (document.documentElement.dataset.theme as Scheme | undefined) ?? 'system';

interface ThemeDialogProps {
  variant: 'hero' | 'header';
}

export function ThemeDialog({ variant }: ThemeDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [scheme, setScheme] = useState<Scheme>('system');

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setMode(readMode());
      setScheme(readScheme());
    }
    setOpen(next);
  };

  const { label: schemeLabel, next: nextScheme, icon: schemeIcon } = SCHEMES[scheme];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {variant === 'hero' ? (
        <Flex align="start" direction="column">
          <DialogTrigger size="lg" iconEnd="arrow-right">
            Pick a theme
          </DialogTrigger>
        </Flex>
      ) : (
        <DialogTrigger
          variant="ghost"
          icon="palette"
          className="theme-trigger"
          aria-label="Pick a theme"
        >
          <span className="theme-trigger__label">Pick a theme</span>
        </DialogTrigger>
      )}
      <DialogContent>
        <Flex align="center" justify="between" gap="200">
          <DialogTitle>Pick a theme</DialogTitle>
          <Flex align="center" gap="100" className="theme-dialog__actions">
            <Button
              variant="ghost"
              icon={schemeIcon}
              className="theme-dialog__scheme"
              aria-label={`Appearance: ${schemeLabel}. Switch to ${SCHEMES[nextScheme].label.toLowerCase()}.`}
              onClick={() => {
                revealTheme(
                  () => {
                    flushSync(() => setScheme(nextScheme));
                    window.__setColorScheme?.(nextScheme);
                  },
                  { fade: true },
                );
              }}
            >
              {schemeLabel}
            </Button>
            <DialogClose iconOnly icon="x">
              <VisuallyHidden>Close</VisuallyHidden>
            </DialogClose>
          </Flex>
        </Flex>
        <DialogDescription>
          This site is styled with <Link href="https://www.designtokens.org/">design tokens</Link>.
          Choose an option to update the tokens and get a new look:
        </DialogDescription>
        <RadioCards
          legend="Theme"
          value={mode}
          onValueChange={(next) => {
            revealTheme(
              () => {
                flushSync(() => setMode(next as Mode));
                window.__setThemeMode?.(next as Mode);
              },
              { instant: next === 'raw' },
            );
          }}
        >
          {MODES.map(({ value, title, description, preset }) => (
            <RadioCard
              key={value}
              value={value}
              title={title}
              description={description}
              className={`theme-card theme-card--${value}`}
              data-preset={preset}
              data-theme={preset && scheme !== 'system' ? scheme : undefined}
            />
          ))}
        </RadioCards>
      </DialogContent>
    </Dialog>
  );
}
