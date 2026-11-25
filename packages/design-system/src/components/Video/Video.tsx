import {
  type CSSProperties,
  type ReactNode,
  type TrackHTMLAttributes,
  type VideoHTMLAttributes
} from 'react';
import { Button } from '../Button';
import { Flex } from '../Layout';
import { Link } from '../Link';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import './Video.css';
import './video-play-cover.js';

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
  /** URL of a page holding the full text alternative, linked at the end of the caption. */
  transcriptHref?: string;
  /** Muted caption text below the video, as on `Image`. With a caption or a transcript, the video is a `<figure>`. */
  caption?: ReactNode;
};

/** Load `@clara/design-system/video-play-cover.js` on the page for the play button. */
export const Video = ({
  className,
  poster,
  track,
  transcriptHref,
  caption,
  children,
  ...props
}: VideoProps) => (
  <Flex
    as={caption || transcriptHref ? 'figure' : 'div'}
    className={className}
    gap="300"
    direction="column"
  >
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
    {(caption || transcriptHref) && (
      <Text as="figcaption" variant="caption" color="muted">
        {caption}
        {caption && transcriptHref && ' '}
        {transcriptHref && <Link href={transcriptHref}>Read the transcript</Link>}
      </Text>
    )}
  </Flex>
);
