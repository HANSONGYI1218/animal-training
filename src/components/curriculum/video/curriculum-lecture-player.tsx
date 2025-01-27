"use client";

import { useRef, useEffect, useState } from "react";
import { CurriculumStep } from "@prisma/client";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatTime, parseTime } from "@/utils/utils";
import { curriculumPageNavigate } from "@/action/navigate";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { useRouter } from "next/navigation";
import { CautionDialog } from "./caution-dialog";

export default function CurriculumLecutrePalyer({
  currentLecture,
  userCurriculum,
  nextVideoId,
}: {
  currentLecture: CurriculumLectureDto;
  userCurriculum: GetUserCurriculumDto;
  nextVideoId: string;
}) {
  const isLastViewLecture = userCurriculum?.lastVideoId
    ? currentLecture?.id === userCurriculum?.lastVideoId
    : true;
  const videoRef = useRef<any>(null);
  const [totalTime, setTotalTime] = useState(
    userCurriculum?.lastVideoTime && isLastViewLecture
      ? parseTime(userCurriculum?.lastVideoTime)
      : 0,
  );
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [videoMeta, setVideoMeta] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined; // undefined로 초기화

    if (isPlaying && isLastViewLecture) {
      interval = setInterval(() => {
        if (videoRef.current) {
          const currentTime = videoRef.current.currentTime;
          const duration = videoRef.current.duration;

          // 비디오가 진행 중이고 전체 길이에 도달하지 않으면
          if (currentTime < duration && totalTime < duration) {
            setTotalTime((prevTime) => {
              const newTime = prevTime + 1;
              return newTime;
            });
          }
        }
      }, 1000); // 1초마다 실행
    } else {
      // 비디오가 멈추면 interval을 클리어
      clearInterval(interval);
    }

    // 컴포넌트가 언마운트되면 interval을 클리어
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    setIsWindow(true);
    const getVideo = async () => {
      const filePath = `video/curriculum/${currentLecture?.animal_type.toLowerCase()}/${currentLecture?.videoUrl}`; // 실제 파일명으로 변경
      const responseFile = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/blob?file=${filePath}`,
        {
          method: "GET",
        },
      );

      if (!responseFile.ok) {
        throw new Error("파일이 없음");
      }
      const data: any = await responseFile.json();

      setVideoMeta({
        url: data.url,
        size: data.size, // 크기 (바이트)
        contentType: data.contentType, // 타입 (video/mp4)
        length: data.length, // 크기 (MB)
        fileName: data.fileName, // 파일명
      });
    };

    getVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (
      videoElement &&
      videoMeta?.url &&
      userCurriculum?.lastVideoTime &&
      isLastViewLecture
    ) {
      const lastVideoTime = parseTime(userCurriculum?.lastVideoTime);

      const handleLoadedMetadata = () => {
        if (lastVideoTime > 0 && lastVideoTime < videoElement.duration) {
          videoElement.currentTime = lastVideoTime;
        }
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      };
    }
  }, [videoMeta?.url]);

  const onSubmit = async () => {
    if (isLastViewLecture) {
      try {
        setIsLoading(true);

        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause(); // 비디오 일시 정지
        }

        const isLectureEnd =
          !nextVideoId &&
          Math.floor(videoRef.current.duration - totalTime) <= 5;

        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum`, {
          method: "PUT",
          body: JSON.stringify({
            id: userCurriculum?.id,
            lastVideoId:
              Math.floor(videoRef.current.duration - totalTime) <= 5
                ? nextVideoId
                : currentLecture?.id,
            lastVideoTime: totalTime === 0 ? null : formatTime(totalTime),
            curriculumStep: isLectureEnd
              ? CurriculumStep?.LECTURE_END
              : CurriculumStep?.LECTURE,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await curriculumPageNavigate();

        setIsLoading(false);
      } catch {
        toast("not found", {
          description: "잠시 후 다시 시도해 주세요.",
        });
      }
    }
    router.push("/curriculum");
  };

  return (
    isWindow && (
      <>
        <Button
          onClick={onSubmit}
          className="absolute left-6 top-4 z-40 flex w-[100px] gap-1 bg-neutral-800 text-sm text-white hover:bg-black hover:text-white"
        >
          {isLoading ? (
            <Loader2 />
          ) : (
            <>
              <ChevronLeft width={18} height={18} strokeWidth={2} />
              {isLastViewLecture ? "저장하기" : "목록가기"}
            </>
          )}
        </Button>
        {currentLecture?.index === 0 && !userCurriculum?.lastVideoId && (
          <CautionDialog />
        )}
        <div
          className="flex w-full flex-col items-center justify-center bg-black"
          style={{ height: "calc(100vh - 72px)" }}
        >
          {videoMeta?.url ? (
            <video
              ref={videoRef}
              onPlay={() => {
                setIsPlaying(true);
              }} // 비디오 재생 시작
              onPause={() => {
                setIsPlaying(false);
              }} // 비디오 일시 정지
              className="h-full w-full"
              controls
              controlsList="nodownload noplaybackrate"
            >
              <source src={videoMeta.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Loader2 className="animate-spin" stroke="#ffffff" />
          )}
        </div>
      </>
    )
  );
}
