import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signOut } from "../queries/auth.client";
import { authKeys } from "../queries/auth.keys";

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
