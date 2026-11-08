import { type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from 'react';
import { cx } from '../../utils/cx.js';
import { resolveLayoutProps, type LayoutProps } from './layoutProps.js';

export interface BoxProps extends ComponentPropsWithoutRef<'div'>, LayoutProps {
  /** Render as this element (default `<div>`). */
  as?: ElementType;
}

/**
 * Box — the base layout primitive. A plain block with the shared layout prop
 * surface (padding, margin, sizing, position, flex/grid item props). Polymorphic
 * via the `as` prop.
 *
 * Every primitive (Box/Flex/Grid) carries the shared `.box` marker class. It has
 * no visual styling; it is the hook for the generated nested-primitive inheritance
 * reset (ADR 0008) that stops an ancestor's responsive layout rung from leaking
 * into a nested primitive.
 */
export const Box = ({ as, ...props }: BoxProps) => {
  const Component = (as ?? 'div') as ElementType;
  const { layoutClassName, layoutStyle, rest } = resolveLayoutProps(props);
  const { className, style, ...domProps } = rest as ComponentPropsWithoutRef<'div'>;
  return (
    <Component
      className={cx('box', layoutClassName, className)}
      style={{ ...layoutStyle, ...(style as CSSProperties) }}
      {...domProps}
    />
  );
};
