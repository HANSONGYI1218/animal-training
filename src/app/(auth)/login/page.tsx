import LoginForm from "@/components/auth/login/login-form";

import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <LoginForm />
      <Link href="/register">
        <span className="flex cursor-pointer items-center gap-1 underline underline-offset-2">
          회원가입
        </span>
      </Link>
    </div>
  );
}
