import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  // 오픈 리다이렉트 방지: 같은 사이트 내부 경로만 허용
  const path = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${path}`);
  }

  const failure = path === "/reset-password" ? "/forgot-password?error=invalid_link" : "/login";
  return NextResponse.redirect(`${origin}${failure}`);
}
