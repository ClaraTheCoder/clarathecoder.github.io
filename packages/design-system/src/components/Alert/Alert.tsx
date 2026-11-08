import { type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export const Alert = ({ variant = 'info', className, children, ...props }: AlertProps) => (
  <div role="alert" className={cx('alert', `alert--${variant}`, className)} {...props}>
    {children}
  </div>
);

export const AlertIcon = ({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cx('alert__icon', className)} aria-hidden="true" {...props}>
    {children}
  </span>
);

export const AlertTitle = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('alert__title', className)} {...props}>
    {children}
  </div>
);

export const AlertDescription = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('alert__description', className)} {...props}>
    {children}
  </div>
);
