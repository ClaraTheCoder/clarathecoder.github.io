import preview from '../../../.storybook/preview';
import src from './assets/showreel-2026-10-720.mp4';
import poster from './assets/showreel-2026-10-poster.webp';
import transcriptMd from './assets/showreel-2026-10-transcript.md?raw';
import captions from './assets/showreel-2026-10.en.vtt?no-inline';
import { Video } from './Video';

const paragraphs = transcriptMd
  .replace(/<!--[\s\S]*?-->/, '')
  .trim()
  .split(/\n{2,}/);

const meta = preview.meta({
  title: 'Components/Video',
  component: Video,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  render: () => (
    <Video
      poster={poster}
      aria-label="Showreel: Vodafone Neo"
      track={{ src: captions, srcLang: 'en', label: 'English' }}
      transcript={paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    >
      <source src={src} type='video/mp4; codecs="avc1.640029, mp4a.40.2"' />
    </Video>
  ),
});
