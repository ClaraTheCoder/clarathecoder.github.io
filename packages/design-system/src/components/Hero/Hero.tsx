import { Fragment, type CSSProperties, type ReactNode } from 'react';
import './Hero.css';
import { cx } from '../../utils/cx.js';
import { Text } from '../Text/index.js';

export interface HeroProps {
  /** The page title, rendered as the display-size `<h1>`. */
  title: string;
  /** The lead copy that sits below the title. */
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const Hero = ({ title, children, actions, className }: HeroProps) => {
  const words = title.split(/\s+/);
  return (
    <header className={cx('page-hero', className)}>
      <Text variant="display-1" as="h1" aria-label={title}>
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span className="page-hero__word" aria-hidden="true">
              <span style={{ '--page-hero-word': index } as CSSProperties}>{word}</span>
            </span>
          </Fragment>
        ))}
      </Text>
      <div className="prose">{children}</div>
      {actions && <div className="page-hero__actions">{actions}</div>}
    </header>
  );
};
