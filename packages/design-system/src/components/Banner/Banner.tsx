import { type ReactNode, useId } from 'react';
import './Banner.css';
import { cx } from '../../utils/cx.js';
import { Text } from '../Text/index.js';

export interface BannerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Banner = ({ title, children, className }: BannerProps) => {
  const titleId = useId();
  return (
    <section className={cx('banner', className)} aria-labelledby={titleId}>
      <Text variant="display-2" as="h2" id={titleId} className="banner__title">
        {title}
      </Text>
      <div className="banner__body">{children}</div>
    </section>
  );
};
