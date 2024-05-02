"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b-2 bg-transparent px-14 py-4 backdrop-blur-lg max-md:hidden">
      <Image src="/next.svg" width={70} height={100} alt="" />
      <Link href="/about">
        <Button variant="secondary">ABOUT</Button>
      </Link>
      <Link href="/course">
        <Button variant="secondary">COURSE</Button>
      </Link>
      <Link href="/about">
        <Button variant="secondary">Q&A</Button>
      </Link>
      <Link href="/about">
        <Button variant="secondary">SHOP</Button>
      </Link>
      <Link href="/about">
        <Button variant="secondary">MYPAGE</Button>
      </Link>
      <Link href="/about">
        <Button variant="default">LOGIN</Button>
      </Link>
    </header>
  );
}
