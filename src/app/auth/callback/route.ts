import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseRouteHandlerClient } from "@/clientToServer/utils/supabaseAuthRouteClient";

export const GET = async (request: NextRequest) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const response = NextResponse.redirect(origin);

  if (code) {
    const supabase = createSupabaseRouteHandlerClient(request, response);
    await supabase.auth.exchangeCodeForSession(code);
  }

  return response;
};
