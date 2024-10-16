import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import PlayIcon from "@/public/icons/play.svg?component";
import { Bookmark, SquareUser, ThumbsUp, Triangle } from "lucide-react";
import Link from "next/link";
import { categorySwap, priceTypeSwap } from "@/constants/constants.all";
import { Lecture } from "@prisma/client";

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="relative mb-7 flex h-full w-full cursor-pointer flex-col gap-4 rounded-lg">
      <Bookmark
        className="absolute -top-2 right-2"
        stroke="rgb(253 224 71)"
        fill="rgb(253 224 71)"
      />

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
            <span className="text-[0.93rem]">{lecture?.tutor_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp width={16} height={16} />
            <span className="text-[0.93rem]">{lecture?.like}</span>
          </div>
        </div>
        <Link
          href={`/lecture/${lecture?.id}`}
          className="group relative flex w-32 self-end"
        >
          <div className="absolute bottom-0 left-0 h-full w-4 rounded-full bg-black opacity-0 transition-all duration-300 group-hover:w-32 group-hover:opacity-100" />
          <Button
            className="relative z-10 flex gap-2 bg-transparent transition-all duration-300 hover:text-white"
            variant={"secondary"}
          >
            <PlayIcon className="group-hover:hidden" />
            <Triangle
              className="ml-2.5 hidden rotate-90 group-hover:flex"
              fill="#ffffff"
              stroke="#ffffff"
              width={14}
              height={14}
            />
            보러가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
