import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Sidebar contents.
   */
  children?: ReactNode;
  /**
   * Initial collapsed state for uncontrolled sidebars.
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * Controlled collapsed state.
   */
  collapsed?: boolean;
  /**
   * Callback when the collapsed state changes.
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Collapse automatically at or below this breakpoint (px).
   * @default 900
   */
  collapseBreakpoint?: number;
  /**
   * Width of the expanded sidebar.
   * @default 280
   */
  width?: number | string;
  /**
   * Minimum width when resizing (px).
   * @default 200
   */
  minWidth?: number;
  /**
   * Maximum width when resizing (px).
   * @default 360
   */
  maxWidth?: number;
  /**
   * Allow resizing the sidebar width by dragging.
   * @default true
   */
  resizable?: boolean;
  /**
   * Callback when the width changes via resizing.
   */
  onWidthChange?: (width: number) => void;
  /**
   * Width of the collapsed sidebar.
   * @default 72
   */
  collapsedWidth?: number | string;
  /**
   * Show the collapse/expand toggle.
   * @default true
   */
  showToggle?: boolean;
}

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
}
