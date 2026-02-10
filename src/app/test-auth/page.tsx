"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { useAuthSession } from "@/clientToServer/hooks/useAuthSession";
import { useAuthSignInWithGoogle } from "@/clientToServer/hooks/useAuthSignInWithGoogle";
import { useAuthSignOut } from "@/clientToServer/hooks/useAuthSignOut";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";
import styles from "./page.module.css";

export default function TestAuthPage() {
  const [open, setOpen] = useState(false);
  const { session, user } = useAuthSession();
  const { mutateAsync: signInWithGoogle, isPending: isGoogle } =
    useAuthSignInWithGoogle();
  const { mutateAsync: signOut, isPending: isSigningOut } = useAuthSignOut();

  const authState = useMemo(() => ({ user, session }), [user, session]);

  const handleGoogle = async () => {
    await signInWithGoogle({
      redirectTo: `${window.location.origin}/auth/callback`,
    });
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Auth test</h1>
        <p className={styles.subtitle}>
          Use this page to verify Supabase auth and session data.
        </p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Open sign in
          </Button>
          <Button
            variant="ghost"
            onClick={() => signOut()}
            disabled={!session}
            isLoading={isSigningOut}
          >
            Sign out
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>
              Continue with Google to create a session.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Button
              type="button"
              variant="secondary"
              startIcon={
                <Image
                  src="/google-logo.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden
                  priority
                />
              }
              isLoading={isGoogle}
              onClick={handleGoogle}
              className={styles.googleButton}
            >
              {isGoogle ? "Redirecting…" : "Continue with Google"}
            </Button>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className={styles.jsonPanel}>
        <h2 className={styles.panelTitle}>Session data</h2>
        <pre className={styles.json}>{JSON.stringify(authState, null, 2)}</pre>
      </div>
    </section>
  );
}
