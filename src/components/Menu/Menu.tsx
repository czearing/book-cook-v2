"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretRightIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Menu.module.css";
import type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuLabelProps,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubContentProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
} from "./Menu.types";

/**
 * Menu root using Radix DropdownMenu.
 */
export const Menu = (props: MenuProps) => <DropdownMenu.Root {...props} />;

/**
 * Menu trigger. Use with `asChild` for custom triggers.
 */
export const MenuTrigger = (props: MenuTriggerProps) => (
  <DropdownMenu.Trigger {...props} />
);

export const MenuGroup = (props: MenuGroupProps) => (
  <DropdownMenu.Group {...props} />
);

export const MenuRadioGroup = (props: MenuRadioGroupProps) => (
  <DropdownMenu.RadioGroup {...props} />
);

/**
 * Menu content panel.
 */
export const MenuContent = ({
  className,
  sideOffset = 8,
  align = "start",
  ...props
}: MenuContentProps) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className={clsx(styles.content, className)}
      sideOffset={sideOffset}
      align={align}
      {...props}
    />
  </DropdownMenu.Portal>
);

/**
 * Standard menu item.
 */
export const MenuItem = ({
  className,
  startIcon,
  endIcon,
  shortcut,
  inset = false,
  children,
  ...props
}: MenuItemProps) => (
  <DropdownMenu.Item
    className={clsx(styles.item, inset && styles.inset, className)}
    {...props}
  >
    {startIcon && <span className={styles.itemIcon}>{startIcon}</span>}
    <span className={styles.itemLabel}>{children}</span>
    {(shortcut || endIcon) && (
      <span className={styles.itemMeta}>
        {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
        {endIcon && <span className={styles.itemIcon}>{endIcon}</span>}
      </span>
    )}
  </DropdownMenu.Item>
);

/**
 * Checkbox menu item with indicator.
 */
export const MenuCheckboxItem = ({
  className,
  shortcut,
  children,
  ...props
}: MenuCheckboxItemProps) => (
  <DropdownMenu.CheckboxItem
    className={clsx(styles.checkboxItem, className)}
    {...props}
  >
    <span className={styles.indicatorSlot}>
      <DropdownMenu.ItemIndicator className={styles.indicator}>
        <span className={styles.checkmark} aria-hidden="true" />
      </DropdownMenu.ItemIndicator>
    </span>
    <span className={styles.itemLabel}>{children}</span>
    {shortcut && (
      <span className={styles.itemMeta}>
        <span className={styles.shortcut}>{shortcut}</span>
      </span>
    )}
  </DropdownMenu.CheckboxItem>
);

/**
 * Radio menu item with indicator.
 */
export const MenuRadioItem = ({
  className,
  shortcut,
  children,
  ...props
}: MenuRadioItemProps) => (
  <DropdownMenu.RadioItem
    className={clsx(styles.radioItem, className)}
    {...props}
  >
    <span className={styles.indicatorSlot}>
      <DropdownMenu.ItemIndicator className={styles.indicator}>
        <span className={styles.radiomark} aria-hidden="true" />
      </DropdownMenu.ItemIndicator>
    </span>
    <span className={styles.itemLabel}>{children}</span>
    {shortcut && (
      <span className={styles.itemMeta}>
        <span className={styles.shortcut}>{shortcut}</span>
      </span>
    )}
  </DropdownMenu.RadioItem>
);

/**
 * Menu label for grouping.
 */
export const MenuLabel = ({
  className,
  inset = false,
  ...props
}: MenuLabelProps) => (
  <DropdownMenu.Label
    className={clsx(styles.label, inset && styles.inset, className)}
    {...props}
  />
);

/**
 * Separator line between groups.
 */
export const MenuSeparator = ({
  className,
  ...props
}: MenuSeparatorProps) => (
  <DropdownMenu.Separator
    className={clsx(styles.separator, className)}
    {...props}
  />
);

export const MenuSub = DropdownMenu.Sub;

/**
 * Submenu trigger item.
 */
export const MenuSubTrigger = ({
  className,
  startIcon,
  inset = false,
  children,
  ...props
}: MenuSubTriggerProps) => (
  <DropdownMenu.SubTrigger
    className={clsx(styles.subTrigger, inset && styles.inset, className)}
    {...props}
  >
    {startIcon && <span className={styles.itemIcon}>{startIcon}</span>}
    <span className={styles.itemLabel}>{children}</span>
    <CaretRightIcon size={16} className={styles.subCaret} aria-hidden="true" />
  </DropdownMenu.SubTrigger>
);

/**
 * Submenu content panel.
 */
export const MenuSubContent = ({
  className,
  sideOffset = 6,
  ...props
}: MenuSubContentProps) => (
  <DropdownMenu.Portal>
    <DropdownMenu.SubContent
      className={clsx(styles.content, className)}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenu.Portal>
);
