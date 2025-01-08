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
}: {
  tutor: TutorProps;
  trainingCenterId?: string;
  isEdit?: boolean;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-4 p-6">
      <Link
        href={{
          pathname: `curriculum/${tutor?.id}/tutor`,
          query: { trainingCenterId: trainingCenterId ?? "none" },
        }}
        className={`${!isEdit ? "hidden" : "flex"} absolute right-3 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black hover:scale-110`}
      >
        <Pencil stroke="#ffffff" className="h-4 w-4" />
      </Link>
      <Image
        src={tutor?.profile_img ?? ""}
        width={64}
        height={64}
        alt="tutor"
        className="h-[64px] w-[64px] rounded-full"
      />
      <Link href={`/tutor/${tutor?.id}`}>
        <Button
          className={`${isEdit ? "hidden" : "flex"} absolute left-0 top-0 z-10 h-full w-full gap-2 rounded-xl bg-transparent opacity-0 group-hover:opacity-100`}
          variant={"destructive"}
        >
          <SquareUser className="hover: h-4 w-4" /> 보러가기
        </Button>
      </Link>
      <span>{tutor?.name}</span>
    </div>
  );
}
