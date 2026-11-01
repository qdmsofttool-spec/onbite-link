import { Suspense } from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-[30px] font-bold leading-[1.2]">🔗 한입 링크</h1>
      <div className="flex flex-col gap-4">
        <p className="text-center text-sm text-[var(--text-sub)]">
          가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.
        </p>
        <Suspense>
          <ForgotPasswordForm />
        </Suspense>
        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="font-medium text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
