import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SidebarItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon shown in the sidebar item.
   */
  icon: ReactNode;
  /**
   * Label shown in the sidebar item.
   */
  label: string;
  /**
   * Whether the item is active.
   */
  active?: boolean;
  /**
   * Optional indentation level for nested items.
   */
  depth?: number;
  /**
   * Optional trailing content (badge, chevron, etc).
   */
  endAdornment?: ReactNode;
}
