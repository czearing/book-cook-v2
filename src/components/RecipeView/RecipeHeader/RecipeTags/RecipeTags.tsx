import { BodyText } from "../../../Typography";

import styles from "./RecipeTags.module.css";
import type { RecipeTagsProps } from "./RecipeTags.types";

export const RecipeTags = ({ tags }: RecipeTagsProps) => (
  <div className={styles.tagList}>
    {tags.map((tag) => (
      <BodyText as="span" key={tag} className={styles.tag}>
        {tag}
      </BodyText>
    ))}
  </div>
);
