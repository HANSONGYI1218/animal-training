"use client";

import { Pencil, SquareUser } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tutor } from "@prisma/client";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const router = useRouter();

  const bookmarkAPI = async () => {
    //강사 삭제
    const responseDeletedBookmark = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?id=${tutor?.id}`,
      {
        method: "DELETE",
        cache: "no-store",
      },
    );
    if (!responseDeletedBookmark.ok) {
      return null;
    }
    router.refresh();
  };

  return (
    <div className="group relative flex cursor-pointer flex-col items-center gap-4 p-6">
      <Link href={`curriculum/${tutor?.id}/tutor`}>
        <div className="absolute -top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black hover:scale-110">
          <Pencil
            stroke="#ffffff"
            className="h-4 w-4"
            onClick={() => {
              bookmarkAPI();
            }}
          />
        </div>
      </Link>
      <Image
        src={tutor?.profile_img}
        width={64}
        height={64}
        alt="tutor"
        className="rounded-full"
      />
      <Link href={`/lecture/${tutor?.id}`}>
        <Button
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full opacity-0 group-hover:opacity-100"
          variant={"destructive"}
        >
          <SquareUser className="h-4 w-4" /> 보러가기
        </Button>
      </Link>
      <span className="flex group-hover:hidden">{tutor?.name}</span>
    </div>
  );
}
