import type { ReactNode } from "react";

export type SaveStateContextValue = {
  isDirty: boolean;
  updateTitle: (title: string) => void;
  markDataDirty: () => void;
};

export type RecipeViewSaveStateProviderProps = {
  initialTitle: string;
  initialData: string;
  children: ReactNode;
};
