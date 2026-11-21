import { type ElementType } from 'react';
import './VisuallyHidden.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type VisuallyHiddenProps<E extends ElementType = 'span'> = Polymorphic<E>;

export const VisuallyHidden = <E extends ElementType = 'span'>({
  as,
  className,
  ...props
}: VisuallyHiddenProps<E>) => {
  const Component = (as ?? 'span') as ElementType;
  return <Component className={cx('visually-hidden', className)} {...props} />;
};
