"use client";

import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import {
  Captions,
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume1,
  VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/utils/utils";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { AnimalType } from "@prisma/client";

export default function PlayableCard({
  url,
  userId,
  lastPlayedTime,
  lastVideoIndex,
  animalType,
}: {
  url: string;
  userId: string;
  lastPlayedTime: number;
  lastVideoIndex: number;
  animalType: AnimalType;
}) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMove, setIsMove] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isHoverVolume, setIsHoverVolume] = useState(false);
  const [isMuteVolume, setIsMuteVolume] = useState(false);
  const [volume, setVolume] = useState<number>(33);
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const moveTimerRef = useRef<NodeJS.Timeout | null>(null); // move 타이머를 useRef로 관리
  const intervalRef = useRef<any>(null);
  const handle = useFullScreenHandle();

  useEffect(() => {
    setIsWindow(true);

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      const putLastVideoIndex =
        playerRef?.current &&
        totalDuration >= playerRef?.current?.getDuration() - 120
          ? lastVideoIndex + 1
          : lastVideoIndex;
      const putLastVideoTime =
        playerRef?.current &&
        totalDuration >= playerRef?.current?.getDuration() - 120
          ? 0
          : totalDuration;

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/user`, {
        method: "PUT",
        body: JSON.stringify({
          animalType: animalType,
          id: userId,
          lastVideoTime: putLastVideoTime,
          lastVideoIndex: putLastVideoIndex,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // 사용자에게 확인창 표시 (선택적)
      event.preventDefault();
    };

    // beforeunload 이벤트 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function init() {
      setIsPlaying(false);
    }
    if (isWindow) {
      init();
    }
  }, [isWindow]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTotalDuration((prevDuration: number) => {
          const duration = playerRef?.current?.getDuration();

          // 동영상 길이를 초과하면 clearInterval
          if (duration && prevDuration >= duration) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return duration; // 동영상 길이를 초과하지 않도록 고정
          }

          return prevDuration + 1;
        });
      }, 1000);
    } else {
      // isPlaying이 false일 때, interval을 클리어
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // 컴포넌트가 unmount될 때 interval을 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]); // value는 number[] 타입이므로 첫 번째 값만 사용
    if (value[0] === 0) {
      setIsMuteVolume(true);
    } else {
      setIsMuteVolume(false);
    }
  };

  const gradientValue = () => {
    const percentage = played * 100; // played 값을 비율로 변환 (0~100)

    // 그라디언트 스타일 업데이트
    return `linear-gradient(to right, #00592D 0%, #00592D ${percentage}%, rgb(236, 236, 236) ${percentage}%, rgb(236, 236, 236) 100%)`;
  };

  return (
    isWindow && (
      <FullScreen className="relative" handle={handle}>
        <div
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="flex w-full flex-col"
        >
          <section
            className={`absolute left-4 top-4 h-10 w-fit flex-col items-center justify-center px-4 ${isHover && isMove ? "flex" : "hidden"}`}
          >
            <div className="absolute bottom-0 left-0 h-full w-full rounded-full bg-black opacity-50" />
            <span className="relative z-10 text-sm font-semibold text-white">
              수강율 {formatTime(totalDuration)}
            </span>
          </section>
          <section className="container mx-auto flex w-full">
            <div
              className="flex w-full text-white"
              style={{ height: "calc(100vh - 72px)" }}
              suppressHydrationWarning
            >
              <ReactPlayer
                ref={playerRef}
                url={"https://www.youtube.com/watch?v=BirYeTFOE_A"}
                playsinline={false}
                muted={false}
                volume={volume}
                playing={isPlaying}
                width={"100%"}
                height={"100%"}
                controls={false}
                playIcon={<Button>1</Button>}
                onProgress={({ played }) => {
                  setPlayed(played); // 비디오 재생 비율 업데이트
                }}
              />
            </div>
          </section>
          <section
            className={`absolute bottom-0 left-0 h-16 w-full flex-col justify-between bg-transparent ${isHover && isMove ? "flex" : "hidden"}`}
          >
            <input
              type="range"
              min="0"
              max="1" // played는 0~1 범위
              step="0.001"
              value={played}
              className="video_slider z-10"
              style={{
                background: gradientValue(), // progress 값에 맞는 배경 색상
              }}
              onChange={(e) => {
                setPlayed(parseFloat(e.target.value)); // 재생 포인트 위치 실시간 변경
                playerRef?.current?.seekTo(parseFloat(e.target.value)); // 실제 영상 재생 위치 실시간 변경
              }}
            />
            <div className="relative z-0 flex w-full flex-1 items-center justify-between px-10">
              <div className="absolute bottom-0 left-0 h-full w-full bg-black opacity-50" />
              <div className="relative z-10 flex w-full items-center gap-6">
                {isPlaying ? (
                  <Pause
                    onClick={() => {
                      setIsPlaying(false);
                    }}
                    stroke="#ffffff"
                    cursor={"pointer"}
                    fill="#ffffff"
                  />
                ) : (
                  <Play
                    onClick={() => {
                      setIsPlaying(true);
                    }}
                    stroke="#ffffff"
                    cursor={"pointer"}
                    fill="#ffffff"
                  />
                )}
                <div
                  onMouseEnter={() => {
                    setIsHoverVolume(true);
                  }}
                  onMouseLeave={() => {
                    setIsHoverVolume(false);
                  }}
                  className="flex items-center gap-3"
                >
                  {isMuteVolume ? (
                    <VolumeX
                      onClick={() => {
                        setIsMuteVolume(false);
                        setVolume(33);
                      }}
                      className="h-7 w-7"
                      stroke="#ffffff"
                      cursor={"pointer"}
                      fill="#ffffff"
                    />
                  ) : (
                    <Volume1
                      onClick={() => {
                        setIsMuteVolume(true);
                        setVolume(0);
                      }}
                      className="h-7 w-7"
                      stroke="#ffffff"
                      cursor={"pointer"}
                      fill="#ffffff"
                    />
                  )}
                  <Slider
                    defaultValue={[volume]}
                    value={[volume]}
                    dir="ltr"
                    onValueChange={handleVolumeChange}
                    min={0}
                    max={100}
                    step={1}
                    className={`w-24 cursor-pointer ${isHoverVolume ? "flex" : "hidden"} `}
                  />
                </div>
                <span className="text-sm text-white">
                  {formatTime(
                    played * (playerRef?.current?.getDuration() ?? 0),
                  )}{" "}
                  / {formatTime(playerRef?.current?.getDuration() ?? 0)}
                </span>
              </div>
              <div className="relative z-10 flex items-center gap-6">
                <Captions
                  className="h-7 w-7"
                  stroke="#ffffff"
                  cursor={"pointer"}
                />
                {handle.active ? (
                  <Minimize
                    onClick={handle.exit}
                    stroke="#ffffff"
                    cursor={"pointer"}
                  />
                ) : (
                  <Maximize
                    onClick={handle.enter}
                    stroke="#ffffff"
                    cursor={"pointer"}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </FullScreen>
    )
  );
}
