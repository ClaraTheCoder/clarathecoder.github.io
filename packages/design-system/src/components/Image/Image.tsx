import {
  type CSSProperties,
  type ImgHTMLAttributes,
  type ReactNode,
  type SourceHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx.js';
import {
  BREAKPOINTS,
  resolveLayoutProps,
  type Breakpoint,
  type LayoutProps,
} from '../Layout/layoutProps.js';
import { Text } from '../Text/index.js';
import './Image.css';

/** One image: a URL, or `<source>` attributes (`srcSet`, `width`, `height`, …) for its own size. */
export type SourceValue = string | Omit<SourceHTMLAttributes<HTMLSourceElement>, 'media'>;

/**
 * A {@link SourceValue} for every width, or one per breakpoint. `initial` is
 * required in the object form: it's the `<img>` fallback, so there's always a
 * concrete source.
 */
export type ImageSource =
  SourceValue | ({ initial: SourceValue } & Partial<Record<Breakpoint, SourceValue>>);

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'children'> &
  Omit<LayoutProps, 'width' | 'height' | 'maxWidth'> & {
    /** The light-theme image(s): a URL, or one per breakpoint (`{ initial, sm, … }`). */
    src: ImageSource;
    /**
     * The dark-theme image(s), same shape as `src`. Breakpoints it leaves out
     * fall back to `src`'s. Shown under `[data-theme='dark']`, or the OS dark
     * setting when no theme is set.
     */
    dark?: ImageSource;
    /** Always required: describe the image, or `""` if it's decorative. */
    alt: string;
    /** Crops to a ratio, e.g. `16 / 9`. Omitted, the image keeps its own shape. */
    ratio?: string;
    /** Caps the image's width; `prose` matches the prose container. */
    maxWidth?: 'prose' | LayoutProps['maxWidth'];
    /** Sets the image on a white mount, e.g. a black-on-white comic in dark mode. Pair with `p`. */
    matte?: boolean;
    /** Wraps the image in a `<figure>` with this as its `<figcaption>`, in muted caption text. */
    caption?: ReactNode;
    /**
     * `<source>` elements, ahead of the breakpoint sources in a `<picture>`,
     * e.g. a still frame for `(prefers-reduced-motion: reduce)`.
     */
    children?: ReactNode;
  };

type Breakpoints = Partial<Record<Breakpoint, SourceValue>>;

function splitSource(source: ImageSource): { initial: SourceValue; breakpoints: Breakpoints } {
  if (typeof source === 'string' || !('initial' in source))
    return { initial: source, breakpoints: {} };
  const { initial, ...breakpoints } = source;
  return { initial, breakpoints };
}

// <picture> takes the first match and the queries are min-width only, so the
// sources go largest first.
const LARGEST_FIRST = (Object.keys(BREAKPOINTS) as Breakpoint[]).reverse();

function sourceAttrs(source: SourceValue) {
  return typeof source === 'string' ? { srcSet: source } : source;
}

function imgSourceAttrs(source: SourceValue) {
  if (typeof source === 'string') return { src: source };
  const { srcSet, src, ...rest } = source;
  return { ...(rest as ImgHTMLAttributes<HTMLImageElement>), src: src ?? srcSet };
}

/**
 * Takes Box's layout props (padding, margin, …). Padding sits inside the
 * rounded corners and `ratio`, so the image keeps both.
 *
 * With `dark`, it renders a light and a dark `<picture>` and CSS shows the one
 * for the active theme. The theme is only known in the browser, so this can't
 * be decided at render. Both images load lazily, so the hidden one isn't fetched.
 */
export const Image = ({
  src,
  dark,
  alt,
  ratio,
  maxWidth,
  matte,
  caption,
  width,
  height,
  loading,
  className,
  style,
  children,
  ...props
}: ImageProps) => {
  const prose = maxWidth === 'prose';
  const { layoutClassName, layoutStyle, rest } = resolveLayoutProps({
    ...props,
    maxWidth: prose ? undefined : maxWidth,
  });
  const imgProps = {
    ...rest,
    // Attributes, not layout props: they give the image its intrinsic size.
    width,
    height,
    loading: loading ?? (dark ? 'lazy' : undefined),
    className: cx(
      // `.box` resets inherited layout custom properties (ADR 0008).
      'box',
      'image',
      ratio && 'image--ratio',
      prose && 'image--max-prose',
      matte && 'image--matte',
      layoutClassName,
      className,
    ),
    style: {
      ...(ratio && { '--image-ratio': ratio }),
      ...layoutStyle,
      ...style,
    } as CSSProperties,
  };

  const renderPicture = (
    initial: SourceValue,
    breakpoints: Breakpoints,
    themeClassName?: string,
  ) => {
    const sources = LARGEST_FIRST.flatMap((breakpoint) => {
      const source = breakpoints[breakpoint];
      return source
        ? [
            <source
              key={breakpoint}
              {...sourceAttrs(source)}
              media={`(min-width: ${BREAKPOINTS[breakpoint]})`}
            />,
          ]
        : [];
    });
    const img = <img {...imgProps} {...imgSourceAttrs(initial)} alt={alt} />;
    return children || sources.length || themeClassName ? (
      <picture className={themeClassName}>
        {children}
        {sources}
        {img}
      </picture>
    ) : (
      img
    );
  };

  const light = splitSource(src);
  let image: ReactNode;
  if (dark) {
    const darkSource = splitSource(dark);
    image = (
      <>
        {renderPicture(light.initial, light.breakpoints, 'image-theme image-theme--light')}
        {renderPicture(
          darkSource.initial,
          { ...light.breakpoints, ...darkSource.breakpoints },
          'image-theme image-theme--dark',
        )}
      </>
    );
  } else {
    image = renderPicture(light.initial, light.breakpoints);
  }

  return caption ? (
    <figure className="image-figure">
      {image}
      <Text as="figcaption" variant="caption" color="muted">
        {caption}
      </Text>
    </figure>
  ) : (
    image
  );
};
