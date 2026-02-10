import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authKeys } from "../queries/auth.keys";
import { signOut } from "../queries/auth.client";

export const useAuthSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session(), {
        session: null,
        user: null,
      });
    },
  });
};
