import {
  type CSSProperties,
  type HTMLAttributes,
  type TrackHTMLAttributes,
  type VideoHTMLAttributes,
} from 'react';
import './Video.css';
import './video-play-cover.js';
import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { Link } from '../Link';
import { Flex } from '../Layout';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'video-play-cover': HTMLAttributes<HTMLElement>;
    }
  }
}

type CaptionsTrack = Omit<TrackHTMLAttributes<HTMLTrackElement>, 'kind'> &
  Required<Pick<TrackHTMLAttributes<HTMLTrackElement>, 'src' | 'srcLang' | 'label'>>;

export type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Captions file, rendered as a `<track kind="captions">` shown by default. */
  track: CaptionsTrack;
  /** URL of a page holding the full text alternative, linked below the video. */
  transcriptHref?: string;
};

/** Load `@clara/design-system/video-play-cover.js` on the page for the play button. */
export const Video = ({
  className,
  poster,
  track,
  transcriptHref,
  children,
  ...props
}: VideoProps) => (
  <Flex className={className} gap="400" direction="column">
    <video-play-cover
      className="video__frame"
      style={poster ? ({ '--video-poster': `url("${poster}")` } as CSSProperties) : undefined}
    >
      <Button variant="fixed" size="xl" iconOnly icon="play" className="video__play" hidden>
        <VisuallyHidden>Play video</VisuallyHidden>
      </Button>
      <video
        className="video__player"
        controls
        preload="metadata"
        playsInline
        poster={poster}
        {...props}
      >
        {children}
        <track default {...track} kind="captions" />
      </video>
    </video-play-cover>
    {transcriptHref && (
      <Link href={transcriptHref} className="video__transcript">
        Read the transcript
      </Link>
    )}
  </Flex>
);
