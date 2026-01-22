import styles from "./RecipeEmoji.module.css";
import type { RecipeEmojiProps } from "./RecipeEmoji.types";

export const RecipeEmoji = ({ emoji }: RecipeEmojiProps) => (
  <div className={styles.emoji} aria-hidden="true">
    {emoji}
  </div>
);
