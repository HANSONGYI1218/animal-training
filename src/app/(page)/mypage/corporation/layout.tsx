import CorporationProvider from "@/providers/corporation-provider";
import MypageSidebar from "@/components/mypage/corporation/mypage-sidebar";
import { CorporationDetailDto } from "@/dtos/corporation.dto";

export default async function MypageCorporationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const corporationId = "1"; //session 으로 받아옴

  const responseCorporation = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/corporation?id=${corporationId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseCorporation.ok) {
    return null;
  }

  const corporation: CorporationDetailDto = await responseCorporation.json();

  return (
    <div className="container mx-auto flex max-w-[1150px] gap-6 py-12">
      <MypageSidebar corporation={corporation} />
      <CorporationProvider corporation={corporation}>
        {children}
      </CorporationProvider>
    </div>
  );
}
