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
      ...rest
    } = props;

    const Icon = checked ? CheckSquareIcon : SquareIcon;

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
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
