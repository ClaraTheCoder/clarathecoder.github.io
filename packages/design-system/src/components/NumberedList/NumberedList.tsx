import { type ReactNode } from 'react';
import './NumberedList.css';
import { cx } from '../../utils/cx.js';

export interface NumberedListProps {
  /** `NumberedListItem`s. */
  children: ReactNode;
  className?: string;
}

export const NumberedList = ({ children, className }: NumberedListProps) => (
  <ol className={cx('numbered-list', className)}>{children}</ol>
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
