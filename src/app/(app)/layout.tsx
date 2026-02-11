import { redirect } from "next/navigation";

import { createSupabaseServerComponentClient } from "@/clientToServer/utils/supabaseAuthServerClient";
import { AppShell } from "@/components";
import type { AppLayoutProps } from "./layout.types";

export default async function AppLayout({ children }: AppLayoutProps) {
  const supabase = await createSupabaseServerComponentClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/");
  }

  return <AppShell>{children}</AppShell>;
}
