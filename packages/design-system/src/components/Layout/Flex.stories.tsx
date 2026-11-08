import preview from '../../../.storybook/preview';
import { Flex } from './Flex';
import { Box } from './Box';

const meta = preview.meta({
  title: 'Layout/Flex',
  component: Flex,
});

/** A demo item so the layout is visible. */
const Item = ({ children }: { children?: React.ReactNode }) => (
  <Box
    p="300"
    style={{
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-color)',
      borderRadius: 8,
      minWidth: 48,
      textAlign: 'center',
    }}
  >
    {children}
  </Box>
);

/** Row with a scale gap — `gap="400"` → `.gap-400` → `var(--space-400)`. */
export const Row = meta.story({
  render: () => (
    <Flex gap="400">
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Flex>
  ),
});

/** Column, centered, with a larger gap. */
export const Column = meta.story({
  render: () => (
    <Flex direction="column" align="center" gap="500">
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Flex>
  ),
});

/** `justify="between"` spreads items across a fixed-width track. */
export const SpaceBetween = meta.story({
  render: () => (
    <Flex justify="between" align="center" style={{ width: 320 }}>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Flex>
  ),
});

/**
 * Responsive gap: a column that becomes a row at `md`, with the gap growing per
 * breakpoint. Resize the viewport — `direction={{ initial: 'column', md: 'row' }}`.
 */
export const Responsive = meta.story({
  render: () => (
    <Flex direction={{ initial: 'column', md: 'row' }} gap={{ initial: '200', md: '600' }}>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Flex>
  ),
});

/** Arbitrary gap value — not on the scale, carried by an inline custom property. */
export const ArbitraryGap = meta.story({
  render: () => (
    <Flex gap="30px">
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Flex>
  ),
});

/** Polymorphic: render the flex container as a `<nav>`. */
export const AsNav = meta.story({
  render: () => (
    <Flex as="nav" gap="400">
      <Item>Home</Item>
      <Item>Work</Item>
      <Item>About</Item>
    </Flex>
  ),
});
