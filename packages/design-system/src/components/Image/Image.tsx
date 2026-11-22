import { type CSSProperties, type HTMLAttributes } from 'react';
import './Image.css';
import { cx } from '../../utils/cx.js';

export type ImageProps = HTMLAttributes<HTMLDivElement> & {
  ratio?: string;
};

export const Image = ({ className, ratio, style, children, ...props }: ImageProps) => (
  <div
    className={cx('image', className)}
    style={ratio ? ({ '--image-ratio': ratio, ...style } as CSSProperties) : style}
    {...props}
  >
    {children ?? 'Image placeholder'}
  </div>
);
