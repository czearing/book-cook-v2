"use client";

import { MagnifyingGlassIcon, TagIcon } from "@phosphor-icons/react";

import { Input } from "@/components";

import styles from "./RecipeGalleryControls.module.css";
import type { RecipeGalleryControlsProps } from "./RecipeGalleryControls.types";

export const RecipeGalleryControls = ({
  searchValue,
  tagsValue,
  onSearchChange,
  onTagsChange,
}: RecipeGalleryControlsProps) => (
  <div className={styles.controls}>
    <Input
      className={styles.field}
      fullWidth
      startIcon={<MagnifyingGlassIcon size={16} />}
      value={searchValue}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search recipes"
      aria-label="Search recipes"
    />
    <Input
      className={styles.field}
      fullWidth
      startIcon={<TagIcon size={16} />}
      value={tagsValue}
      onChange={(event) => onTagsChange(event.target.value)}
      placeholder="Filter by tags (comma separated)"
      aria-label="Filter recipes by tags"
    />
  </div>
);
