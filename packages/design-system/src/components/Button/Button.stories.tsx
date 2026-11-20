import { ArrowRight, Heart, Plus, Settings } from 'lucide-react';
import preview from '../../../.storybook/preview';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { Box, Flex } from '../Layout';
import { Text } from '../Text';

const meta = preview.meta({
  title: 'Components/Button',
  component: Button,
  args: { variant: 'primary', size: 'md', children: 'Button' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'fixed', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
  },
});

const VARIANTS: ButtonVariant[] = ['primary', 'fixed', 'ghost'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex align="center" gap="300" wrap="wrap">
    {children}
  </Flex>
);
// Fixed buttons are designed to sit on dark media, so show them on a panel that
// stays dark in both modes. Every row gets the same padding so they line up.
const VariantRow = ({
  variant,
  children,
}: {
  variant: ButtonVariant;
  children: React.ReactNode;
}) => (
  <Box
    p="400"
    style={
      variant === 'fixed'
        ? { background: 'var(--color-fixed-inverse)', borderRadius: 'var(--radius-md)' }
        : undefined
    }
  >
    <Row>
      <Text
        as="span"
        variant="overline"
        color={variant === 'fixed' ? undefined : 'muted'}
        style={{
          minInlineSize: 'var(--space-900)',
          color: variant === 'fixed' ? 'var(--color-fixed)' : undefined,
        }}
      >
        {variant}
      </Text>
      {children}
    </Row>
  </Box>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <Flex direction="column" gap="400">
    {children}
  </Flex>
);

/** sm 36 · md 48 · lg 72px. Height is a fixed per-size token. */
export const Variants = meta.story({
  render: () => (
    <Stack>
      {VARIANTS.map((v) => (
        <VariantRow key={v} variant={v}>
          <Button key={`${v}-sm`} variant={v} size="sm">
            <Plus /> Add item
          </Button>
          <Button key={`${v}-md`} variant={v}>
            <Heart /> Save
          </Button>
          <Button key={`${v}-lg`} variant={v} size="lg">
            See all projects <ArrowRight className="button__arrow" />
          </Button>
          <Button key={`${v}-disabled`} variant={v} disabled size="lg">
            Disabled
          </Button>
        </VariantRow>
      ))}
    </Stack>
  ),
});

/** Icon-only renders a square at each size — always give it an `aria-label`. */
export const IconOnly = meta.story({
  render: () => (
    <Stack>
      {VARIANTS.map((v) => (
        <VariantRow key={v} variant={v}>
          {SIZES.map((s) => (
            <Button key={s} variant={v} size={s} iconOnly aria-label="Settings">
              <Settings />
            </Button>
          ))}
          <Button key={v} variant={v} disabled iconOnly aria-label="Settings" size="lg">
            <Settings />
          </Button>
        </VariantRow>
      ))}
    </Stack>
  ),
});
