import Link from "next/link";
import TouchScroll from "../common/touch-scroll";
import { GetTutorDto } from "@/dtos/tutor.dtos";

export default function LecturePromotion({
  tutors,
}: {
  tutors: GetTutorDto[];
}) {
  return (
    <div className="mb-32 mt-20 flex bg-slate-100">
      <div className="container mx-auto flex w-full flex-col gap-8 px-4 py-10">
        <span className="text-center text-2xl font-bold">송쏭쓰의 튜터</span>
        <TouchScroll isStepbar>
          <div className="flex w-full gap-6">
            {tutors.map((tutor, index) => {
              return (
                <Link href={`/tutor/${tutor?.id}`} key={index}>
                  <div className="flex min-w-fit cursor-pointer flex-col items-center gap-4 px-4">
                    <img
                      src={tutor?.profile_img}
                      className="h-24 w-24 rounded-full border"
                      alt="face"
                    />
                    <span className="font-semibold">{tutor?.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </TouchScroll>
      </div>
    </div>
  );
}
