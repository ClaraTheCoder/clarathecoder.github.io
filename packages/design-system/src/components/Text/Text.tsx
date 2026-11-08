import { type ElementType } from 'react';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';

export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'lead'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline'
  | 'code';

/** Semantic text colours (the semantic `--color-text-*` tokens). */
export type TextColor = 'default' | 'muted' | 'subtle' | 'on-color';

export type TextProps<E extends ElementType = 'p'> = Polymorphic<
  E,
  { variant?: TextVariant; color?: TextColor }
>;

export const Text = <E extends ElementType = 'p'>({ as, variant = 'body', color, className, ...props }: TextProps<E>) => {
  const Component = (as ?? 'p') as ElementType;
  return (
    <Component className={cx(`text-${variant}`, color && `text-${color}`, className)} {...props} />
  );
};
