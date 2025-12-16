import { clsx } from "clsx";

import styles from "./Typography.module.css";
import type { TextProps, TypographyProps } from "./Typography.types";

const variants = {
  recipeTitle: { style: styles.recipeTitle, tag: "h1" },
  focusStep: { style: styles.focusStep, tag: "p" },
  bodyText: { style: styles.bodyText, tag: "p" },
  sectionLabel: { style: styles.sectionLabel, tag: "h2" },
  metaLabel: { style: styles.metaLabel, tag: "span" },
} as const;

/**
 * A versatile Typography component for rendering text with various styles and HTML elements.
 */
export const Text: React.FC<TextProps> = (props) => {
  const { variant = "bodyText", as, className, ...rest } = props;

  const config = variants[variant];
  const Component = as ?? config.tag;

  return <Component className={clsx(config.style, className)} {...rest} />;
};

export const RecipeTitle = (props: TypographyProps) => (
  <Text variant="recipeTitle" {...props} />
);
export const FocusStep = (props: TypographyProps) => (
  <Text variant="focusStep" {...props} />
);
export const BodyText = (props: TypographyProps) => (
  <Text variant="bodyText" {...props} />
);
export const SectionLabel = (props: TypographyProps) => (
  <Text variant="sectionLabel" {...props} />
);
export const MetaLabel = (props: TypographyProps) => (
  <Text variant="metaLabel" {...props} />
);
