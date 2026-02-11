import { redirect } from "next/navigation";

import { createSupabaseServerComponentClient } from "@/clientToServer/utils/supabaseAuthServerClient";
import { AppShell } from "@/components";
import type { RecipesLayoutProps } from "./layout.types";

export default async function RecipesLayout({ children }: RecipesLayoutProps) {
  const supabase = await createSupabaseServerComponentClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/");
  }

  return <AppShell>{children}</AppShell>;
}

