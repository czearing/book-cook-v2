import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type * as Select from "@radix-ui/react-select";

export type DropdownSize = "sm" | "md" | "lg";

export type DropdownProps = ComponentPropsWithoutRef<typeof Select.Root>;

export type DropdownTriggerProps = ComponentPropsWithoutRef<typeof Select.Trigger> & {
  /**
   * Size of the trigger.
   * @default "md"
   */
  size?: DropdownSize;
  /**
   * Whether the trigger should take the full width of its container.
   */
  fullWidth?: boolean;
};

export type DropdownValueProps = ComponentPropsWithoutRef<typeof Select.Value> & {
  /**
   * Optional class names for the value.
   */
  className?: string;
};

export type DropdownContentProps = ComponentPropsWithoutRef<typeof Select.Content> & {
  /**
   * Optional class names for the content panel.
   */
  className?: string;
  /**
   * Optional class names for the viewport that wraps items.
   */
  viewportClassName?: string;
  /**
   * Whether to show scroll buttons when the list overflows.
   * @default true
   */
  showScrollButtons?: boolean;
};

export type DropdownGroupProps = ComponentPropsWithoutRef<typeof Select.Group>;

export type DropdownLabelProps = ComponentPropsWithoutRef<typeof Select.Label> & {
  /**
   * Optional class names for the label.
   */
  className?: string;
};

export type DropdownItemProps = ComponentPropsWithoutRef<typeof Select.Item> & {
  /**
   * Optional icon displayed at the start of the option.
   */
  startIcon?: ReactNode;
  /**
   * Optional secondary description displayed under the label.
   */
  description?: ReactNode;
  /**
   * Optional class names for the option.
   */
  className?: string;
};

export type DropdownSeparatorProps = ComponentPropsWithoutRef<typeof Select.Separator> & {
  /**
   * Optional class names for the separator.
   */
  className?: string;
};
