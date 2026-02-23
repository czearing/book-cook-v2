import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";

import {
  RecipeViewSaveStateProvider,
  useRecipeViewSaveState,
} from "./RecipeViewSaveStateContext";

const makeWrapper = (initialTitle: string, initialData: string) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <RecipeViewSaveStateProvider initialTitle={initialTitle} initialData={initialData}>
      {children}
    </RecipeViewSaveStateProvider>
  );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
};

describe("RecipeViewSaveStateContext", () => {
  it("starts with isDirty false", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Title", "data"),
    });
    expect(result.current?.isDirty).toBe(false);
  });

  it("isDirty becomes true after markDataDirty", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Title", "data"),
    });
    act(() => {
      result.current?.markDataDirty();
    });
    expect(result.current?.isDirty).toBe(true);
  });

  it("isDirty becomes true after updateTitle with different title", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Title", "data"),
    });
    act(() => {
      result.current?.updateTitle("New Title");
    });
    expect(result.current?.isDirty).toBe(true);
  });

  it("isDirty stays false after updateTitle with same title", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Title", "data"),
    });
    act(() => {
      result.current?.updateTitle("Title");
    });
    expect(result.current?.isDirty).toBe(false);
  });

  it("getTitle returns the current title after updateTitle", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Original", "data"),
    });
    act(() => {
      result.current?.updateTitle("Updated Title");
    });
    expect(result.current?.getTitle()).toBe("Updated Title");
  });

  it("getTitle returns initial title before any updates", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), {
      wrapper: makeWrapper("Original", "data"),
    });
    expect(result.current?.getTitle()).toBe("Original");
  });
});
