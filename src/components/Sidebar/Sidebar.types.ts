import type { HTMLAttributes, ReactNode } from "react";

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
   * Width of the collapsed sidebar.
   * @default 72
   */
  collapsedWidth?: number | string;
  /**
   * User profile details shown at the bottom of the sidebar.
   */
  profile?: SidebarProfile;
  /**
   * Show the collapse/expand toggle.
   * @default true
   */
  showToggle?: boolean;
}

export type SidebarProfile = {
  /**
   * Display name for the user.
   */
  name: string;
  /**
   * Optional click handler for the profile area.
   */
  onClick?: () => void;
  /**
   * Accessible label for the profile action.
   */
  ariaLabel?: string;
  /**
   * Optional profile image URL.
   */
  imageURL?: string;
  /**
   * Optional secondary line of text under the name.
   */
  meta?: string;
};
