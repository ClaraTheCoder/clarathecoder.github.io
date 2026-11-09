import { type ReactNode } from 'react';
import './Hero.css';
import { cx } from '../../utils/cx.js';
import { Text } from '../Text/index.js';

export interface HeroProps {
  /** The page title, rendered as the display-size `<h1>`. */
  title: string;
  /** The lead copy that sits below the title. */
  children: ReactNode;
  className?: string;
}

export const Hero = ({ title, children, className }: HeroProps) => (
  <header className={cx('page-hero', className)}>
    <Text variant="display-1" as="h1">
      {title}
    </Text>
    <div className="prose">{children}</div>
  </header>
);
