"use client";
import * as React from "react";
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
      checked, // Do NOT default this value
      defaultChecked = false,
      disabled = false,
      className,
      onClick,
      ...rest
    } = props;

    // 1. Determine if the component is controlled or uncontrolled
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);

    // 2. The source of truth is either the controlled prop or internal state
    const isChecked = isControlled ? checked : internalChecked;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // 3. If uncontrolled, update our own state
      if (!isControlled) {
        setInternalChecked(!internalChecked);
      }
      // 4. Always call the parent's onClick handler if it exists
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " " && !disabled) {
        e.preventDefault();
        handleClick(e as any); // Simulate a click event
      }
    };

    const Icon = isChecked ? CheckSquareIcon : SquareIcon;

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        tabIndex={disabled ? undefined : 0}
        onClick={!disabled ? handleClick : undefined}
        onKeyDown={handleKeyDown}
        className={clsx(
          styles.checkbox,
          isChecked && styles.checked,
          disabled && styles.disabled,
          className
        )}
        {...rest}
      >
        <Icon weight={isChecked ? "fill" : "regular"} size={24} />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
