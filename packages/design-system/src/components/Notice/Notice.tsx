import { type ElementType } from 'react';
import './Notice.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type NoticeProps<E extends ElementType = 'a'> = Polymorphic<E>;

export const Notice = <E extends ElementType = 'a'>({
  as,
  className,
  children,
  ...props
}: NoticeProps<E>) => {
  const Component = (as ?? 'a') as ElementType;
  return (
    <Component className={cx('notice', className)} {...props}>
      {children}
    </Component>
  );
};
