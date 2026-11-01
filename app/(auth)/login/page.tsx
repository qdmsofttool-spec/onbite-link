import Link from "next/link";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-[30px] font-bold leading-[1.2]">🔗 한입 링크</h1>
      <div className="flex flex-col gap-4">
        <FormField label="이메일" htmlFor="email">
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        </FormField>
        <FormField label="비밀번호" htmlFor="password">
          <TextInput id="password" name="password" type="password" placeholder="비밀번호" autoComplete="current-password" />
        </FormField>
        <button
          type="button"
          className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150"
        >
          로그인
        </button>
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
