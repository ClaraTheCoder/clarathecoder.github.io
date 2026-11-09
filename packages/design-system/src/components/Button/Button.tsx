import { type ElementType } from 'react';
import './Button.css';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps<E extends ElementType = 'button'> = Polymorphic<
  E,
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
  }
>;

export const Button = <E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  className,
  ...props
}: ButtonProps<E>) => {
  const Component = (as ?? 'button') as ElementType;
  const typeProp = Component === 'button' && !('type' in props) ? { type: 'button' as const } : {};
  return (
    <Component
      className={cx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        iconOnly && 'button--icon-only',
        className,
      )}
      {...typeProp}
      {...props}
    />
  );
};
