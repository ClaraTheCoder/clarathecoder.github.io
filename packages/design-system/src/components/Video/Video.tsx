import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type TrackHTMLAttributes,
  type VideoHTMLAttributes,
} from 'react';
import { Play } from 'lucide-react';
import './Video.css';
import './video-element.js';
import { Button } from '../Button';
import { Flex } from '../Layout';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'clara-video': HTMLAttributes<HTMLElement>;
    }
  }
}

type CaptionsTrack = Omit<TrackHTMLAttributes<HTMLTrackElement>, 'kind'> &
  Required<Pick<TrackHTMLAttributes<HTMLTrackElement>, 'src' | 'srcLang' | 'label'>>;

export type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Captions file, rendered as a `<track kind="captions">` shown by default. */
  track: CaptionsTrack;
  /** Full text alternative, rendered after the video in a native disclosure. */
  transcript?: ReactNode;
};

/** Load `@clara/design-system/video-element.js` on the page for the play button. */
export const Video = ({ className, poster, track, transcript, children, ...props }: VideoProps) => (
  <Flex className={className} gap="400" direction="column">
    <clara-video
      className="video__frame"
      style={poster ? ({ '--video-poster': `url("${poster}")` } as CSSProperties) : undefined}
    >
      <Button
        variant="fixed"
        size="xl"
        iconOnly
        className="video__play"
        aria-label="Play video"
        hidden
      >
        <Play fill="currentColor" aria-hidden />
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
    </clara-video>
    {transcript && (
      <details className="video__transcript prose">
        <summary>Read the transcript</summary>
        {transcript}
      </details>
    )}
  </Flex>
);
