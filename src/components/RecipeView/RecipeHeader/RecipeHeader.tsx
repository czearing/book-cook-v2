"use client";

import { useEffect, useRef } from "react";
import {
  CalendarBlankIcon,
  ChartBarIcon,
  TagIcon,
  UserIcon,
} from "@phosphor-icons/react";

import { RecipeEmoji } from "./RecipeEmoji";
import styles from "./RecipeHeader.module.css";
import type { RecipeHeaderProps } from "./RecipeHeader.types";
import { RecipePropertyRow } from "./RecipePropertyRow";
import { RecipeStats } from "./RecipeStats";
import { RecipeTags } from "./RecipeTags";
import { useRecipeViewSaveState } from "../RecipeViewSaveStateContext";

import { RecipeTitle } from "../../Typography";

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const RecipeHeader = ({
  recipe,
  viewingMode,
  onTagClick,
  onTagsChange,
}: RecipeHeaderProps) => {
  const isEditable = viewingMode === "editor";
  const showTags = isEditable || recipe.tags.length > 0;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const saveState = useRecipeViewSaveState();

  useEffect(() => {
    if (!isEditable || !titleRef.current) {
      return;
    }
    if (titleRef.current.textContent !== recipe.title) {
      titleRef.current.textContent = recipe.title;
    }
  }, [recipe.title, isEditable]);

  return (
    <header className={styles.header}>
      <div
        className={styles.cover}
        style={
          recipe.imageURL
            ? { backgroundImage: `url(${recipe.imageURL})` }
            : undefined
        }
        role="img"
        aria-label={recipe.title}
      />
      <div className={`${styles.main} ${isEditable ? styles.editorAligned : ""}`}>
        <RecipeEmoji emoji={recipe.emoji} />
        {isEditable ? (
          <RecipeTitle
            ref={titleRef}
            className={`${styles.title} ${styles.editableTitle}`}
            contentEditable
            suppressContentEditableWarning
            onInput={(event) => {
              saveState?.updateTitle(event.currentTarget.textContent ?? "");
            }}
          />
        ) : (
          <RecipeTitle className={styles.title}>{recipe.title}</RecipeTitle>
        )}
        <div className={styles.metaGrid}>
          <div>
            <RecipePropertyRow icon={<UserIcon size={14} />} label="Chef">
              <span className={styles.linkText}>
                {recipe.creatorName ?? recipe.owner}
              </span>
            </RecipePropertyRow>
            {showTags && (
              <RecipePropertyRow icon={<TagIcon size={14} />} label="Tags">
                <RecipeTags
                  tags={recipe.tags}
                  editable={isEditable}
                  onTagClick={onTagClick}
                  onTagsChange={onTagsChange}
                />
              </RecipePropertyRow>
            )}
          </div>
          <div>
            <RecipePropertyRow
              icon={<CalendarBlankIcon size={14} />}
              label="Created"
            >
              {formatDate(recipe.createdAt)}
            </RecipePropertyRow>
            {(recipe.viewCount ?? 0) > 0 || (recipe.savedCount ?? 0) > 0 ? (
              <RecipePropertyRow
                icon={<ChartBarIcon size={14} />}
                label="Stats"
              >
                <RecipeStats
                  viewCount={recipe.viewCount}
                  savedCount={recipe.savedCount}
                />
              </RecipePropertyRow>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
