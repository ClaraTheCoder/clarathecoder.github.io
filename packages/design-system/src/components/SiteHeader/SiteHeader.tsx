import './SiteHeader.css';
import { cx } from '../../utils/cx.js';
import { Link } from '../Link/index.js';

export interface SiteHeaderLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  /** The brand / wordmark link (top-left). */
  brand: SiteHeaderLink;
  /** Main navigation links (top-right). */
  nav: SiteHeaderLink[];
  className?: string;
}

export const SiteHeader = ({ brand, nav, className }: SiteHeaderProps) => (
  <header className={cx('site-header', 'container', className)}>
    <div className="site-header__brand">
      <Link variant="quiet" href={brand.href}>
        {brand.label}
      </Link>
    </div>
    <div className="site-header__right">
      <nav aria-label="Main" className="site-nav">
        {nav.map((item) => (
          <Link key={item.href} variant="quiet" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);
