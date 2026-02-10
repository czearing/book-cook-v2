"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";

import type {
  SidebarContentProps,
  SidebarLeafItem,
} from "./SidebarContent.types";
import { SidebarItem } from "./SidebarItem";

const TOP_ITEMS: SidebarLeafItem[] = [
  { id: "search", label: "Search", icon: MagnifyingGlassIcon },
  { id: "new-recipe", label: "New recipe", icon: PlusCircleIcon },
  { id: "recipes", label: "Recipes", icon: BookOpenIcon, path: "/recipes" },
];

const DEFAULT_ACTIVE_ID = "recipes";

export const SidebarContent = ({
  defaultActiveId = DEFAULT_ACTIVE_ID,
  onNavigate,
}: SidebarContentProps) => {
  const [activeId, setActiveId] = useState(defaultActiveId);

  const renderLeaf = (item: SidebarLeafItem, depth = 0) => {
    const Icon = item.icon;
    const size = depth > 0 ? 16 : 18;
    return (
      <SidebarItem
        key={item.id}
        depth={depth}
        icon={<Icon size={size} />}
        label={item.label}
        active={activeId === item.id}
        onClick={() => {
          setActiveId(item.id);
          if (item.path) {
            onNavigate?.(item.path);
          }
        }}
      />
    );
  };

  return <>{TOP_ITEMS.map((item) => renderLeaf(item, 0))}</>;
};
