"use client";

import { Heart, SquareUser } from "lucide-react";
import { BookmarkTutorProps } from "./lecture-tab";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TutorCard({
  bookmark,
}: {
  bookmark: BookmarkTutorProps;
}) {
  const router = useRouter();

  const bookmarkAPI = async () => {
    //북마크 삭제
    const responseDeletedBookmark = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor-bookmark?id=${bookmark?.id}`,
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
      <Heart
        stroke="rgb(239 68 68)"
        fill="rgb(239 68 68)"
        className="absolute -top-2 right-2 hover:scale-110 hover:stroke-red-500"
        onClick={() => {
          bookmarkAPI();
        }}
      />
      <Image
        src={bookmark?.tutor?.profile_img}
        width={64}
        height={64}
        alt="tutor"
        className="rounded-full"
      />
      <Link href={`/lecture/${bookmark?.tutor?.id}`}>
        <Button
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
          variant={"destructive"}
        >
          <SquareUser className="h-4 w-4" /> 보러가기
        </Button>
      </Link>
      <span className="flex group-hover:hidden">{bookmark?.tutor?.name}</span>
    </div>
  );
}
