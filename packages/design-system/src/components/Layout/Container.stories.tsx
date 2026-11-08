import preview from '../../../.storybook/preview';
import { Container } from './Container';
import { Box } from './Box';

const meta = preview.meta({
  title: 'Layout/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
});

const panel = {
  background: 'var(--color-accent)',
  color: 'var(--color-text-on-color)',
  borderRadius: 8,
} as const;

/** Centered, guttered, capped at the page measure (`--size-container-page`). */
export const Default = meta.story({
  render: () => (
    <Container>
      <Box p="500" style={panel}>max 1820px with gutter</Box>
    </Container>
  ),
});

/** `variant="prose"` caps at the reading measure (`--size-container-prose`). */
export const Prose = meta.story({
  render: () => (
    <Container variant="prose">
      <Box p="500" style={panel}>768px no gutter</Box>
    </Container>
  ),
});
