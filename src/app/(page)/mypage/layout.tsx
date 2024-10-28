import MypageSidebar from "@/components/mypage/mypage-sidebar";
import UserProvider from "@/components/mypage/user-provider";
import { GetUserDto } from "@/dtos/user.dtos";

export default async function MypageLayout({
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
