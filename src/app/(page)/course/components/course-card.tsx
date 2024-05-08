import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function CourseCard() {
  return (
    <div className="flex flex-col shadow-md border-t border-neutral-5 rounded-lg gap-3 p-6 w-full hover:shadow-xl hover:cursor-pointer">
      <h1 className="text-BB18">강형욱 선생님과 함께하는 강아지 배변 훈련!</h1>
      <div className="flex gap-2">
        <Badge variant={"default"} className="w-fit">
          훈련
        </Badge>
        <Badge variant={"secondary"} className="w-fit">
          강아지
        </Badge>
        <Badge variant={"destructive"} className="w-fit">
          고양이
        </Badge>
      </div>
      <div className="flex flex-col">
        <p className="text-BR14">강아지의 다양한 배변 현상</p>
        <p className="text-BR14">강형욱 훈련사님의 깊은 내공으로</p>
        <p className="text-BR14">궁금증 해결!!</p>
      </div>
      <Image
        src="/Test-courseImg.png"
        alt="기본 이미지"
        width={100}
        height={100}
        className="w-full rounded-md"
      />
    </div>
  );
}
