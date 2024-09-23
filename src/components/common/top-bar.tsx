'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LectureCategory from '../lecture/lecture-category';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const [scrollY, setScrollY] = useState(0);
  const path = usePathname();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY) {
      setScrollDirection('down');
    } else if (currentScrollY < scrollY) {
      setScrollDirection('up');
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <header
      className={`sticky top-0 z-30 flex w-full flex-col bg-white transition duration-700 ${
        path === '/lecture'
          ? scrollDirection === 'up'
            ? 'translate-y-0'
            : '-translate-y-20'
          : 'translate-y-0'
      }`}
    >
      <div className="flex border-b py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Image src="/next.svg" width={70} height={100} alt="main-logo" />
          <div className="flex items-center gap-4">
            <Link href="/lecture?category=all">
              <Button variant="default" className="w-20">
                강의
              </Button>
            </Link>
            <Link href="/course">
              <Button variant="default" className="w-20">
                커리큘럼
              </Button>
            </Link>
            <Link href="/record">
              <Button variant="default" className="w-20">
                입양기록
              </Button>
            </Link>
            <Link href="/mypage">
              <Button variant="default" className="w-20">
                내 정보
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="default" className="w-20">
                스토어
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="login" className="px-2 py-1">
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {path === '/lecture' && <LectureCategory />}
    </header>
  );
}
