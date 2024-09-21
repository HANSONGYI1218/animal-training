'use client';

import { Lecture } from '@/types/tyeps.all';
import YoutubePlayableCard from '../common/youtube-player-card';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
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

interface LectureContentProps {
  lecture: Lecture;
}

export default function LectureContent({ lecture }: LectureContentProps) {
  return (
    <section className="container relative mx-auto mt-12 flex w-full max-w-[1150px] justify-between">
      <div className="flex w-2/3">
        <YoutubePlayableCard videoId={'Ave10taSLpc'} start={0} duration={5} />
      </div>
      <div className="sticky top-0 h-fit w-72 rounded-xl border">
        {lecture?.price_type === '유료' ? (
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
        <div className="flex rounded-b-xl bg-gray-100 px-6 py-3">
          <Dialog>
            <DialogTrigger className="flex cursor-pointer items-center gap-2 text-sm underline decoration-gray-400 underline-offset-4">
              {lecture?.tutor?.name} {lecture?.tutor?.occupation}님 더 알아보기
              <ChevronRight width={16} height={16} className="opacity-80" />
            </DialogTrigger>
            <DialogContent className="p-8">
              <DialogHeader className="flex flex-col gap-3">
                <DialogTitle className="flex items-center gap-6">
                  <Image
                    src="/Test-face.png"
                    width={64}
                    height={64}
                    className="rounded-full"
                    alt="face"
                  />
                  <div className="flex flex-col gap-2">
                    {lecture?.tutor?.name}님
                    <span className="text-sm text-muted-foreground">
                      {lecture?.tutor?.occupation}
                    </span>
                  </div>
                </DialogTitle>
                <hr className="w-full border-black" />
                <DialogDescription className="flex items-center gap-10 whitespace-pre-line py-2">
                  {lecture?.tutor?.introduction}
                </DialogDescription>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">
                    {`경력 | ${lecture?.tutor?.career}`}
                  </span>
                  <span className="text-sm">
                    {`소속 | ${lecture?.tutor?.corporation?.corporation_name}`}
                  </span>
                  <span className="text-sm">
                    {`훈련소 이름 | ${lecture?.tutor?.traning_name}`}
                  </span>
                  <span className="text-sm">
                    {`훈련소 위치 | ${lecture?.tutor?.traning_location}`}
                  </span>
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
