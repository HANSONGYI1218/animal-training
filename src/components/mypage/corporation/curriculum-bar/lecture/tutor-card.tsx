"use client";

import { Pencil, SquareUser } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TutorProps = {
  id: string;
  name: string;
  profile_img?: string;
};

export default function TutorCard({
  tutor,
  trainingCenterId,
  isEdit,
  isTrainingCenterTab,
}: {
  tutor: TutorProps;
  trainingCenterId?: string;
  isEdit?: boolean;
  isTrainingCenterTab?: boolean;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-2 p-6">
      <Link
        href={{
          pathname: `curriculum/${tutor?.id}/tutor`,
          query: { trainingCenterId: trainingCenterId ?? "none" },
        }}
        className={`${isTrainingCenterTab && !isEdit ? "hidden" : "flex"} absolute right-3 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black hover:scale-110`}
      >
        <Pencil stroke="#ffffff" className="h-4 w-4" />
      </Link>
      <Image
        src={tutor?.profile_img ?? ""}
        width={64}
        height={64}
        alt="tutor"
        className="rounded-full"
      />
      <Link href={`/tutor/${tutor?.id}`}>
        <Button
          className={`${isTrainingCenterTab && isEdit ? "hidden" : "flex"} absolute bottom-4 left-1/2 z-10 -translate-x-1/2 gap-2 rounded-full opacity-0 group-hover:opacity-100`}
          variant={"destructive"}
        >
          <SquareUser className="h-4 w-4" /> 보러가기
        </Button>
      </Link>
      <span
        className={`flex ${isTrainingCenterTab && isEdit ? "group-hover:none" : "group-hover:hidden"}`}
      >
        {tutor?.name}
      </span>
    </div>
  );
}
