import { Lecture } from "@/types/tyeps.all";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import PlayIcon from "@/public/icons/play.svg?component";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="group relative mb-7 flex h-full w-full cursor-pointer flex-col gap-4 rounded-lg">
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-lg transition-all duration-300 group-hover:bg-black group-hover:bg-opacity-75">
        <Link href={`/lecture/${lecture?.id}`}>
          <Button
            className="flex gap-2 bg-white opacity-0 transition-all duration-300 group-hover:opacity-100"
            variant={"secondary"}
          >
            <PlayIcon /> 보러가기
          </Button>
        </Link>
      </div>
      <img
        src={lecture?.thumbnailPath}
        alt="lecture-thumbnail"
        className="h-1/2 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-3 px-3">
        <div className="flex gap-2">
          <Badge>{lecture?.category}</Badge>
          <Badge variant={"secondary"}>{lecture?.price_type}</Badge>
        </div>
        <span className="line-clamp-2 h-11 font-[540]">{lecture?.title}</span>
        <div className="flex items-center justify-between">
          <span className="text-[0.93rem] text-gray-600">
            {lecture?.trainer_name}
          </span>
          <div className="flex items-center gap-2">
            <ThumbsUp width={16} height={16} />
            <span className="text-[0.93rem]">{lecture?.like}</span>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
}
