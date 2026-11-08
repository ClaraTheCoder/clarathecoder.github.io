import { type HTMLAttributes } from 'react';
import './Video.css';
import { cx } from '../../utils/cx.js';

export type VideoProps = HTMLAttributes<HTMLDivElement>;

export const Video = ({ className, ...props }: VideoProps) => (
  <div className={cx('video', className)} {...props}>
    <span className="video__play" aria-hidden="true">
      ▶
    </span>
  </div>
);
