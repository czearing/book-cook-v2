import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { fetchRecipeById } from "@/clientToServer/queries/recipes.server";
import { createSupabaseRouteHandlerClient } from "@/clientToServer/utils/supabaseAuthRouteClient";
import { createSupabaseServerClient } from "@/clientToServer/utils/supabaseServerClient";
import type { RecipeRouteContext } from "./route.types";

const decodeId = (raw: string) => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export const GET = async (
  _request: Request,
  context: RecipeRouteContext
) => {
  const { id } = await context.params;
  const recipeId = decodeId(id);
  const recipe = await fetchRecipeById(recipeId);

  if (!recipe) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
};

export const PATCH = async (
  request: NextRequest,
  context: RecipeRouteContext
) => {
  const { id } = await context.params;
  const recipeId = decodeId(id);

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

  let body: { data?: string; title?: string };
  try {
    body = (await request.json()) as { data?: string; title?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { data, title } = body;
  const updates: { data?: string; title?: string } = {};
  if (typeof data === "string") { updates.data = data; }
  if (typeof title === "string") { updates.title = title; }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
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

  const { data: row, error: fetchError } = await supabase
    .from("recipes")
    .select("owner_id")
    .eq("id", recipeId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ message: fetchError.message }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (row.owner_id !== appUser.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { error: updateError } = await supabase
    .from("recipes")
    .update(updates)
    .eq("id", recipeId);

  if (updateError) {
    return NextResponse.json(
      { message: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
};
