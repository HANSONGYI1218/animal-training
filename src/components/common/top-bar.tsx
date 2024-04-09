"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b-2 bg-transparent px-14 py-4 backdrop-blur-lg max-md:hidden">
      <Image src="/next.svg" width={70} height={100} alt="" />
    </header>
  );
}
