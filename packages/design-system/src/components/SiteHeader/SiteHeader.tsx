import { type ReactNode } from 'react';
import './SiteHeader.css';
import { cx } from '../../utils/cx.js';
import { Button } from '../Button/index.js';
import { VisuallyHidden } from '../VisuallyHidden/index.js';

export interface SiteHeaderLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  brand: SiteHeaderLink;
  /** Main navigation links (top-right). */
  nav: SiteHeaderLink[];
  current?: string;
  actions?: ReactNode;
  className?: string;
}

const trimSlash = (path: string) => path.replace(/\/+$/, '') || '/';

const isCurrent = (href: string, current?: string) => {
  if (!current) return false;
  const [h, c] = [trimSlash(href), trimSlash(current)];
  return c === h || c.startsWith(`${h}/`);
};

export const SiteHeader = ({ brand, nav, current, actions, className }: SiteHeaderProps) => (
  <header className={cx('site-header', 'container', className)}>
    <div className="site-header__bar">
      <Button
        as="a"
        variant="ghost"
        iconOnly
        icon="house"
        href={brand.href}
        aria-current={isCurrent(brand.href, current) ? 'page' : undefined}
      >
        <VisuallyHidden>{brand.label}</VisuallyHidden>
      </Button>
      <div className="site-header__right">
        <nav aria-label="Main" className="site-nav">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Button
                  as="a"
                  variant="ghost"
                  href={item.href}
                  aria-current={isCurrent(item.href, current) ? 'page' : undefined}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {actions}
      </div>
    </div>
  </header>
);
