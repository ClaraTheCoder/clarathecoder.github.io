import { type HTMLAttributes } from 'react';
import './Container.css';
import { cx } from '../../utils/cx.js';

export type ContainerVariant = 'prose';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** `prose` caps the width at the reading measure (`--size-container-prose`)
   *  instead of the full page width. */
  variant?: ContainerVariant;
}

export const Container = ({ variant, className, children, ...props }: ContainerProps) => (
  <div className={cx('container', variant && `container--${variant}`, className)} {...props}>
    {children}
  </div>
);
