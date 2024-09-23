'use client';

import { Lecture } from '@prisma/client';
import { Category } from '@/types/tyeps.all';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import LectureContainer from '../lecture/lecture-container';

export default function TutorCategory({ lectures }: { lectures: Lecture[] }) {
  const [filterLectures, setFilterLectures] = useState<Lecture[]>(lectures);
  const [selectCategory, setSelectCategory] = useState<string>('전체');

  useEffect(() => {
    const getLectures = lectures.filter((lecture) => {
      const matchesCategory =
        selectCategory === '전체' || lecture.category === selectCategory;

      return matchesCategory;
    });

    setFilterLectures(getLectures);
  }, [selectCategory, lectures]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full justify-center gap-6">
        <Badge
          onClick={() => {
            setSelectCategory('전체');
          }}
          variant={'tag'}
          className={`cursor-pointer ${selectCategory === '전체' && 'bg-black text-white'}`}
        >
          전체
        </Badge>
        {Object.values(Category).map((value, index: number) => {
          return (
            <Badge
              onClick={() => {
                setSelectCategory(value);
              }}
              key={index}
              variant={'tag'}
              className={`cursor-pointer ${selectCategory === value && 'bg-black text-white'}`}
            >
              {value}
            </Badge>
          );
        })}
      </div>
      <LectureContainer lectures={filterLectures} />
    </div>
  );
}
