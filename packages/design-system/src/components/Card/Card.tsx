import { type ElementType, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';
import './Card.css';

export type CardProps<E extends ElementType = 'div'> = Polymorphic<E>;

export const Card = <E extends ElementType = 'div'>({ as, className, ...props }: CardProps<E>) => {
  const Component = (as ?? 'div') as ElementType;
  return <Component className={cx('card', className)} {...props} />;
};

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('card__header', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('card__title', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('card__description', className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('card__content', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('card__footer', className)} {...props} />
);
