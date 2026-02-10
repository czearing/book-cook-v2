"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
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

const loadSidebarSearchDialog = () => import("./SidebarSearchDialog");

const SidebarSearchDialog = dynamic(
  () => loadSidebarSearchDialog().then((mod) => mod.SidebarSearchDialog),
  { ssr: false }
);

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }
    const nextQuery = searchParams?.get("q") ?? "";
    setSearchQuery(nextQuery);
  }, [isSearchOpen, searchParams]);

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set("q", trimmed);
    }
    const queryString = params.toString();
    onNavigate?.(queryString ? `/?${queryString}` : "/");
    setIsSearchOpen(false);
  };

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
          if (item.id === "search") {
            setIsSearchOpen(true);
            return;
          }
          if (item.path) {
            onNavigate?.(item.path);
          }
        }}
        onMouseEnter={() => {
          if (item.id === "search") {
            loadSidebarSearchDialog();
          }
        }}
        onFocus={() => {
          if (item.id === "search") {
            loadSidebarSearchDialog();
          }
        }}
      />
    );
  };

  return (
    <>
      {TOP_ITEMS.map((item) => renderLeaf(item, 0))}
      {isSearchOpen && (
        <SidebarSearchDialog
          open={isSearchOpen}
          onOpenChange={setIsSearchOpen}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />
      )}
    </>
  );
};
