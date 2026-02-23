# Save Bar: Debounced Appearance + Title Saving

**Date:** 2026-02-22
**Status:** Approved

## Problem

1. The save bar appears immediately on the first keystroke. This is jarring — users don't expect an action bar to pop up while they're mid-sentence.
2. The save function only saves `recipe.data` (Lexical body). Title changes are tracked as dirty but not persisted on save.

## Requirements

- Save bar appears after ~1 second of inactivity (debounced), not instantly on first change.
- The Save button includes both the title and body content in a single PATCH request.
- Cancel still reverts the editor and title to their original values.

## Approach: Debounce in Context

Dirty state is already centralized in `RecipeViewSaveStateContext`. The debounce belongs there too — it's the single source of truth for "should the UI show unsaved state."

`RecipeSaveBar` switches from `isDirty` → `debouncedIsDirty` for its `return null` visibility guard only. The Save button's `disabled` prop continues to use raw `isDirty` (once visible, the button is enabled immediately when there are changes).

## Architecture

### `RecipeViewSaveStateContext`

Add to `SaveStateContextValue`:
- `debouncedIsDirty: boolean` — true only after 1s of no new changes. Implemented as a `useEffect` on `isDirty`: starts a 1s `setTimeout` when `isDirty` becomes `true`, clears it on cleanup. Resets to `false` alongside `isDirty` in the existing `useEffect([initialTitle, initialData])`.
- `getTitle(): string` — returns `current.current.title` (the current in-flight title). Allows `RecipeEditor` to read the title at save time without prop drilling through `RecipeView`.

### Save function (`RecipeEditor`)

```ts
const saveState = useRecipeViewSaveState();

const onSave = () => {
  const editor = editorRef.current;
  if (!editor || !saveState) return;

  const data = editor.read(() => $convertToMarkdownString(recipeTransformers));
  const title = saveState.getTitle();

  mutateAsync({ id: recipe._id, data, title })
    .then(() => { setStatus("saved"); setTimeout(() => setStatus("idle"), 1500); })
    .catch(() => setStatus("error"));
};
```

### PATCH route (`/api/recipes/[id]`)

Body: `{ data?: string; title?: string }` — both optional. Only fields present in the body are written to the database. The Supabase `.update()` call is built dynamically from whichever fields are provided.

### Data flow

```
User types
  → isDirty = true (immediate, raw)
  → 1s debounce timer starts
  → debouncedIsDirty = true (after 1s)
    → RecipeSaveBar appears

User clicks Save
  → editorRef.current.read() → markdown string
  → saveState.getTitle() → current title string
  → PATCH /api/recipes/:id { data, title }
    → Supabase .update({ data, title })
  → invalidateQueries → refetch
    → RecipeViewSaveStateProvider resets (isDirty = false, debouncedIsDirty = false)
    → RecipeSaveBar disappears

User clicks Cancel
  → resetKey++ → provider remounts with original recipe.data + recipe.title
  → isDirty = false, debouncedIsDirty = false
  → RecipeSaveBar disappears
```

## Files Changed

| File | Change |
|---|---|
| `RecipeViewSaveStateContext.tsx` | Add `debouncedIsDirty` state + 1s debounce effect, add `getTitle()` |
| `RecipeViewSaveStateContext.types.ts` | Add `debouncedIsDirty: boolean` and `getTitle: () => string` to `SaveStateContextValue` |
| `RecipeSaveBar.tsx` | Use `debouncedIsDirty` for `return null` guard |
| `RecipeEditor.tsx` | Read `saveState.getTitle()`, pass `title` to `mutateAsync` |
| `recipes.client.ts` | Add `title?: string` param to `updateRecipeData` |
| `api/recipes/[id]/route.ts` | Accept `title?` in body, build update object dynamically |

No new files. All files remain under 200 lines.

## Non-Goals

- Auto-save (explicit save button is intentional)
- Tag or emoji saving (separate concern)
- Debouncing the Save button click itself
