import { forwardRef } from "react";
import { SquareIcon, CheckSquareIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Checkbox.module.css";
import type { CheckboxProps } from "./Checkbox.types";

/**
 * Checkbox component for toggling boolean options.
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (props, ref) => {
    const {
      checked = false,
      disabled = false,
      className,
      children,
      onClick,
      ...rest
    } = props;

    const Icon = checked ? CheckSquareIcon : SquareIcon;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Allow toggling with Space bar
      if (e.key === " " && !disabled) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick?.(e as any);
      }
    };

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        // 1. Make it focusable (0 = in tab order, undefined = removed if disabled)
        tabIndex={disabled ? undefined : 0}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={handleKeyDown}
        className={clsx(
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
          className
        )}
        {...rest}
      >
        <Icon weight={checked ? "fill" : "regular"} size={24} />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
