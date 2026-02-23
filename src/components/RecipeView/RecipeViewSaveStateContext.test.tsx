import type { ReactNode } from "react";
import { useState } from "react";
import { act, render, renderHook, screen } from "@testing-library/react";

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

// Renders a self-contained test fixture that exposes context state via data
// attributes and action buttons so tests can drive it without violating lint
// rules about mutating variables from inside components.
const DebouncedResetFixture = () => {
  const [data, setData] = useState("data-v1");
  return (
    <RecipeViewSaveStateProvider initialTitle="Title" initialData={data}>
      <DebouncedResetInner onChangeData={() => setData("data-v2")} />
    </RecipeViewSaveStateProvider>
  );
};

const DebouncedResetInner = ({ onChangeData }: { onChangeData: () => void }) => {
  const ctx = useRecipeViewSaveState();
  return (
    <div
      data-testid="state"
      data-is-dirty={String(ctx?.isDirty)}
      data-debounced={String(ctx?.debouncedIsDirty)}
    >
      <button onClick={() => ctx?.markDataDirty()}>mark-dirty</button>
      <button onClick={onChangeData}>change-data</button>
    </div>
  );
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

  describe("debouncedIsDirty", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    it("starts false", () => {
      const { result } = renderHook(() => useRecipeViewSaveState(), {
        wrapper: makeWrapper("Title", "data"),
      });
      expect(result.current?.debouncedIsDirty).toBe(false);
    });

    it("stays false immediately after becoming dirty", () => {
      const { result } = renderHook(() => useRecipeViewSaveState(), {
        wrapper: makeWrapper("Title", "data"),
      });
      act(() => {
        result.current?.markDataDirty();
      });
      expect(result.current?.debouncedIsDirty).toBe(false);
    });

    it("becomes true after 1000ms", () => {
      const { result } = renderHook(() => useRecipeViewSaveState(), {
        wrapper: makeWrapper("Title", "data"),
      });
      act(() => {
        result.current?.markDataDirty();
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(result.current?.debouncedIsDirty).toBe(true);
    });

    it("debouncedIsDirty resets to false when initialData changes", () => {
      // Render the fixture that holds initialData in state and exposes
      // DOM buttons so we can drive state changes without lint violations.
      render(<DebouncedResetFixture />);

      const stateEl = screen.getByTestId("state");
      const markDirtyBtn = screen.getByRole("button", { name: "mark-dirty" });
      const changeDataBtn = screen.getByRole("button", { name: "change-data" });

      // Make dirty and let debounce fire
      act(() => {
        markDirtyBtn.click();
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(stateEl.dataset.debounced).toBe("true");

      // Change initialData to trigger the provider reset effect
      act(() => {
        changeDataBtn.click();
      });
      // The debounce effect uses a 0ms setTimeout to clear debouncedIsDirty
      act(() => {
        jest.advanceTimersByTime(0);
      });
      expect(stateEl.dataset.debounced).toBe("false");
    });
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
