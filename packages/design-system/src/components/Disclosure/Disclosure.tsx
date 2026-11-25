import { type HTMLAttributes, type ReactNode } from 'react';
import './Disclosure.css';
import { cx } from '../../utils/cx.js';
import { Text, type TextVariant } from '../Text/index.js';
import { Icon } from '../Icon/index.js';

export type DisclosureListProps = HTMLAttributes<HTMLDivElement>;

export const DisclosureList = ({ className, ...props }: DisclosureListProps) => (
  <div className={cx('disclosure-list', className)} {...props} />
);

export interface DisclosureProps {
  title: string;
  variant?: TextVariant;
  open?: boolean;
  className?: string;
  children: ReactNode;
}

export const Disclosure = ({
  title,
  variant = 'heading-2',
  open,
  className,
  children,
}: DisclosureProps) => (
  <details className={cx('disclosure', className)} open={open}>
    <summary className="disclosure__summary">
      <Text variant={variant} as="span" className="disclosure__title">
        {title}
      </Text>
      <Icon name="plus" className="disclosure__icon" />
    </summary>
    <div className="disclosure__body">{children}</div>
  </details>
);
