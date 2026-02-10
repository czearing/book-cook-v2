# Supabase Auth Setup

## Required env vars

These must exist in your environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLIC_KEY`
- `SUPABASE_KEY` (server-only)

You already added:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Supabase dashboard

1. In Supabase → Auth → Providers → Google:
   - Enable Google
   - Add your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. In Auth → URL Configuration:
   - Site URL: your app URL (e.g. `http://localhost:3000`)
   - Redirect URLs: add `http://localhost:3000/auth/callback`

## Code entry points

- `src/clientToServer/utils/supabaseAuthBrowserClient.ts` (client)
- `src/clientToServer/utils/supabaseAuthServerClient.ts` (server components)
- `src/clientToServer/utils/supabaseAuthRouteClient.ts` (route handlers)
- `src/clientToServer/utils/supabaseAuthMiddleware.ts` (session refresh)
- `src/app/auth/callback/route.ts` (OAuth callback)
- `src/middleware.ts` (refreshes session)

## Next steps (when you build UI)

- Use `createSupabaseBrowserClient()` for sign-in/sign-out.
- Read the session on the server via `createSupabaseServerComponentClient()`.
