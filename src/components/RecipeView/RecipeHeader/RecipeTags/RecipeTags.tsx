import { TagEditor } from "../../../TagEditor";

import styles from "./RecipeTags.module.css";
import type { RecipeTagsProps } from "./RecipeTags.types";

export const RecipeTags = ({
  tags,
  onTagClick,
  onTagsChange,
  editable,
}: RecipeTagsProps) => (
  <div className={styles.tagList}>
    <TagEditor
      tags={tags}
      onTagClick={onTagClick}
      onTagsChange={onTagsChange}
      editable={editable}
    />
  </div>
);
