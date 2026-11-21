import {
  createContext,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  useContext,
  useId,
} from 'react';
import './RadioCards.css';
import { cx } from '../../utils/cx.js';
import { VisuallyHidden } from '../VisuallyHidden/index.js';

interface RadioCardsContextValue {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioCardsContext = createContext<RadioCardsContextValue | null>(null);

export type RadioCardsProps = Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> & {
  legend: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
};

export const RadioCards = ({
  legend,
  value,
  onValueChange,
  name,
  disabled,
  className,
  children,
  ...props
}: RadioCardsProps) => {
  const generatedName = useId();
  return (
    <RadioCardsContext.Provider value={{ name: name ?? generatedName, value, onValueChange }}>
      <fieldset className={cx('radio-cards', className)} disabled={disabled} {...props}>
        <VisuallyHidden as="legend">{legend}</VisuallyHidden>
        {children}
      </fieldset>
    </RadioCardsContext.Provider>
  );
};

export type RadioCardProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'title'> & {
  value: string;
  title: ReactNode;
  description?: ReactNode;
};

export const RadioCard = ({ value, title, description, className, ...props }: RadioCardProps) => {
  const group = useContext(RadioCardsContext);
  if (!group) throw new Error('<RadioCard> must be used inside <RadioCards>.');

  return (
    <label className={cx('radio-card', className)} {...props}>
      <span className="radio-card__header">
        <input
          type="radio"
          className="radio-card__input"
          name={group.name}
          value={value}
          checked={group.value === value}
          onChange={() => group.onValueChange(value)}
        />
        <span className="radio-card__title">{title}</span>
      </span>
      {/* Only visible in raw mode (ADR 0009), where the spans run inline. */}
      {description && (
        <>
          <span className="radio-card__separator" aria-hidden="true">
            {' – '}
          </span>
          <span className="radio-card__description">{description}</span>
        </>
      )}
    </label>
  );
};
