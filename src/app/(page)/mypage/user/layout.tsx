import MypageSidebar from "@/components/mypage/user/mypage-sidebar";
import UserProvider from "@/providers/user-provider";
import { GetUserDto } from "@/dtos/user.dto";

export default async function MypageUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = 1; //session 으로 받아옴

  const responseUser = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/user?id=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseUser.ok) {
    return null;
  }

  const user: GetUserDto = await responseUser.json();

  return (
    <div className="container mx-auto flex max-w-[1150px] gap-6 py-12">
      <MypageSidebar user={user} />
      <UserProvider user={user}>{children}</UserProvider>
    </div>
  );
}
