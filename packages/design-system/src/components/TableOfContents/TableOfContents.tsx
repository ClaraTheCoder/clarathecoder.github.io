import { type HTMLAttributes, useId } from 'react';
import './TableOfContents.css';
import './toc-progress.js';
import { cx } from '../../utils/cx.js';
import { Text } from '../Text/index.js';
import { Link } from '../Link/index.js';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'toc-progress': HTMLAttributes<HTMLElement>;
    }
  }
}

export interface TocEntry {
  id: string;
  label: string;
}

export interface TableOfContentsProps {
  entries: TocEntry[];
  title?: string;
  className?: string;
}

export const TableOfContents = ({
  entries,
  title = 'Contents',
  className,
}: TableOfContentsProps) => {
  const titleId = useId();
  if (entries.length < 2) return null;

  return (
    <nav className={cx('toc', className)} aria-labelledby={titleId}>
      <Text variant="heading-5" as="h2" id={titleId} className="toc__title">
        {title}
      </Text>
      <toc-progress>
        <ol className="toc__list">
          {entries.map((entry) => (
            <li key={entry.id} className="toc__item">
              <span className="toc__dot" aria-hidden="true" />
              <Link variant="plain" href={`#${entry.id}`} className="toc__link">
                {entry.label}
              </Link>
            </li>
          ))}
        </ol>
      </toc-progress>
    </nav>
  );
};
