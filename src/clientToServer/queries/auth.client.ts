import { createSupabaseBrowserClient } from "../utils/supabaseAuthBrowserClient";
import type { AuthSessionState, AuthSignInOptions } from "./auth.types";

export const fetchAuthSession = async (): Promise<AuthSessionState> => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getSession();
  return {
    session: data.session ?? null,
    user: data.session?.user ?? null,
  };
};

export const signInWithGoogle = async (options?: AuthSignInOptions) => {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options,
  });

  if (error) {
    throw error;
  }
};

export const signOut = async () => {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
