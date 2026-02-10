import { useMutation } from "@tanstack/react-query";

import { signInWithGoogle } from "../queries/auth.client";
import type { AuthSignInOptions } from "../queries/auth.types";

export const useAuthSignInWithGoogle = () =>
  useMutation({
    mutationFn: (options?: AuthSignInOptions) => signInWithGoogle(options),
  });
