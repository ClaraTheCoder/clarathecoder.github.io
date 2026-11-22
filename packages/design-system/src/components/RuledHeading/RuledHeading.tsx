import './RuledHeading.css';
import { cx } from '../../utils/cx.js';
import { Text, type TextVariant } from '../Text/index.js';

export interface RuledHeadingProps {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: TextVariant;
  id?: string;
  className?: string;
  children: string;
}

export const RuledHeading = ({ as = 'h2', variant = 'heading-2', className, ...props }: RuledHeadingProps) => (
  <Text as={as} variant={variant} className={cx('ruled-heading', className)} {...props} />
);
