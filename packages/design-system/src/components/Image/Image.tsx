import { type CSSProperties, type HTMLAttributes } from 'react';
import './Image.css';
import { cx } from '../../utils/cx.js';

export type ImageProps = HTMLAttributes<HTMLDivElement> & {
  ratio?: string;
  /** Caps the image's width; `prose` matches the prose container. */
  maxWidth?: 'prose';
};

export const Image = ({ className, ratio, maxWidth, style, children, ...props }: ImageProps) => (
  <div
    className={cx('image', maxWidth && `image--max-${maxWidth}`, className)}
    style={ratio ? ({ '--image-ratio': ratio, ...style } as CSSProperties) : style}
    {...props}
  >
    {children ?? 'Image placeholder'}
  </div>
);
