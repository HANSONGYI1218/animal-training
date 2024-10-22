"use client";

import { Review, Tutor } from "@/types/tyeps.all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CenterNav from "./center-nav";
import { formatPrice } from "@/utils/utils";
import { trainigCurriculums, traningCaution } from "@/constants/constants.all";
import SelectBox from "@/components/common/select-box";
import { MessageCircleMore, ThumbsUp } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import CenterPromotion from "./center-promotion";
import { TrainingCenter } from "@prisma/client";

interface CenterDetailProp {
  center: TrainingCenter | undefined;
  tutor: Tutor | undefined;
  reviews: Review[];
}

export default function CenterContainer({
  center,
  tutor,
  reviews,
}: CenterDetailProp) {
  const [sortedReivews, setSortedReviews] = useState(reviews);
  const [tab, setTab] = useState("info");
  const [sort, setSort] = useState("추천순");

  const sectionInfoRef = useRef<HTMLDivElement>(null);
  const sectionCurriRef = useRef<HTMLDivElement>(null);
  const sectionPriceRef = useRef<HTMLDivElement>(null);
  const sectionReviewRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (v: string) => {
    let currentRef: React.RefObject<HTMLDivElement> | null;

    if (v === "info") {
      currentRef = sectionInfoRef;
    } else if (v === "curriculum") {
      currentRef = sectionCurriRef;
    } else if (v === "price") {
      currentRef = sectionPriceRef;
    } else {
      currentRef = sectionReviewRef;
    }

    const headerHeight = 100; // 고정 헤더의 높이 (px)

    if (currentRef && currentRef.current) {
      const topPosition =
        currentRef.current.getBoundingClientRect().top +
        window.scrollY -
        headerHeight; // 여백 고려
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ratingOrder = ["VERY_GOOD", "GOOD", "GENERAL", "BAD"];

    const sortingReviews = [...reviews].sort((a, b) => {
      if (sort === "추천순") {
        const aRatingIndex = ratingOrder.indexOf(a.rating);
        const bRatingIndex = ratingOrder.indexOf(b.rating);

        return aRatingIndex - bRatingIndex;
      }
      if (sort === "최신순") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      if (sort === "오래된순") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }

      return 0;
    });

    setSortedReviews(sortingReviews);
  }, [sort]);

  return (
    <div className="container mx-auto flex max-w-[1150px] flex-col gap-12">
      <CenterNav tab={tab} setTab={setTab} onClickF={scrollToSection} />
      <div className="relative flex w-full gap-6">
        <div className="flex flex-1 flex-col gap-28">
          {/*정보 섹션*/}
          <section ref={sectionInfoRef} className="flex flex-col gap-6">
            <span className="ml-4 text-xl font-bold">정보</span>
            <div className="flex gap-3 p-6">
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    이름
                  </span>
                  <span className="flex-1">{center?.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    훈련사
                  </span>
                  <span className="flex-1">{tutor?.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    훈련사 소개
                  </span>
                  <span className="flex-1 whitespace-pre-line leading-7">
                    {tutor?.introduction}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    휴일
                  </span>
                  {center?.holidays.map((holiday, index: number) => (
                    <span key={index}>
                      <span>{holiday}</span>
                      <span
                        className={`${index === center?.holidays.length - 1 && "hidden"}`}
                      >
                        ,
                      </span>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    회당 가격
                  </span>
                  <span className="flex-1">{formatPrice(center?.price)}원</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-neutral-600">
                    위치
                  </span>
                  <span className="flex-1">{center?.address}</span>
                </div>
                <Image src="/map.png" width={400} height={300} alt="map" />
              </div>
            </div>
          </section>
          {/*커리큘럼 섹션*/}
          <section ref={sectionCurriRef} className="flex flex-col gap-6">
            <div className="mx-4 flex flex-col gap-1">
              <span className="text-xl font-bold">커리큘럼</span>
              <span className="text-end text-neutral-500">8차시 | 16시간</span>
              <span className="text-end text-red-500">
                * 커리큘럼은 모든 훈련소가 동일합니다.
              </span>
            </div>
            <div className="flex flex-col p-6">
              {trainigCurriculums.map((curriculum, index) => (
                <div
                  key={`item-${index + 1}`}
                  className="flex flex-col gap-3 border-b px-3 py-6"
                >
                  <span className="font-semibold text-neutral-600">
                    {`${index + 1}`}. {curriculum?.title}
                  </span>
                  <div className="mx-3 flex justify-between text-base">
                    <span className="text-neutral-600">
                      {curriculum?.content}
                    </span>
                    <span className="text-neutral-600">{curriculum?.hour}</span>
                  </div>
                </div>
              ))}
              <div className="mt-10 flex flex-col gap-2">
                <span className="text-lg font-semibold text-red-500">
                  * 주의사항
                </span>
                {traningCaution.map((caution: string, index: number) => (
                  <span key={index}>
                    {index + 1}. {caution}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/*가격 섹션*/}
          <section ref={sectionPriceRef} className="flex flex-col">
            <span className="mx-4 text-xl font-bold">가격</span>
            <div className="flex flex-col gap-2 p-6">
              <span>수강료</span>
              <span className="font-semibold">
                8 X {formatPrice(center?.price)}={" "}
                <span className="text-lg font-bold text-red-500">
                  {center?.price && formatPrice(center?.price * 8)}원
                </span>
              </span>
              <div className="mt-10 flex flex-col gap-2">
                <span className="text-lg font-semibold text-red-500">
                  * 환불 정책
                </span>
                {traningCaution.map((caution: string, index: number) => (
                  <span key={index}>
                    {index + 1}. {caution}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/*후기 섹션*/}
          <section ref={sectionReviewRef} className="flex flex-col">
            <div className="mx-4 flex flex-col gap-1">
              <span className="text-xl font-bold">후기</span>
              <div className="mb-3 flex items-center justify-end gap-6">
                <div className="flex items-center gap-1">
                  <MessageCircleMore
                    className="h-4 w-4"
                    stroke="rgb(115 115 115)"
                  />
                  <span className="text-neutral-500">12개</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" stroke="rgb(115 115 115)" />
                  <span className="text-neutral-500">{center?.like}개</span>
                </div>
              </div>
              <SelectBox
                lists={["추천순", "최신순", "오래된순"]}
                className="w-32 self-end"
                placeholder="추천순"
                useStateF={setSort}
              />
            </div>
            <div className="flex flex-col gap-2 p-6">
              {sortedReivews.map((review: Review) => {
                return (
                  <div
                    key={review.id}
                    className="flex flex-col gap-3 border-b px-4 py-8"
                  >
                    <div className="flex w-full items-center justify-start gap-4">
                      <Image
                        src="/images/record/profile.png"
                        width={36}
                        height={36}
                        alt="profile"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">ㅇㅇㅇ</span>
                        <span className="text-sm text-neutral-500">
                          {format(review?.createdAt, "yyyy.MM.dd")}
                        </span>
                      </div>
                    </div>
                    <span>{review?.content}</span>
                    <div className="mt-2 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        {review?.rating === "VERY_GOOD" ? (
                          <>
                            <Image
                              src="/icons/love-face.svg"
                              width={24}
                              height={24}
                              alt="profile"
                            />
                            <span className="text-sm">추천해요!</span>
                          </>
                        ) : review?.rating === "GOOD" ? (
                          <>
                            <Image
                              src="/icons/good-face.svg"
                              width={24}
                              height={24}
                              alt="profile"
                            />
                            <span className="text-sm">좋아요</span>
                          </>
                        ) : review?.rating === "GENERAL" ? (
                          <>
                            <Image
                              src="/icons/general-face.svg"
                              width={24}
                              height={24}
                              alt="profile"
                            />
                            <span className="text-sm">보통이에요</span>
                          </>
                        ) : (
                          <>
                            <Image
                              src="/icons/bad-face.svg"
                              width={24}
                              height={24}
                              alt="profile"
                            />
                            <span className="text-sm">추천하지 않아요</span>
                          </>
                        )}
                      </div>
                      <Badge className="border-[1.8px] border-neutral-600 bg-white">
                        수강완료
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <CenterPromotion />
      </div>
    </div>
  );
}
