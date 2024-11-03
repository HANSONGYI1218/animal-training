"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, SquareUser, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categorySwap, priceTypeSwap } from "@/constants/constants.all";
import { GetLectureDto, GetLectureWithTutorDto } from "@/dtos/lecture.dto";
import { useState } from "react";

export default function LectureCard({
  lecture,
}: {
  lecture: GetLectureWithTutorDto | GetLectureDto;
}) {
  const [isBookmarked, setIsBookmarked] = useState(!!lecture?.bookmarks[0]);

  const bookmarkAPI = async () => {
    if (isBookmarked) {
      // 북마크 삭제
      const responseDeletedBookmark = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture-bookmark?id=${lecture?.bookmarks[0].id}`,
        {
          method: "DELETE",
          cache: "no-store",
        },
      );
      if (!responseDeletedBookmark.ok) return;
    } else {
      // 북마크 생성
      const responseCreatedBookmark = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture-bookmark`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            userId: "1",
            lectureId: lecture?.id,
          }),
        },
      );
      if (!responseCreatedBookmark.ok) return;
    }

    // 로컬 상태 업데이트
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group relative mb-7 flex h-full w-full cursor-pointer flex-col gap-4 rounded-lg">
      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-lg transition-all duration-300 group-hover:bg-black group-hover:bg-opacity-75">
        <Link href={`/lecture/${lecture?.id}`}>
          <Button
            className="flex gap-2 bg-white opacity-0 transition-all duration-300 group-hover:opacity-100"
            variant={"secondary"}
          >
            <Image src="/icons/play.svg" width={24} height={24} alt="play" />{" "}
            보러가기
          </Button>
        </Link>
        <div className="absolute bottom-8 right-8 flex hidden flex-col gap-3 group-hover:flex">
          <ShoppingCart stroke="#ffffff" className="hover:stroke-yellow-500" />
          <Heart
            stroke={isBookmarked ? "rgb(239 68 68)" : "#ffffff"}
            fill={isBookmarked ? "rgb(239 68 68)" : "none"}
            className="hover:stroke-red-500"
            onClick={() => {
              bookmarkAPI();
            }}
          />
        </div>
      </div>
      <img
        src={lecture?.thumbnailPath}
        alt="lecture-thumbnail"
        className="h-1/2 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-3 px-3">
        <div className="flex gap-2">
          <Badge>{categorySwap[lecture?.category]}</Badge>
          <Badge variant={"secondary"}>
            {priceTypeSwap[lecture?.price_type]}
          </Badge>
        </div>
        <span className="my-2 line-clamp-2 h-12 font-[540]">
          {lecture?.title}
        </span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <SquareUser width={17} height={17} stroke="#000000" />
            <span className="text-[0.93rem]">{lecture?.tutor?.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp width={16} height={16} />
            <span className="text-[0.93rem]">{lecture?.like}</span>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
}
