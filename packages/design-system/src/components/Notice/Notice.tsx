import { type HTMLAttributes } from 'react';
import './Notice.css';
import { cx } from '../../utils/cx.js';

export type NoticeProps = HTMLAttributes<HTMLDivElement>;

export const Notice = ({ className, children, ...props }: NoticeProps) => (
  <div className={cx('notice', className)} {...props}>
    {children}
  </div>
);
