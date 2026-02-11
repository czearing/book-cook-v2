import type { User } from "@supabase/supabase-js";

import type { AuthUserProfile } from "./authUserProfile.types";

const getFallbackName = (email?: string | null) => {
  if (!email) {
    return "User";
  }
  const [name] = email.split("@");
  return name || email;
};

export const getAuthUserProfile = (user: User | null): AuthUserProfile | null => {
  if (!user) {
    return null;
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    (metadata.full_name as string | undefined) ??
    (metadata.name as string | undefined) ??
    (metadata.preferred_username as string | undefined);

  const avatarUrl =
    (metadata.avatar_url as string | undefined) ??
    (metadata.picture as string | undefined);

  return {
    name: fullName ?? getFallbackName(user.email),
    email: user.email ?? undefined,
    avatarUrl,
  };
};
