import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authKeys } from "../queries/auth.keys";
import { fetchAuthSession } from "../queries/auth.client";
import type { AuthSessionState } from "../queries/auth.types";
import { useSupabaseClient } from "./useSupabaseClient";

export const useAuthSession = () => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const query = useQuery<AuthSessionState>({
    queryKey: authKeys.session(),
    queryFn: fetchAuthSession,
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData<AuthSessionState>(authKeys.session(), {
        session: session ?? null,
        user: session?.user ?? null,
      });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [queryClient, supabase]);

  return {
    ...query,
    session: query.data?.session ?? null,
    user: query.data?.user ?? null,
  };
};
