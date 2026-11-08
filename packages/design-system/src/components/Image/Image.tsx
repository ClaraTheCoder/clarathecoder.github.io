import { type HTMLAttributes } from 'react';
import './Image.css';
import { cx } from '../../utils/cx.js';

export type ImageProps = HTMLAttributes<HTMLDivElement>;

export const Image = ({ className, children, ...props }: ImageProps) => (
  <div className={cx('image', className)} {...props}>
    {children ?? 'Image placeholder'}
  </div>
);
