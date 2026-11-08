import { type HTMLAttributes } from 'react';
import './SiteFooter.css';
import { cx } from '../../utils/cx.js';

export type SiteFooterProps = HTMLAttributes<HTMLElement>;

export const SiteFooter = ({ className, children, ...props }: SiteFooterProps) => (
  <footer className={cx('site-footer', 'container', className)} {...props}>
    {children}
  </footer>
);
