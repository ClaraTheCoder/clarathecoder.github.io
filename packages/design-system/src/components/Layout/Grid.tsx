import { type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from 'react';
import './Grid.css';
import { cx } from '../../utils/cx.js';
import { resolveLayoutProps, type LayoutProps, type GridLayoutProps } from './layoutProps.js';

export interface GridProps extends ComponentPropsWithoutRef<'div'>, LayoutProps, GridLayoutProps {
  /** Render as this element (default `<div>`). */
  as?: ElementType;
}

export const Grid = ({ as, ...props }: GridProps) => {
  const Component = (as ?? 'div') as ElementType;
  const { layoutClassName, layoutStyle, rest } = resolveLayoutProps(props);
  const { className, style, ...domProps } = rest as ComponentPropsWithoutRef<'div'>;
  return (
    <Component
      className={cx('box', 'grid', layoutClassName, className)}
      style={{ ...layoutStyle, ...(style as CSSProperties) }}
      {...domProps}
    />
  );
};
