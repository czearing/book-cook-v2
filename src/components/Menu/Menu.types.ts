import type { ReactNode } from "react";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuRootProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";

export type MenuProps = DropdownMenuRootProps;
export type MenuTriggerProps = DropdownMenuTriggerProps;
export type MenuGroupProps = DropdownMenuGroupProps;
export type MenuRadioGroupProps = DropdownMenuRadioGroupProps;

export type MenuContentProps = DropdownMenuContentProps & {
  /**
   * Optional class names for the menu content.
   */
  className?: string;
};

export type MenuItemProps = DropdownMenuItemProps & {
  /**
   * Optional icon displayed at the start of the item.
   */
  startIcon?: ReactNode;
  /**
   * Optional icon displayed at the end of the item.
   */
  endIcon?: ReactNode;
  /**
   * Optional shortcut text displayed on the right.
   */
  shortcut?: string;
  /**
   * Adds extra left padding to align with items that have indicators.
   * @default false
   */
  inset?: boolean;
};

export type MenuCheckboxItemProps = DropdownMenuCheckboxItemProps & {
  /**
   * Optional shortcut text displayed on the right.
   */
  shortcut?: string;
};

export type MenuRadioItemProps = DropdownMenuRadioItemProps & {
  /**
   * Optional shortcut text displayed on the right.
   */
  shortcut?: string;
};

export type MenuLabelProps = DropdownMenuLabelProps & {
  /**
   * Adds extra left padding to align with items that have indicators.
   * @default false
   */
  inset?: boolean;
};

export type MenuSeparatorProps = DropdownMenuSeparatorProps;

export type MenuSubTriggerProps = DropdownMenuSubTriggerProps & {
  /**
   * Optional icon displayed at the start of the item.
   */
  startIcon?: ReactNode;
  /**
   * Adds extra left padding to align with items that have indicators.
   * @default false
   */
  inset?: boolean;
};

export type MenuSubContentProps = DropdownMenuSubContentProps;
