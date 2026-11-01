"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";
import { createClient } from "@/utils/supabase/client";

function toKoreanMessage(message: string) {
  const m = message.toLowerCase();
  if (m.includes("session") || m.includes("not authenticated"))
    return "링크가 만료되었습니다. 비밀번호 찾기를 다시 진행해주세요.";
  if (m.includes("same") && m.includes("password"))
    return "기존 비밀번호와 다른 비밀번호를 입력해주세요.";
  if (m.includes("password") && (m.includes("least") || m.includes("weak") || m.includes("short")))
    return "비밀번호가 너무 짧거나 안전하지 않습니다.";
  return "비밀번호를 변경하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const canSubmit = password !== "" && confirm !== "" && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (password !== confirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
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
        <FormField label="새 비밀번호" htmlFor="password">
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField label="새 비밀번호 확인" htmlFor="password-confirm">
          <TextInput
            id="password-confirm"
            name="password-confirm"
            type="password"
            placeholder="새 비밀번호 확인"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormField>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
