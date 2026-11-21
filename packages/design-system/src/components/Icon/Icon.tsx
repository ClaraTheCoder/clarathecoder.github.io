import { type CSSProperties, type HTMLAttributes } from 'react';
import './Icon.css';
import { cx } from '../../utils/cx.js';

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'circle-check'
  | 'circle-x'
  | 'heart'
  | 'house'
  | 'info'
  | 'monitor'
  | 'moon'
  | 'palette'
  | 'play'
  | 'plus'
  | 'settings'
  | 'sun'
  | 'triangle-alert'
  | 'x';

export const glyph = (property: string, name: IconName) =>
  ({ [property]: `var(--icon-${name})` }) as CSSProperties;

export type IconProps = HTMLAttributes<HTMLSpanElement> & { name: IconName };

export const Icon = ({ name, className, style, ...props }: IconProps) => (
  <span
    className={cx('icon', className)}
    style={{ ...glyph('--_glyph', name), ...style }}
    aria-hidden="true"
    {...props}
  />
);
