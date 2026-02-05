import { clsx } from "clsx";
import Image from "next/image";

import styles from "./RecipeCard.module.css";
import type { RecipeCardProps } from "./RecipeCard.types";
import { BodyText, MetaLabel } from "../Typography";

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

const formatCount = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const RecipeCard = ({
  recipe,
  onClick,
  className,
  showMeta = true,
}: RecipeCardProps) => {
  const isInteractive = Boolean(onClick);
  const viewCount = recipe.viewCount ?? 0;
  const creatorName = recipe.creatorName ?? recipe.owner;

  const metaParts = [
    { key: "views", label: `${formatCount(viewCount)} views` },
    { key: "created", label: formatDate(recipe.createdAt) },
  ].filter(Boolean) as { key: string; label: string }[];
  const hasImage = Boolean(recipe.imageURL);

  const content = (
    <>
      <div
        className={clsx(styles.media, !hasImage && styles.mediaFallback)}
        role={!hasImage ? "img" : undefined}
        aria-label={!hasImage ? recipe.title : undefined}
      >
        {hasImage ? (
          <Image
            src={recipe.imageURL}
            alt={recipe.title}
            fill
            sizes="(max-width: 720px) 100vw, 240px"
            className={styles.mediaImage}
          />
        ) : (
          <span className={styles.emoji} aria-hidden="true">
            {recipe.emoji || "🍲"}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <BodyText as="h3" className={styles.title}>
          {recipe.title}
        </BodyText>
        {showMeta && creatorName && (
          <MetaLabel as="span" className={styles.creator}>
            {creatorName}
          </MetaLabel>
        )}
        {showMeta && (
          <div className={styles.metaRow}>
            {metaParts.map((part, index) => (
              <span key={part.key} className={styles.metaGroup}>
                {index > 0 && (
                  <span className={styles.dot} aria-hidden="true">
                    •
                  </span>
                )}
                <MetaLabel as="span" className={styles.metaItem}>
                  {part.label}
                </MetaLabel>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={() => onClick?.(recipe)}
        className={clsx(styles.card, styles.interactive, className)}
      >
        {content}
      </button>
    );
  }

  return <article className={clsx(styles.card, className)}>{content}</article>;
};
