import Link from "next/link";
import { Progress } from "../../ui/progress";
import { categorySwap, lectureCategorySwap } from "@/constants/constants.all";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { GetUserCurriculumDto } from "@/dtos/user-curriculum.dtos";
import { CurriculumCategory } from "@prisma/client";
import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";

export default function TraningLectureTab() {
  const [userCurriculum, setUerCurriculum] =
    useState<GetUserCurriculumDto | null>(null);
  const [lecture, setLecture] = useState<GetCurriculumLectureDto | null>(null);
  let isNotLearning = false;

  useEffect(() => {
    const getData = async () => {
      const responseUserCurriculum = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum?userId=${"1"}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseUserCurriculum.ok) {
        return null;
      }

      const getUserCurriculum: GetUserCurriculumDto =
        await responseUserCurriculum.json();

      setUerCurriculum(getUserCurriculum);
    };

    const getLecture = async () => {
      const responseLectureCurriculums = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?category=${userCurriculum?.curriculumCategory}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseLectureCurriculums.ok) {
        return null;
      }

      const getLectureCurriculums: GetCurriculumLectureDto[] =
        await responseLectureCurriculums.json();

      console.log("getLectureCurriculums:", getLectureCurriculums);

      setLecture(getLectureCurriculums[userCurriculum!.curriculumIndex]);
    };

    const fetchData = async () => {
      await getData();
      if (userCurriculum?.curriculumStep === "LECTURE") {
        await getLecture();
      }
    };

    // fetchData를 호출
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">나의 진도</span>
        <div className="flex flex-col gap-6 p-6">
          {userCurriculum &&
            Object.entries(lectureCategorySwap).map(([key, value], index) => {
              const currentCategoryIndex = Object.values(
                CurriculumCategory,
              ).indexOf(userCurriculum?.curriculumCategory);
              let progress = 0;

              if (currentCategoryIndex > index) {
                progress = 100;
              } else if (currentCategoryIndex < index) {
                progress = 0;
              } else {
                progress =
                  (userCurriculum!.curriculumIndex /
                    Object.values(CurriculumCategory)!.length) *
                  100;
              }

              return (
                <div key={index} className="flex items-center gap-6">
                  <span className="w-24">{value}</span>
                  <Progress value={progress} className={`w-[60%]`} />
                  <span>
                    {" "}
                    {progress === 100
                      ? "10"
                      : progress === 0
                        ? "0"
                        : userCurriculum?.curriculumIndex + 1}
                    /10
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">현재 시청 강의</span>
        {userCurriculum?.curriculumStep === "LECTURE" &&
        userCurriculum?.curriculumIndex !== 3 &&
        lecture ? (
          <div className="flex gap-6 p-6">
            <Image
              src={lecture?.thumbnailPath}
              width={300}
              height={200}
              alt="thumbnail"
              className="rounded-xl"
            />

            <div className="flex flex-1 flex-col justify-between">
              <span className="font-semibold">{lecture?.title}</span>
              <span className="text-neutral-600">{lecture?.content}</span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge>{categorySwap[lecture?.category]}</Badge>
                  <span className="text-sm text-neutral-500">18:06/23:44</span>
                </div>
                <Link
                  href={`/curriculum/lecture/${userCurriculum?.curriculumCategory.toLowerCase()}/${userCurriculum?.id}`}
                  className="group relative flex h-8 w-20 self-end"
                >
                  <div className="relative z-10 flex w-full items-center justify-center gap-1">
                    <span className="pl-1 text-sm font-semibold text-white">
                      바로가기
                    </span>
                    <ChevronRight
                      width={16}
                      height={16}
                      strokeWidth={2.8}
                      className="cursor-pointer"
                      stroke="#ffffff"
                      fill="#000000"
                    />
                  </div>
                  <div className="absolute right-0 top-1 z-0 h-6 w-6 rounded-full bg-black transition-all duration-300 group-hover:top-0 group-hover:h-full group-hover:w-full" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-b p-6">
            <Image
              src="/images/mypage/training.png"
              width={100}
              height={100}
              alt="traning"
              className="mb-6"
            />
            <span>모든 강의를 수강했어요.</span>
            {userCurriculum?.curriculumStep === "LECTURE_END" ? (
              <span>훈련소를 선택해봐요!</span>
            ) : (
              <span>훈련소를 확인해봐요!</span>
            )}
            <Link href="/curriculum/traning" className="mt-6 flex">
              <Button
                className="flex gap-2 rounded-full"
                variant={"destructive"}
              >
                선택하기
                <ChevronRight
                  width={16}
                  height={16}
                  strokeWidth={2.8}
                  className="cursor-pointer"
                  stroke="#ffffff"
                  fill="#000000"
                />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
