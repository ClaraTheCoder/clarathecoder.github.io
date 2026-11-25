import { type ElementType } from 'react';
import './Card.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type CardVariant = 'primary' | 'secondary';

export type CardProps<E extends ElementType = 'div'> = Polymorphic<
  E,
  {
    /** `primary` stands out (a tinted surface, `<strong>` in the accent colour); `secondary` is quieter (an outline). Presets restyle both. */
    variant?: CardVariant;
    /** `2` flows the content into two columns when there's room, breaking wherever it falls. */
    columns?: 1 | 2;
  }
>;

export const Card = <E extends ElementType = 'div'>({
  as,
  variant = 'primary',
  columns = 1,
  className,
  children,
  ...props
}: CardProps<E>) => {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cx('card', `card--${variant}`, columns === 2 && 'card--2-col', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
