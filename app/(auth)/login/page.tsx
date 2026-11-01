import Link from "next/link";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-[30px] font-bold leading-[1.2]">🔗 한입 링크</h1>
      <div className="flex flex-col gap-4">
        <LoginForm />
        <KakaoLoginButton />
        <p className="text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-[var(--accent)] hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </p>
        <p className="text-center text-sm text-[var(--text-sub)]">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-medium text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
