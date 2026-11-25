import { type ReactNode } from 'react';
import './NumberedList.css';
import { cx } from '../../utils/cx.js';

export interface NumberedListProps {
  /** `2` sets the items in two columns when there's room. */
  columns?: 1 | 2;
  /** `NumberedListItem`s. */
  children: ReactNode;
  className?: string;
}

export const NumberedList = ({ columns = 1, children, className }: NumberedListProps) => (
  <ol className={cx('numbered-list', columns === 2 && 'numbered-list--2-col', className)}>
    {children}
  </ol>
);

export interface NumberedListItemProps {
  /** An optional bold run-in before the text. */
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const NumberedListItem = ({ lead, children, className }: NumberedListItemProps) => (
  <li className={cx('numbered-list__item', className)}>
    <div className="numbered-list__text">
      {lead && <strong className="numbered-list__lead">{lead}</strong>} {children}
    </div>
  </li>
);
