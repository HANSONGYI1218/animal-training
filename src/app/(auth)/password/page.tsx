import PasswordSearchForm from "@/components/auth/password/password-search-form";
import Link from "next/link";

export default async function PasswordPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <PasswordSearchForm />
      <div className="flex w-full items-center justify-center gap-2">
        <Link href="/login">
          <span className="flex cursor-pointer text-sm text-neutral-500 underline-offset-4 hover:underline hover:decoration-neutral-500">
            로그인
          </span>
        </Link>
        <span className="text-sm text-neutral-500">|</span>
        <Link href="/id">
          <span className="flex cursor-pointer text-sm text-neutral-500 underline-offset-4 hover:underline hover:decoration-neutral-500">
            아이디 찾기
          </span>
        </Link>
        <span className="text-sm text-neutral-500">|</span>
        <Link href="/register">
          <span className="flex cursor-pointer text-sm text-neutral-500 underline-offset-4 hover:underline hover:decoration-neutral-500">
            회원가입
          </span>
        </Link>
      </div>
    </div>
  );
}
