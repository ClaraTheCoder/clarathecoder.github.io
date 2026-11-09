import { type ElementType } from 'react';
import './Link.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type LinkProps<E extends ElementType = 'a'> = Polymorphic<E>;


export const Link = <E extends ElementType = 'a'>({ as, className, ...props }: LinkProps<E>) => {
  const Component = (as ?? 'a') as ElementType;
  return <Component className={cx('link', className)} {...props} />;
};
