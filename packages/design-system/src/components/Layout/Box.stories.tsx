import preview from '../../../.storybook/preview';
import { Box } from './Box';

const meta = preview.meta({
  title: 'Layout/Box',
  component: Box,
});

const panel = {
  background: 'var(--color-accent)',
  color: 'var(--color-text-on-color)',
  borderRadius: 8,
} as const;

/** Padding from the scale: `p="500"` → `.p-500` → `var(--space-500)` (24px). */
export const Padding = meta.story({
  render: () => (
    <Box p="500" style={panel}>
      Padded box
    </Box>
  ),
});

/** Asymmetric padding + a negative top margin pulling the box upward. */
export const AsymmetricAndNegative = meta.story({
  render: () => (
    <Box px="600" py="300" mt="-400" style={panel}>
      px 600 · py 300 · mt -400
    </Box>
  ),
});

/** Arbitrary sizing values ride inline custom properties, not utility classes. */
export const ArbitrarySizing = meta.story({
  render: () => (
    <Box p="400" width="240px" maxWidth="100%" style={panel}>
      width 240px
    </Box>
  ),
});

/** Polymorphic: a Box that renders as an `<article>`. */
export const AsArticle = meta.story({
  render: () => (
    <Box as="article" p="400" style={panel}>
      I am an &lt;article&gt;
    </Box>
  ),
});
