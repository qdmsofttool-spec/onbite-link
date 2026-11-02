"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";
import { createClient } from "@/utils/supabase/client";

function toKoreanMessage(message: string) {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return "이미 가입된 이메일입니다.";
  if (m.includes("password") && (m.includes("least") || m.includes("weak") || m.includes("short")))
    return "비밀번호가 너무 짧거나 안전하지 않습니다.";
  if (m.includes("invalid") && m.includes("email")) return "올바른 이메일 형식이 아닙니다.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const canSubmit = email.trim() !== "" && password !== "" && confirm !== "" && agreed && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (password !== confirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const { error } = await createClient().auth.signUp({ email: email.trim(), password });
    if (error) {
      setToast(toKoreanMessage(error.message));
      setLoading(false);
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {toast && (
        <div
          role="alert"
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md bg-[var(--error)] px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {toast}
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
        <FormField label="비밀번호" htmlFor="password">
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField label="비밀번호 확인" htmlFor="password-confirm">
          <TextInput
            id="password-confirm"
            name="password-confirm"
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormField>
        <label className="flex items-start gap-2 text-sm text-[var(--text-sub)]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            [필수]{" "}
            <Link href="/privacy" target="_blank" className="text-[var(--accent)] underline">
              개인정보 처리방침
            </Link>
            에 따른 개인정보 수집·이용에 동의합니다.
          </span>
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
