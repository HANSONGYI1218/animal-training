import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

export default function CertificateTab() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/license.png"; // 다운로드할 이미지 경로
    link.download = "certificate.png"; // 다운로드할 파일 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 링크 요소 제거
  };

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">수료한 자격증</span>
          <Button
            onClick={handleDownload}
            className="flex w-fit gap-2 self-end"
            variant={"destructive"}
          >
            <Download width={20} height={20} />
            다운로드
          </Button>
        </div>
        <div className="flex gap-6 p-6">
          <Image
            src="/license.png"
            width={400}
            height={800}
            alt="certificate"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
