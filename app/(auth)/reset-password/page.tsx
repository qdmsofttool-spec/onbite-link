import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-[30px] font-bold leading-[1.2]">🔗 한입 링크</h1>
      <ResetPasswordForm />
    </div>
  );
}
