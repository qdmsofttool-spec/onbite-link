"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    // 성공하면 카카오 인증 페이지로 이동하므로 실패한 경우에만 되돌린다.
    if (error) setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label="카카오 로그인"
      className="block w-full overflow-hidden rounded-md transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/kakao_login_large_wide.png" alt="카카오 로그인" className="block w-full" />
    </button>
  );
}
