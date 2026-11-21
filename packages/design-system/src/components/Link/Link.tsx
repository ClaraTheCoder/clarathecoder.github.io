import { type ElementType } from 'react';
import './Link.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type LinkVariant = 'default' | 'plain';

export type LinkProps<E extends ElementType = 'a'> = Polymorphic<E, { variant?: LinkVariant }>;

export const Link = <E extends ElementType = 'a'>({
  as,
  variant = 'default',
  className,
  ...props
}: LinkProps<E>) => {
  const Component = (as ?? 'a') as ElementType;
  return (
    <Component className={cx('link', variant === 'plain' && 'link--plain', className)} {...props} />
  );
};
