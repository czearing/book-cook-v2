import type { ReactNode } from "react";

export type SaveStateContextValue = {
  isDirty: boolean;
  debouncedIsDirty: boolean;
  updateTitle: (title: string) => void;
  markDataDirty: () => void;
  getTitle: () => string;
};

export type RecipeViewSaveStateProviderProps = {
  initialTitle: string;
  initialData: string;
  children: ReactNode;
};
