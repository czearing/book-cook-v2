"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  FileTextIcon,
  FolderSimpleIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";

import type {
  SidebarContentProps,
  SidebarLeafItem,
  SidebarSectionItem,
} from "./SidebarContent.types";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";

const TOP_ITEMS: SidebarLeafItem[] = [
  { id: "new-recipe", label: "New recipe", icon: PlusCircleIcon },
  { id: "search", label: "Search", icon: MagnifyingGlassIcon },
  { id: "recipes", label: "Recipes", icon: BookOpenIcon, path: "/recipes" },
];

const RECIPES_SECTION: SidebarSectionItem = {
  id: "your-recipes",
  label: "Your recipes",
  icon: FolderSimpleIcon,
  variant: "item",
  children: [
    { id: "spicy-miso-ramen", label: "Spicy Miso Ramen", icon: FileTextIcon },
    { id: "avocado-toast", label: "Avocado Toast", icon: FileTextIcon },
    { id: "sheet-pan-salmon", label: "Sheet Pan Salmon", icon: FileTextIcon },
  ],
};

const FAVORITES_SECTION: SidebarSectionItem = {
  id: "your-favorites",
  label: "Your favorites",
  icon: HeartIcon,
  variant: "item",
  children: [
    { id: "green-power-smoothie", label: "Green Power Smoothie", icon: FileTextIcon },
    { id: "classic-carbonara", label: "Classic Carbonara", icon: FileTextIcon },
  ],
};

const DEFAULT_ACTIVE_ID = "spicy-miso-ramen";

const isSection = (
  item: SidebarLeafItem | SidebarSectionItem
): item is SidebarSectionItem => "children" in item;

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

  const renderSection = (section: SidebarSectionItem, depth = 0) => {
    const Icon = section.icon;
    return (
      <SidebarSection
        key={section.id}
        label={section.label}
        icon={Icon ? <Icon size={18} /> : undefined}
        variant={section.variant ?? "section"}
        depth={depth}
      >
        {section.children.map((child) =>
          isSection(child)
            ? renderSection(child, depth + 1)
            : renderLeaf(child, depth + 1)
        )}
      </SidebarSection>
    );
  };

  return (
    <>
      {TOP_ITEMS.map((item) => renderLeaf(item, 0))}
      {renderSection(RECIPES_SECTION, 0)}
      {renderSection(FAVORITES_SECTION, 0)}
    </>
  );
};
