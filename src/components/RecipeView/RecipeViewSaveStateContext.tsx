"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  const [debouncedIsDirty, setDebouncedIsDirty] = useState(false);

  useEffect(() => {
    initial.current = { title: initialTitle };
    current.current = { title: initialTitle };
    dataDirty.current = false;
    setIsDirty(false);
    setDebouncedIsDirty(false);
  }, [initialTitle, initialData]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedIsDirty(isDirty),
      isDirty ? 1000 : 0
    );
    return () => clearTimeout(timer);
  }, [isDirty]);

  const recompute = () => {
    const dirty =
      current.current.title !== initial.current.title || dataDirty.current;
    setIsDirty(dirty);
  };

  const updateTitle = (title: string) => {
    if (current.current.title === title) {
      return;
    }
    current.current.title = title;
    recompute();
  };

  const markDataDirty = () => {
    if (dataDirty.current) {
      return;
    }
    dataDirty.current = true;
    setIsDirty(true);
  };

  const getTitle = () => current.current.title;

  const value = { isDirty, debouncedIsDirty, updateTitle, markDataDirty, getTitle };

  return (
    <RecipeViewSaveStateContext.Provider value={value}>
      {children}
    </RecipeViewSaveStateContext.Provider>
  );
};

export const useRecipeViewSaveState = () =>
  useContext(RecipeViewSaveStateContext);
