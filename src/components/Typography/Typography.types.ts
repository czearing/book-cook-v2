import type { ElementType, ReactNode } from "react";

type TextVariant =
  | "recipeTitle"
  | "focusStep"
  | "bodyText"
  | "sectionLabel"
  | "metaLabel";

export interface TypographyProps<T extends ElementType = ElementType> {
  /**
   * The content of the Typography component
   */
  children: ReactNode;

  /**
   * Additional class names to apply to the Typography component
   */
  className?: string;

  /**
   * The HTML element or React component to render as the Typography component
   */
  as?: T;
}

export interface TextProps extends TypographyProps {
  /**
   * The variant style to apply to the Typography component
   */
  variant?: TextVariant;

  /**
   * Whether the text should be bold.
   */
  bold?: boolean;

  /**
   * Whether the text should be italic.
   */
  italic?: boolean;

  /**
   * Whether the text should be underlined.
   */
  underline?: boolean;

  /**
   * Whether the text should have a strikethrough.
   */
  strikethrough?: boolean;
}
