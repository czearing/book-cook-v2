import { useMemo } from "react";

import { createSupabaseBrowserClient } from "../utils/supabaseAuthBrowserClient";

export const useSupabaseClient = () =>
  useMemo(() => createSupabaseBrowserClient(), []);
