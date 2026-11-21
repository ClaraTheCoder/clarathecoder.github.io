import { type ElementType } from 'react';
import './Button.css';
import { cx } from '../../utils/cx.js';
import { glyph, type IconName } from '../Icon/Icon.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type ButtonVariant = 'primary' | 'fixed' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps<E extends ElementType = 'button'> = Polymorphic<
  E,
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
    icon?: IconName;
    iconEnd?: IconName;
  }
>;

export const Button = <E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  icon,
  iconEnd,
  className,
  style,
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
        icon && 'button--icon',
        iconEnd && 'button--icon-end',
        className,
      )}
      style={{
        ...(icon && glyph('--_glyph', icon)),
        ...(iconEnd && glyph('--_glyph-end', iconEnd)),
        ...style,
      }}
      {...typeProp}
      {...props}
    />
  );
};
