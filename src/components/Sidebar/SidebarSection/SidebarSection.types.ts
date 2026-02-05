import type { HTMLAttributes } from "react";

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section label text.
   */
  label: string;
  /**
   * Optional indentation level for nested sections.
   */
  depth?: number;
}
