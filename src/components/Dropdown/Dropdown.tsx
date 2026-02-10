"use client";

import * as Select from "@radix-ui/react-select";
import { CaretDownIcon, CaretUpIcon, CheckIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Dropdown.module.css";
import type {
  DropdownContentProps,
  DropdownGroupProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownProps,
  DropdownSeparatorProps,
  DropdownTriggerProps,
  DropdownValueProps,
} from "./Dropdown.types";

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

/**
 * Dropdown root using Radix Select.
 */
export const Dropdown = (props: DropdownProps) => <Select.Root {...props} />;

/**
 * Dropdown trigger button.
 */
export const DropdownTrigger = ({
  className,
  size = "md",
  fullWidth = false,
  ...props
}: DropdownTriggerProps) => (
  <Select.Trigger
    className={clsx(
      styles.trigger,
      sizeStyles[size],
      fullWidth && styles.fullWidth,
      className
    )}
    {...props}
  />
);

/**
 * Value slot for selected option.
 */
export const DropdownValue = ({ className, ...props }: DropdownValueProps) => (
  <Select.Value className={clsx(styles.value, className)} {...props} />
);

/**
 * Content panel with optional scroll buttons and viewport.
 */
export const DropdownContent = ({
  className,
  viewportClassName,
  showScrollButtons = true,
  position = "popper",
  sideOffset = 8,
  children,
  ...props
}: DropdownContentProps) => (
  <Select.Portal>
    <Select.Content
      className={clsx(styles.content, className)}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      {showScrollButtons && (
        <Select.ScrollUpButton className={styles.scrollButton}>
          <CaretUpIcon size={14} />
        </Select.ScrollUpButton>
      )}
      <Select.Viewport className={clsx(styles.viewport, viewportClassName)}>
        {children}
      </Select.Viewport>
      {showScrollButtons && (
        <Select.ScrollDownButton className={styles.scrollButton}>
          <CaretDownIcon size={14} />
        </Select.ScrollDownButton>
      )}
    </Select.Content>
  </Select.Portal>
);

export const DropdownGroup = (props: DropdownGroupProps) => (
  <Select.Group {...props} />
);

/**
 * Dropdown label for grouping.
 */
export const DropdownLabel = ({
  className,
  ...props
}: DropdownLabelProps) => (
  <Select.Label className={clsx(styles.label, className)} {...props} />
);

/**
 * Separator line between groups.
 */
export const DropdownSeparator = ({
  className,
  ...props
}: DropdownSeparatorProps) => (
  <Select.Separator className={clsx(styles.separator, className)} {...props} />
);

/**
 * Dropdown option item.
 */
export const DropdownItem = ({
  className,
  startIcon,
  description,
  children,
  ...props
}: DropdownItemProps) => (
  <Select.Item className={clsx(styles.item, className)} {...props}>
    {startIcon && <span className={styles.itemIcon}>{startIcon}</span>}
    <span className={styles.itemText}>
      <Select.ItemText>{children}</Select.ItemText>
      {description && (
        <span className={styles.itemDescription}>{description}</span>
      )}
    </span>
    <Select.ItemIndicator className={styles.itemIndicator}>
      <CheckIcon size={14} weight="bold" />
    </Select.ItemIndicator>
  </Select.Item>
);

/**
 * Caret icon to place inside the trigger.
 */
export const DropdownCaret = () => (
  <Select.Icon className={styles.caret}>
    <CaretDownIcon size={16} />
  </Select.Icon>
);
