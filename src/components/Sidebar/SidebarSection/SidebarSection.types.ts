import type { HTMLAttributes, ReactNode } from "react";

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section label text.
   */
  label: string;
  /**
   * Optional indentation level for nested sections.
   */
  depth?: number;
  /**
   * Visual treatment for the accordion trigger.
   * @default "section"
   */
  variant?: "section" | "item";
  /**
   * Optional icon to render alongside the label (item variant only).
   */
  icon?: ReactNode;
  /**
   * Optional end adornment to render alongside the label (item variant only).
   */
  endAdornment?: ReactNode;
  /**
   * Section content to render inside the accordion panel.
   */
  children?: ReactNode;
  /**
   * Whether the section is open by default.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
}
