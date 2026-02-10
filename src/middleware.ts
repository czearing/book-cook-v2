import type { NextRequest } from "next/server";

import { refreshSupabaseSession } from "@/clientToServer/utils/supabaseAuthMiddleware";

export const middleware = async (request: NextRequest) =>
  refreshSupabaseSession(request);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
