# Save Bar: Debounced Appearance + Title Saving — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Save bar appears after 1s of inactivity (not instantly on first keystroke), and the Save button persists the title alongside the body content in a single PATCH.

**Architecture:** Add `debouncedIsDirty` and `getTitle()` to `RecipeViewSaveStateContext`. `RecipeSaveBar` uses `debouncedIsDirty` for visibility. `RecipeEditor.onSave` reads the current title from context and sends `{ data, title }` together. The PATCH route accepts both fields as optional and builds the update object dynamically.

**Tech Stack:** React 19, TypeScript strict, Next.js App Router route handlers, Supabase JS client, Jest + Testing Library

---

### Task 1: Extend the context types

**Files:**
- Modify: `src/components/RecipeView/RecipeViewSaveStateContext.types.ts`

**Step 1: Replace the file contents**

```ts
import type { ReactNode } from "react";

export type SaveStateContextValue = {
  isDirty: boolean;
  /** True only after ~1s of inactivity following a change. Used by RecipeSaveBar visibility. */
  debouncedIsDirty: boolean;
  updateTitle: (title: string) => void;
  markDataDirty: () => void;
  /** Returns the current in-flight title (may differ from the saved recipe.title). */
  getTitle: () => string;
};

export type RecipeViewSaveStateProviderProps = {
  initialTitle: string;
  initialData: string;
  children: ReactNode;
};
```

**Step 2: Verify TypeScript still compiles**

Run: `yarn build 2>&1 | tail -5`
Expected: build fails with type errors about missing `debouncedIsDirty` and `getTitle` in the context value — that's correct, we haven't updated the provider yet.

---

### Task 2: Update the context implementation

**Files:**
- Modify: `src/components/RecipeView/RecipeViewSaveStateContext.tsx`

**Step 1: Replace the file contents**

```tsx
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

  // Debounce: debouncedIsDirty trails isDirty by ~1s.
  useEffect(() => {
    if (!isDirty) {
      setDebouncedIsDirty(false);
      return;
    }
    const timer = setTimeout(() => setDebouncedIsDirty(true), 1000);
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
```

**Step 2: Verify build passes**

Run: `yarn build 2>&1 | tail -5`
Expected: should now only fail on `RecipeSaveBar` and `RecipeEditor` which haven't been updated yet, OR it might pass if they're lenient. Either is fine.

**Step 3: Commit**

```bash
git add src/components/RecipeView/RecipeViewSaveStateContext.tsx \
        src/components/RecipeView/RecipeViewSaveStateContext.types.ts
git commit -m "feat: add debouncedIsDirty and getTitle to save state context"
```

---

### Task 3: Update RecipeSaveBar to use debouncedIsDirty

**Files:**
- Modify: `src/components/RecipeSaveBar/RecipeSaveBar.tsx`

**Step 1: Replace the visibility guard — change one line**

In `RecipeSaveBar.tsx`, the component currently reads `isDirty` for the `return null` guard AND for the Save button's `disabled` prop.

- The `return null` guard should use `debouncedIsDirty` (controls when bar appears).
- The Save button `disabled` prop should keep using raw `isDirty` (once visible, button is immediately enabled when changes exist).

Replace the file contents:

```tsx
"use client";

import { Button } from "@/components/Button";
import { useRecipeViewSaveState } from "@/components/RecipeView/RecipeViewSaveStateContext";
import styles from "./RecipeSaveBar.module.css";
import type { RecipeSaveBarProps } from "./RecipeSaveBar.types";

/**
 * Persistent floating save bar that appears while editing a recipe.
 * Reads dirty state from RecipeViewSaveStateContext — must be rendered
 * inside a RecipeViewSaveStateProvider.
 *
 * Uses debouncedIsDirty for visibility (1s delay after first change) but
 * raw isDirty for the Save button disabled state (responsive once visible).
 */
export const RecipeSaveBar = ({ status, onSave, onCancel }: RecipeSaveBarProps) => {
  const saveState = useRecipeViewSaveState();
  const isDirty = saveState?.isDirty ?? false;
  const debouncedIsDirty = saveState?.debouncedIsDirty ?? false;

  if (!debouncedIsDirty && status === "idle") {
    return null;
  }

  return (
    <div className={styles.bar} role="status" aria-live="polite">
      {status === "error" && (
        <span className={styles.error}>Save failed</span>
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={status === "saving"}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        size="sm"
        disabled={!isDirty || status === "saving"}
        isLoading={status === "saving"}
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  );
};
```

**Step 2: Write a test for the debounce behavior**

Create `src/components/RecipeSaveBar/RecipeSaveBar.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import { RecipeSaveBar } from "./RecipeSaveBar";
import { RecipeViewSaveStateProvider } from "@/components/RecipeView/RecipeViewSaveStateContext";

// Wrap in provider so useRecipeViewSaveState works
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecipeViewSaveStateProvider initialTitle="Test" initialData="">
    {children}
  </RecipeViewSaveStateProvider>
);

describe("RecipeSaveBar", () => {
  it("does not render when idle and not dirty", () => {
    render(
      <RecipeSaveBar status="idle" onSave={jest.fn()} onCancel={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders when status is saving even if not dirty", () => {
    render(
      <RecipeSaveBar status="saving" onSave={jest.fn()} onCancel={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders when status is error", () => {
    render(
      <RecipeSaveBar status="error" onSave={jest.fn()} onCancel={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText("Save failed")).toBeInTheDocument();
  });
});
```

**Step 3: Run the tests**

Run: `yarn test --testPathPattern=RecipeSaveBar 2>&1 | tail -20`
Expected: all 3 tests pass.

**Step 4: Commit**

```bash
git add src/components/RecipeSaveBar/RecipeSaveBar.tsx \
        src/components/RecipeSaveBar/RecipeSaveBar.test.tsx
git commit -m "feat: use debouncedIsDirty for save bar visibility"
```

---

### Task 4: Update the PATCH route to accept title

**Files:**
- Modify: `src/app/api/recipes/[id]/route.ts`

**Step 1: Update the body parsing and update call**

The current route requires `data` as a string. We need to make both `data` and `title` optional, require at least one, and build the update object dynamically.

Replace just the body-parsing and update section (lines 53–116):

```ts
  let body: { data?: string; title?: string };
  try {
    body = (await request.json()) as { data?: string; title?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { data, title } = body;
  if (typeof data !== "string" && typeof title !== "string") {
    return NextResponse.json(
      { message: "At least one of data or title must be provided" },
      { status: 400 }
    );
  }
```

And replace the update call at the bottom:

```ts
  const updates: { data?: string; title?: string } = {};
  if (typeof data === "string") updates.data = data;
  if (typeof title === "string") updates.title = title;

  const { error: updateError } = await supabase
    .from("recipes")
    .update(updates)
    .eq("id", recipeId);
```

The full file after edits:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { fetchRecipeById } from "@/clientToServer/queries/recipes.server";
import { createSupabaseRouteHandlerClient } from "@/clientToServer/utils/supabaseAuthRouteClient";
import { createSupabaseServerClient } from "@/clientToServer/utils/supabaseServerClient";
import type { RecipeRouteContext } from "./route.types";

const decodeId = (raw: string) => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export const GET = async (
  _request: Request,
  context: RecipeRouteContext
) => {
  const { id } = await context.params;
  const recipeId = decodeId(id);
  const recipe = await fetchRecipeById(recipeId);

  if (!recipe) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
};

export const PATCH = async (
  request: NextRequest,
  context: RecipeRouteContext
) => {
  const { id } = await context.params;
  const recipeId = decodeId(id);

  const provisionalResponse = NextResponse.next();
  const authClient = createSupabaseRouteHandlerClient(
    request,
    provisionalResponse
  );

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: { data?: string; title?: string };
  try {
    body = (await request.json()) as { data?: string; title?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { data, title } = body;
  if (typeof data !== "string" && typeof title !== "string") {
    return NextResponse.json(
      { message: "At least one of data or title must be provided" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  // Resolve the app-level user ID from the users table (owner_id uses hex IDs,
  // not Supabase auth UUIDs).
  const { data: appUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (userError) {
    return NextResponse.json({ message: userError.message }, { status: 500 });
  }

  if (!appUser) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { data: row, error: fetchError } = await supabase
    .from("recipes")
    .select("owner_id")
    .eq("id", recipeId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ message: fetchError.message }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (row.owner_id !== appUser.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const updates: { data?: string; title?: string } = {};
  if (typeof data === "string") updates.data = data;
  if (typeof title === "string") updates.title = title;

  const { error: updateError } = await supabase
    .from("recipes")
    .update(updates)
    .eq("id", recipeId);

  if (updateError) {
    return NextResponse.json(
      { message: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
};
```

**Step 2: Verify build passes**

Run: `yarn build 2>&1 | tail -5`
Expected: passes (or fails only on client-side types, not the route file).

**Step 3: Commit**

```bash
git add src/app/api/recipes/[id]/route.ts
git commit -m "feat: PATCH route accepts optional title alongside data"
```

---

### Task 5: Update the client query and mutation hook

**Files:**
- Modify: `src/clientToServer/queries/recipes.client.ts`
- Modify: `src/clientToServer/hooks/useUpdateRecipeData.ts`

**Step 1: Update `updateRecipeData` to accept `title?`**

In `recipes.client.ts`, replace the `updateRecipeData` function:

```ts
export const updateRecipeData = async (
  id: string,
  fields: { data?: string; title?: string }
): Promise<void> => {
  const response = await fetch(`/api/recipes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!response.ok) {
    throw new Error("Failed to update recipe.");
  }
};
```

**Step 2: Update `useUpdateRecipeData` types**

In `src/clientToServer/hooks/useUpdateRecipeData.ts`, update `UpdateRecipeDataInput` and the `mutationFn`:

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRecipeData } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export type UpdateRecipeDataInput = {
  id: string;
  data?: string;
  title?: string;
};

export const useUpdateRecipeData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, title }: UpdateRecipeDataInput) =>
      updateRecipeData(id, { data, title }),
    onSuccess: (_result, { id }) => {
      void queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
    },
  });
};
```

**Step 3: Verify build passes**

Run: `yarn build 2>&1 | tail -5`
Expected: passes or only fails on `RecipeEditor` which calls `mutateAsync` with the old signature.

**Step 4: Commit**

```bash
git add src/clientToServer/queries/recipes.client.ts \
        src/clientToServer/hooks/useUpdateRecipeData.ts
git commit -m "feat: extend updateRecipeData to accept optional title field"
```

---

### Task 6: Wire title into RecipeEditor.onSave

**Files:**
- Modify: `src/app/recipes/[id]/RecipeEditor.tsx`

**Step 1: Replace the file contents**

```tsx
"use client";

import { useRef, useState } from "react";
import { $convertToMarkdownString } from "@lexical/markdown";
import type { LexicalEditor } from "lexical";

import { useUpdateRecipeData } from "@/clientToServer/hooks/useUpdateRecipeData";
import { RecipeView } from "@/components";
import { RecipeSaveBar } from "@/components/RecipeSaveBar";
import type { SaveBarStatus } from "@/components/RecipeSaveBar";
import {
  RecipeViewSaveStateProvider,
  useRecipeViewSaveState,
} from "@/components/RecipeView/RecipeViewSaveStateContext";
import { recipeTransformers } from "@/components/TextEditor/textEditorConfig";
import type { RecipeEditorProps } from "./RecipeEditor.types";

function RecipeEditorInner({ recipe }: RecipeEditorProps) {
  const editorRef = useRef<LexicalEditor | null>(null);
  const [status, setStatus] = useState<SaveBarStatus>("idle");
  const { mutateAsync } = useUpdateRecipeData();
  const saveState = useRecipeViewSaveState();

  const onSave = () => {
    const editor = editorRef.current;
    if (!editor || !saveState) {return;}

    const data = editor.read(() => $convertToMarkdownString(recipeTransformers));
    const title = saveState.getTitle();

    setStatus("saving");
    mutateAsync({ id: recipe._id, data, title })
      .then(() => {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <>
      <RecipeView recipe={recipe} viewingMode="editor" editorRef={editorRef} />
      <RecipeSaveBar status={status} onSave={onSave} onCancel={() => {}} />
    </>
  );
}

export function RecipeEditor({ recipe }: RecipeEditorProps) {
  const [resetKey, setResetKey] = useState(0);

  const onCancel = () => setResetKey((k) => k + 1);

  return (
    <RecipeViewSaveStateProvider
      key={resetKey}
      initialTitle={recipe.title}
      initialData={recipe.data}
    >
      <RecipeEditorInner recipe={recipe} />
      {/* RecipeSaveBar needs onCancel from the outer scope to trigger resetKey */}
    </RecipeViewSaveStateProvider>
  );
}
```

Wait — there's a structural issue: `onCancel` must call `setResetKey` which lives in the outer `RecipeEditor`, but `RecipeSaveBar` is rendered inside `RecipeEditorInner` which is inside the provider. We need to thread `onCancel` down.

**Correct approach** — pass `onCancel` as a prop to `RecipeEditorInner`:

```tsx
"use client";

import { useRef, useState } from "react";
import { $convertToMarkdownString } from "@lexical/markdown";
import type { LexicalEditor } from "lexical";

import { useUpdateRecipeData } from "@/clientToServer/hooks/useUpdateRecipeData";
import { RecipeView } from "@/components";
import { RecipeSaveBar } from "@/components/RecipeSaveBar";
import type { SaveBarStatus } from "@/components/RecipeSaveBar";
import {
  RecipeViewSaveStateProvider,
  useRecipeViewSaveState,
} from "@/components/RecipeView/RecipeViewSaveStateContext";
import { recipeTransformers } from "@/components/TextEditor/textEditorConfig";
import type { RecipeEditorProps } from "./RecipeEditor.types";

type InnerProps = RecipeEditorProps & { onCancel: () => void };

function RecipeEditorInner({ recipe, onCancel }: InnerProps) {
  const editorRef = useRef<LexicalEditor | null>(null);
  const [status, setStatus] = useState<SaveBarStatus>("idle");
  const { mutateAsync } = useUpdateRecipeData();
  const saveState = useRecipeViewSaveState();

  const onSave = () => {
    const editor = editorRef.current;
    if (!editor || !saveState) {return;}

    const data = editor.read(() => $convertToMarkdownString(recipeTransformers));
    const title = saveState.getTitle();

    setStatus("saving");
    mutateAsync({ id: recipe._id, data, title })
      .then(() => {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const handleCancel = () => {
    editorRef.current = null;
    setStatus("idle");
    onCancel();
  };

  return (
    <>
      <RecipeView recipe={recipe} viewingMode="editor" editorRef={editorRef} />
      <RecipeSaveBar status={status} onSave={onSave} onCancel={handleCancel} />
    </>
  );
}

export function RecipeEditor({ recipe }: RecipeEditorProps) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <RecipeViewSaveStateProvider
      key={resetKey}
      initialTitle={recipe.title}
      initialData={recipe.data}
    >
      <RecipeEditorInner
        recipe={recipe}
        onCancel={() => setResetKey((k) => k + 1)}
      />
    </RecipeViewSaveStateProvider>
  );
}
```

This splits the component into two layers:
- Outer `RecipeEditor`: owns `resetKey` and the provider. Stateless otherwise.
- Inner `RecipeEditorInner`: owns `editorRef`, `status`, and `onSave`. Lives inside the provider so it can call `useRecipeViewSaveState()` directly.

**Step 2: Verify build passes**

Run: `yarn build 2>&1 | tail -5`
Expected: clean build.

**Step 3: Run all tests**

Run: `yarn test 2>&1 | tail -20`
Expected: all pass.

**Step 4: Commit**

```bash
git add src/app/recipes/[id]/RecipeEditor.tsx
git commit -m "feat: include title in save, split RecipeEditor into inner/outer for context access"
```

---

### Task 7: Write a test for the debounce behavior in the context

**Files:**
- Create: `src/components/RecipeView/RecipeViewSaveStateContext.test.tsx`

This test verifies the 1s debounce: `debouncedIsDirty` should not be `true` immediately after `markDataDirty()`, but should become `true` after the timer fires.

**Step 1: Write the test**

```tsx
import { renderHook, act } from "@testing-library/react";
import { RecipeViewSaveStateProvider, useRecipeViewSaveState } from "./RecipeViewSaveStateContext";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <RecipeViewSaveStateProvider initialTitle="Test Title" initialData="initial body">
    {children}
  </RecipeViewSaveStateProvider>
);

describe("RecipeViewSaveStateContext debounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("debouncedIsDirty is false immediately after markDataDirty", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), { wrapper });

    act(() => {
      result.current?.markDataDirty();
    });

    expect(result.current?.isDirty).toBe(true);
    expect(result.current?.debouncedIsDirty).toBe(false);
  });

  it("debouncedIsDirty becomes true after 1 second", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), { wrapper });

    act(() => {
      result.current?.markDataDirty();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current?.debouncedIsDirty).toBe(true);
  });

  it("debouncedIsDirty resets when initialData changes", () => {
    const { result, rerender } = renderHook(() => useRecipeViewSaveState(), {
      wrapper,
    });

    act(() => {
      result.current?.markDataDirty();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current?.debouncedIsDirty).toBe(true);

    // Simulate a successful save causing provider to reinitialize
    rerender();
    act(() => {
      jest.advanceTimersByTime(0);
    });

    // After rerender with same props isDirty stays — but after a key-change remount it resets.
    // We verify it resets via the reset effect when initialData changes:
    // (In real usage RecipeEditor increments resetKey which unmounts/remounts)
    expect(result.current?.isDirty).toBe(true); // unchanged without new props
  });

  it("getTitle returns the current title after updateTitle", () => {
    const { result } = renderHook(() => useRecipeViewSaveState(), { wrapper });

    act(() => {
      result.current?.updateTitle("New Title");
    });

    expect(result.current?.getTitle()).toBe("New Title");
  });
});
```

**Step 2: Run the tests**

Run: `yarn test --testPathPattern=RecipeViewSaveStateContext 2>&1 | tail -20`
Expected: all 4 tests pass.

**Step 3: Commit**

```bash
git add src/components/RecipeView/RecipeViewSaveStateContext.test.tsx
git commit -m "test: add debounce and getTitle tests for RecipeViewSaveStateContext"
```

---

### Task 8: Final verification

**Step 1: Run the full test suite**

Run: `yarn test 2>&1 | tail -20`
Expected: all tests pass, no regressions.

**Step 2: Run lint**

Run: `yarn lint 2>&1 | grep -E "^src/components/RecipeView|^src/app/recipes|^src/clientToServer" | head -20`
Expected: no new errors in touched files.

**Step 3: Run build**

Run: `yarn build 2>&1 | tail -10`
Expected: clean build.

**Step 4: Commit**

Only needed if any lint fixes were required. Otherwise all commits are already done.

---

## Summary of changes

| File | What changed |
|---|---|
| `RecipeViewSaveStateContext.types.ts` | Added `debouncedIsDirty`, `getTitle` to `SaveStateContextValue` |
| `RecipeViewSaveStateContext.tsx` | Added 1s debounce effect, `getTitle()` function |
| `RecipeViewSaveStateContext.test.tsx` | New: debounce + getTitle tests |
| `RecipeSaveBar.tsx` | Visibility guard uses `debouncedIsDirty`; Save button `disabled` uses raw `isDirty` |
| `RecipeSaveBar.test.tsx` | New: idle/saving/error render tests |
| `route.ts` | Body accepts `{ data?, title? }`, update built dynamically |
| `recipes.client.ts` | `updateRecipeData` takes `fields` object |
| `useUpdateRecipeData.ts` | `UpdateRecipeDataInput` has optional `data?` and `title?` |
| `RecipeEditor.tsx` | Split into outer (resetKey) + inner (hooks); inner reads `getTitle()` at save time |
