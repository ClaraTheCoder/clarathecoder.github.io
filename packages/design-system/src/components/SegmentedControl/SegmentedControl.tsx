import { type CSSProperties, type ReactNode, useId } from 'react';
import './SegmentedControl.css';
import { cx } from '../../utils/cx.js';

export interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  'aria-label': string;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export const SegmentedControl = ({
  options,
  value,
  onValueChange,
  disabled,
  name,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps) => {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx('segmented-control', className)}
      style={
        {
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
          '--_count': options.length,
          '--_index': selectedIndex,
        } as CSSProperties
      }
    >
      <span className="segmented-control__thumb" aria-hidden="true" />
      {options.map((option) => (
        <label
          key={option.value}
          className="segmented-control__segment"
          data-label={typeof option.label === 'string' ? option.label : undefined}
        >
          <input
            type="radio"
            className="segmented-control__input"
            name={groupName}
            value={option.value}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            onChange={() => onValueChange(option.value)}
          />
          <span className="segmented-control__label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
