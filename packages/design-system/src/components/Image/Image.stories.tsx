import preview from '../../../.storybook/preview';
import { Image } from './Image';
import { Box } from '../Layout';

// Self-contained sample images: labelled 16:9 cards.
const sample = (label: string, bg: string, fg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="${bg}"/><text x="400" y="240" font-family="sans-serif" font-size="48" text-anchor="middle" fill="${fg}">${label}</text></svg>`,
  )}`;
const SAMPLE = sample('Sample', '#f1eef8', '#2b2440');
const STILL = sample('Still frame', '#fdf3d8', '#3a2c06');

const meta = preview.meta({
  title: 'Components/Image',
  component: Image,
  parameters: { fullWidth: true },
});

export const Default = meta.story({
  render: () => (
    <Box py="500">
      <Image src={SAMPLE} alt="A sample image" width={800} height={450} />
    </Box>
  ),
});

export const Ratio = meta.story({
  render: () => (
    <Box py="500" style={{ maxWidth: 320 }}>
      <Image src={SAMPLE} alt="A sample image, cropped to a portrait" ratio="4 / 5" />
    </Box>
  ),
});

export const MaxWidthProse = meta.story({
  render: () => (
    <Box py="500">
      <Image src={SAMPLE} alt="A sample image" width={800} height={450} maxWidth="prose" />
    </Box>
  ),
});

export const Sources = meta.story({
  render: () => (
    <Box py="500">
      <Image
        src={SAMPLE}
        alt="A sample image with a still frame for reduced motion"
        width={800}
        height={450}
      >
        <source srcSet={STILL} media="(prefers-reduced-motion: reduce)" />
      </Image>
    </Box>
  ),
});

export const Caption = meta.story({
  render: () => (
    <Box py="500">
      <Image
        src={SAMPLE}
        alt="A sample image"
        width={800}
        height={450}
        caption="A caption, in muted caption text, below the image."
      />
    </Box>
  ),
});

export const Matte = meta.story({
  render: () => (
    <Box py="500">
      <Image
        src={SAMPLE}
        alt="A sample image on a white mount"
        width={800}
        height={450}
        matte
        p="500"
      />
    </Box>
  ),
});
