import { type ElementType, type ReactNode } from 'react';
import './Card.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';
import { Text } from '../Text/index.js';

export type CardVariant = 'primary' | 'secondary';

export type CardProps<E extends ElementType = 'div'> = Polymorphic<
  E,
  {
    /** `primary` stands out (a tinted surface, `<strong>` in the accent colour); `secondary` is quieter (an outline). Presets restyle both. */
    variant?: CardVariant;
    /** A short label, set as an overline in the accent colour. */
    heading?: ReactNode;
    /** The heading's element (default `h2`). */
    headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  }
>;

export const Card = <E extends ElementType = 'div'>({
  as,
  variant = 'primary',
  heading,
  headingAs = 'h2',
  className,
  children,
  ...props
}: CardProps<E>) => {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component className={cx('card', `card--${variant}`, className)} {...props}>
      {heading && (
        <Text as={headingAs} variant="overline" className="card__heading">
          {heading}
        </Text>
      )}
      {children}
    </Component>
  );
};
