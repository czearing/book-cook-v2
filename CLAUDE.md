# book-cook2

Recipe management app built with Next.js 16 App Router, React 19, TypeScript, and Supabase.

## Package manager

**Yarn 4** with `node-modules` linker (not PnP). Always use `yarn`, never `npm` or `npx`.

```bash
yarn dev          # start dev server (Turbopack)
yarn build        # production build
yarn test         # Jest
yarn lint         # ESLint (max-warnings=0, must pass clean)
yarn storybook    # Storybook on :6006
```

## Project structure

```
src/
  app/                        # Next.js App Router pages and layouts
  clientToServer/
    hooks/                    # TanStack Query hooks (useRecipes, useRecipe, useAuthSession, ...)
    queries/                  # Supabase query functions, keys, filters, types
    utils/                    # Supabase client factories (browser, server, route, middleware)
  components/                 # UI components — each in its own folder
  hooks/                      # Shared UI hooks (useMediaQuery, useFormFieldIds)
  utils/                      # Shared pure utilities (formatDate, formatCount, toCssSize)
```

## Code rules

- **200-line limit** on all non-test source files. Test files (`*.test.tsx`) are exempt.
- **No duplicated functions.** Before writing a utility, check `src/utils/` and `src/hooks/`.
- **No inline utilities inside components.** If logic is more than a one-liner and could be reused, extract it.

## Component conventions

Every component lives in `src/components/<ComponentName>/` and follows this layout:

```
ComponentName/
  ComponentName.tsx        # component implementation
  ComponentName.module.css # scoped styles
  ComponentName.types.ts   # prop types
  index.ts                 # re-exports (export * from "./ComponentName" + types)
  ComponentName.test.tsx   # optional
  ComponentName.stories.tsx# optional
```

- `"use client"` is only added when the component uses hooks or browser APIs.
- Size/variant style maps (`sizeStyles`, `variantStyles`) live inside the component file since they reference the local CSS module.
- Compound component files (e.g. `Menu.tsx` + `MenuItems.tsx`) split structural/container parts from item parts and re-export through `index.ts`.

## Shared hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useMediaQuery(query)` | Reactive media query match with SSR guard |
| `useFormFieldIds(id, description, error, ariaDescribedBy, prefix?)` | Generates stable IDs and `aria-describedby` for form fields. Returns `{ inputId, descriptionId, errorId, describedBy, hasSupporting }`. Used by `Input` and `Searchbox`. |

## Shared utils (`src/utils/`)

| Util | Purpose |
|---|---|
| `formatDate(value: string)` | Formats ISO date strings to "Jan 1, 2024" |
| `formatCount(value: number)` | Compact number notation ("1.2K") |
| `toCssSize(value: number \| string)` | Appends `px` to numbers, passes strings through |

## Data layer (`src/clientToServer/`)

- **Queries** in `queries/` are plain async functions that call Supabase directly.
- **Hooks** in `hooks/` wrap queries with TanStack Query (`useQuery`, `useMutation`).
- Types are co-located with queries (e.g. `recipes.types.ts`).
- Auth uses `@supabase/ssr` — client factory is in `utils/supabaseAuthBrowserClient.ts`.

## TypeScript

- Strict mode enabled. All code must type-check.
- Prefer `import type` for type-only imports (`@typescript-eslint/consistent-type-imports` enforces this).
- Path alias `@/*` maps to `src/*`.

## ESLint

- `import/order` enforces: external imports first, then internal (`@/`, relative). Always a blank line between groups.
- `no-console` warns — use `console.warn` / `console.error` only.
- `prefer-const`, `prefer-template`, `object-shorthand`, `eqeqeq` are all enforced.

## Known setup notes

- `.yarnrc.yml` sets `nodeLinker: node-modules` — required for Next.js 16 compatibility (PnP strict mode breaks styled-jsx resolution).
- `dependenciesMeta.unrs-resolver.built: false` in `package.json` — skips the native postinstall check that fails in this environment; the pre-built `.node` binary is already unplugged and loads correctly at runtime.
- The `webpack` peer dep warning from `@storybook/nextjs` is pre-existing and non-blocking.
