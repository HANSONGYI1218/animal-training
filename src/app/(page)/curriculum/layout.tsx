import { currentAccount } from "@/action/user-action";
import { redirect } from "next/navigation";

export default async function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await currentAccount();

  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
}
