import type { ReactNode } from "react";

export type RecipePropertyRowProps = {
  /**
   * Leading icon for the row.
   */
  icon: ReactNode;
  /**
   * Label describing the value.
   */
  label: string;
  /**
   * Value contents for the row.
   */
  children: ReactNode;
};
