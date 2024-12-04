import { currentAccount } from "@/action/user-action";
import LoginForm from "@/components/auth/login/login-form";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: {
    isInvited?: string;
  };
}) {
  const { isInvited } = searchParams;
  const session = await currentAccount();

  if (session) {
    if (isInvited === "true") {
      redirect("/curriculum");
    } else {
      redirect("/lecture");
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <LoginForm isInvited={isInvited ? true : false} />
      <Link href="/register">
        <span className="flex cursor-pointer items-center gap-1 underline underline-offset-2">
          회원가입
        </span>
      </Link>
    </div>
  );
}
