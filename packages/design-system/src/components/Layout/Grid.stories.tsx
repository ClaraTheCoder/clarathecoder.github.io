import preview from '../../../.storybook/preview';
import { Grid } from './Grid';
import { Box } from './Box';

const meta = preview.meta({
  title: 'Layout/Grid',
  component: Grid,
});

const Item = ({ children }: { children?: React.ReactNode }) => (
  <Box
    p="300"
    style={{
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-color)',
      borderRadius: 8,
      textAlign: 'center',
    }}
  >
    {children}
  </Box>
);

/** `columns={3}` expands to `repeat(3, minmax(0, 1fr))`. */
export const ThreeColumns = meta.story({
  render: () => (
    <Grid columns={3} gap="300" style={{ width: 360 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <Item key={i}>{i + 1}</Item>
      ))}
    </Grid>
  ),
});

/** Arbitrary template string passed straight through to `grid-template-columns`. */
export const CustomTemplate = meta.story({
  render: () => (
    <Grid columns="120px 1fr" gap="300" style={{ width: 360 }}>
      <Item>a</Item>
      <Item>b</Item>
      <Item>c</Item>
      <Item>d</Item>
    </Grid>
  ),
});

/** Columns grow with the viewport: 1 → 2 → 4 across breakpoints. */
export const Responsive = meta.story({
  render: () => (
    <Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap="300">
      {Array.from({ length: 8 }, (_, i) => (
        <Item key={i}>{i + 1}</Item>
      ))}
    </Grid>
  ),
});
