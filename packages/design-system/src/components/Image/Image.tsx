import { type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { resolveLayoutProps, type LayoutProps } from '../Layout/layoutProps.js';
import { Text } from '../Text/index.js';
import './Image.css';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'children'> &
  Omit<LayoutProps, 'width' | 'height' | 'maxWidth'> & {
    src: string;
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
     * `<source>` elements, ahead of `src` in a `<picture>`, e.g. a still frame
     * for `(prefers-reduced-motion: reduce)`.
     */
    children?: ReactNode;
  };

/**
 * Takes Box's layout props (padding, margin, …). Padding sits inside the
 * rounded corners and `ratio`, so the image keeps both.
 */
export const Image = ({
  src,
  alt,
  ratio,
  maxWidth,
  matte,
  caption,
  width,
  height,
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
  const image = children ? (
    <picture>
      {children}
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  ) : (
    <img src={src} alt={alt} {...imgProps} />
  );
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
