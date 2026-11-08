import { type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from 'react';
import './Flex.css';
import { cx } from '../../utils/cx.js';
import { resolveLayoutProps, type LayoutProps, type FlexLayoutProps } from './layoutProps.js';

export interface FlexProps extends ComponentPropsWithoutRef<'div'>, LayoutProps, FlexLayoutProps {
  /** Render as this element (default `<div>`). */
  as?: ElementType;
}

export const Flex = ({ as, ...props }: FlexProps) => {
  const Component = (as ?? 'div') as ElementType;
  const { layoutClassName, layoutStyle, rest } = resolveLayoutProps(props);
  const { className, style, ...domProps } = rest as ComponentPropsWithoutRef<'div'>;
  return (
    <Component
      className={cx('box', 'flex', layoutClassName, className)}
      style={{ ...layoutStyle, ...(style as CSSProperties) }}
      {...domProps}
    />
  );
};
