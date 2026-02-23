import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { fromRecipeSearchParams } from "@/clientToServer/queries/recipes.filters";
import { fetchRecipes } from "@/clientToServer/queries/recipes.server";
import { createSupabaseRouteHandlerClient } from "@/clientToServer/utils/supabaseAuthRouteClient";
import { createSupabaseServerClient } from "@/clientToServer/utils/supabaseServerClient";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const filters = fromRecipeSearchParams(searchParams);
  const recipes = await fetchRecipes(filters);
  return NextResponse.json(recipes);
};

export const POST = async (request: NextRequest) => {
  const provisionalResponse = NextResponse.next();
  const authClient = createSupabaseRouteHandlerClient(
    request,
    provisionalResponse
  );

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: { title?: string };
  try {
    body = (await request.json()) as { title?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { title } = body;
  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { message: "Missing or invalid field: title" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  // Resolve the app-level user ID from the users table (owner_id uses hex IDs,
  // not Supabase auth UUIDs).
  const { data: appUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (userError) {
    return NextResponse.json({ message: userError.message }, { status: 500 });
  }

  if (!appUser) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { data: row, error } = await supabase
    .from("recipes")
    .insert({
      id: crypto.randomUUID(),
      title,
      owner_id: appUser.id,
      is_public: false,
      data: "",
      tags: [],
      emoji: "",
      image_url: null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(row, { status: 201 });
};
