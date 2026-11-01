"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";
import { createClient } from "@/utils/supabase/client";

function toKoreanMessage(message: string) {
  const m = message.toLowerCase();
  if (m.includes("rate limit") || m.includes("too many"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  if (m.includes("invalid") && m.includes("email")) return "올바른 이메일 형식이 아닙니다.";
  return "메일을 발송하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

type Toast = { message: string; type: "error" | "success" };

export default function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(
    searchParams.get("error") === "invalid_link"
      ? { message: "만료되었거나 올바르지 않은 링크입니다. 다시 요청해주세요.", type: "error" }
      : null,
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const canSubmit = email.trim() !== "" && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);
    if (error) {
      setToast({ message: toKoreanMessage(error.message), type: "error" });
      return;
    }
    setToast({ message: "비밀번호 재설정 링크를 발송했습니다. 메일함을 확인해주세요.", type: "success" });
  };

  return (
    <>
      {toast && (
        <div
          role="alert"
          className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.type === "error" ? "bg-[var(--error)]" : "bg-[var(--accent)]"
          }`}
        >
          {toast.message}
        </div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="이메일" htmlFor="email">
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? "발송 중..." : "비밀번호 리셋 링크 발송"}
        </button>
      </form>
    </>
  );
}
