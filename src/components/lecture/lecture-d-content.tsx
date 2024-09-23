'use client';

import type { Lecture, Tutor } from '@/types/tyeps.all';
import YoutubePlayableCard from '../common/youtube-player-card';
import { Button } from '../ui/button';
import { ChevronRight, ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { OccupationTypeSwap, PriceTypeSwap } from '@/constants/constants.all';
import { useState } from 'react';

interface LectureContentProps {
  lecture: Lecture;
  tutor: Tutor;
}

export default function LectureContent({
  lecture,
  tutor,
}: LectureContentProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <section className="container relative mx-auto mt-12 flex w-full max-w-[1150px] justify-between">
      <div className="flex w-2/3">
        <YoutubePlayableCard videoId={'Ave10taSLpc'} start={0} duration={5} />
      </div>
      <div className="sticky top-0 h-fit w-72 rounded-xl border">
        {PriceTypeSwap[lecture?.price_type] === '유료' ? (
          <>
            <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
              특가 할인중!
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">24,000원</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-500">20%</span>
                  <span className="font-semibold text-gray-500 line-through">
                    30,000원
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant={'destructive'}>수강신청 하기</Button>
                <Button variant={'outline'}>찜하기</Button>
              </div>
              <div className="">공유하기 자리</div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
              더 많은 혜택이 있어요!
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-1">
                <span className="mb-2 text-xl font-bold">
                  회원제로 모든 강의를 한번에!
                </span>
                <span className="text-2xl font-bold">24,000</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-500">20%</span>
                  <span className="font-semibold text-gray-500 line-through">
                    30,000원
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant={'destructive'}>수강신청 하기</Button>
                <Button variant={'outline'}>회원제 바로가기</Button>
              </div>
              <div className="">공유하기 자리</div>
            </div>
          </>
        )}
        <div className="flex rounded-b-xl bg-slate-100 px-6 py-3">
          <Dialog>
            <DialogTrigger className="flex cursor-pointer items-center gap-2 text-sm underline decoration-gray-400 underline-offset-4">
              {lecture?.tutor_name}{' '}
              {OccupationTypeSwap[lecture?.tutor_occupation]}님 더 알아보기
              <ChevronRight width={16} height={16} className="opacity-80" />
            </DialogTrigger>
            <DialogContent className="p-8 flex flex-col gap-8">
              <DialogHeader className="relative flex flex-col gap-3">
                <DialogTitle className="flex items-center gap-6">
                  <Image
                    src="/Test-face.png"
                    width={64}
                    height={64}
                    className={`rounded-full cursor-pointer transition-transform duration-500 ease-in-out 
                      ${isClicked ? 'w-full h-full rounded-full object-cover absolute top-0 left-0 z-20' : ''}`}
                    alt="face"
                    onClick={() => setIsClicked(!isClicked)}
                  />
                  <div className="flex flex-col gap-2">
                    {tutor.name}님
                    <span className="text-sm text-gray-700">
                      {tutor.occupation}
                    </span>
                  </div>
                </DialogTitle>
                <hr className="w-full" />
                <DialogDescription className="whitespace-pre-line py-3 leading-5">
                  {tutor?.introduction}
                </DialogDescription>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-green-100 font-bold text-sm">
                      경력사항
                    </span>
                    <hr className="w-full" />
                    <span className="flex gap-3 text-gray-700 font-semibold text-sm">
                      경력
                      <span className="font-medium">{`${tutor?.career}`}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-green-100 font-bold text-sm">
                      소속정보
                    </span>
                    <hr className="w-full" />
                    <span className="flex gap-3 text-gray-700 font-semibold text-sm">
                      소속
                      <span className="font-medium">{`${tutor?.corporation_name}`}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-green-100 font-bold text-sm">
                      훈련소 정보
                    </span>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-1">
                      <span className="flex gap-3 text-gray-700 font-semibold text-sm">
                        이름
                        <span className="font-medium">{`${tutor?.traning_name}`}</span>
                      </span>
                      <span className="flex gap-3 text-gray-700 font-semibold text-sm">
                        위치
                        <span className="font-medium">{`${tutor?.traning_location}`}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-green-100 font-bold text-sm">
                      강사인증
                    </span>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-1">
                      <span className="flex gap-3 text-gray-700 font-semibold text-sm">
                        인증서
                        <span className="cursor-pointer flex gap-2 items-center font-medium underline underline-offset-4 decoration-gray-500">
                          확인하기 <ZoomIn width={14} height={14} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  className="flex items-center gap-2 text-sm"
                  variant={'destructive'}
                >
                  강의 보러가기
                  <ChevronRight width={17} height={17} strokeWidth={2.5} />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
