"use client";

import { useAuthSignInWithGoogle } from "@/clientToServer/hooks/useAuthSignInWithGoogle";
import { GoogleSignInButton } from "@/components";
import styles from "./LandingPage.module.css";

export const LandingPage = () => {
  const { mutateAsync: signInWithGoogle, isPending: isGoogle } =
    useAuthSignInWithGoogle();

  const handleGoogle = async () => {
    await signInWithGoogle({
      redirectTo: `${window.location.origin}/auth/callback?next=/recipes`,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Book Cook</h1>
        <p className={styles.subtitle}>
          Sign in to access your recipe gallery and editor.
        </p>
        <div className={styles.actions}>
          <GoogleSignInButton isLoading={isGoogle} onClick={handleGoogle} />
        </div>
      </div>
    </div>
  );
};

