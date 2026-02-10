"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  RecipeViewSaveStateProviderProps,
  SaveStateContextValue,
} from "./RecipeViewSaveStateContext.types";

const RecipeViewSaveStateContext = createContext<SaveStateContextValue | null>(
  null
);

export const RecipeViewSaveStateProvider = ({
  initialTitle,
  initialData,
  children,
}: RecipeViewSaveStateProviderProps) => {
  const initial = useRef({ title: initialTitle });
  const current = useRef({ title: initialTitle });
  const dataDirty = useRef(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    initial.current = { title: initialTitle };
    current.current = { title: initialTitle };
    dataDirty.current = false;
    setIsDirty(false);
  }, [initialTitle, initialData]);

  const recompute = useCallback(() => {
    const dirty =
      current.current.title !== initial.current.title || dataDirty.current;
    setIsDirty(dirty);
  }, []);

  const updateTitle = useCallback(
    (title: string) => {
      if (current.current.title === title) {
        return;
      }
      current.current.title = title;
      recompute();
    },
    [recompute]
  );

  const markDataDirty = useCallback(() => {
    if (dataDirty.current) {
      return;
    }
    dataDirty.current = true;
    setIsDirty(true);
  }, []);

  const value = useMemo(
    () => ({ isDirty, updateTitle, markDataDirty }),
    [isDirty, updateTitle, markDataDirty]
  );

  return (
    <RecipeViewSaveStateContext.Provider value={value}>
      {children}
    </RecipeViewSaveStateContext.Provider>
  );
};

export const useRecipeViewSaveState = () =>
  useContext(RecipeViewSaveStateContext);
