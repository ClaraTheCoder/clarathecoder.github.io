import preview from '../../../.storybook/preview';
import { TableOfContents } from './TableOfContents';
import { Grid, Box } from '../Layout';
import { Text } from '../Text';

const entries = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The problem' },
  { id: 'impact', label: 'Impact' },
  { id: 'trust', label: 'How the system earned trust while the old one was still running' },
  { id: 'differently', label: 'What I’d do differently' },
];

const meta = preview.meta({
  title: 'Components/TableOfContents',
  component: TableOfContents,
  parameters: { fullWidth: true },
  args: { entries },
});

export const Default = meta.story({});

export const WithArticle = meta.story({
  render: (args) => (
    <Grid columns={{ initial: 1, md: 12 }} gapX="600" gapY="600">
      <Box gridColumn={{ md: '1 / 5' }}>
        <div style={{ position: 'sticky', top: 'var(--space-600)' }}>
          <TableOfContents {...args} />
        </div>
      </Box>
      <Box gridColumn={{ md: '5 / -1' }}>
        {args.entries.map((entry) => (
          <section key={entry.id}>
            <Text variant="heading-2" as="h2" id={entry.id}>
              {entry.label}
            </Text>
            {Array.from({ length: 6 }, (_, i) => (
              <Text key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            ))}
          </section>
        ))}
      </Box>
    </Grid>
  ),
});

export const Midway = meta.story({
  play: ({ canvasElement }) => {
    const items = canvasElement.querySelectorAll<HTMLElement>('.toc__item');
    items.forEach((item, i) => {
      item.toggleAttribute('data-read', i < 2);
      item.style.setProperty('--toc-progress', String(i < 2 ? 1 : i === 2 ? 0.4 : 0));
    });
    items[2]?.querySelector('a')?.setAttribute('aria-current', 'location');
  },
});
