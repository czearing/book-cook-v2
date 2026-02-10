import type { ComponentType } from "react";

export type SidebarIcon = ComponentType<{ size?: number }>;

export type SidebarLeafItem = {
  id: string;
  label: string;
  icon: SidebarIcon;
};

export type SidebarSectionItem = {
  id: string;
  label: string;
  icon?: SidebarIcon;
  variant?: "section" | "item";
  children: Array<SidebarLeafItem | SidebarSectionItem>;
};

export type SidebarContentProps = {
  defaultActiveId?: string;
};
