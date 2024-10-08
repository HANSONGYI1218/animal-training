"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const path = usePathname();

  // 해당 조건에 맞지 않으면 null 반환
  return (
    <>
      <footer
        className={`h-[168px] border-t-2 max-md:hidden ${
          path.startsWith("/curriculum/lecture") &&
          path.split("/").length === 5 &&
          "hidden"
        }`}
      >
        <section className="mx-auto my-auto flex h-full max-w-6xl justify-between px-4 py-5 text-xs">
          <div className="tracking-wide">
            <p className="pb-3 font-bold">인사이드아웃 사회적 협동조합</p>
            <p>사업자등록번호: 324-82-00580 | 이사장: 염민호 (스팩스페이스)</p>
            <p>통신판매업 신고번호: 2022-경기김포-3659</p>
            <p>
              주소: 서울특별시 강서구 마곡중앙2로 11, 3층 305호(마곡동, M밸리 W
              TOWER III)
            </p>
            <p>연락처: 02-6217-1114</p>
            <p>FAX: 02-6217-1115</p>
            <p>고객센터: cs@sniperfactory.com</p>
          </div>
          <div className="flex flex-col items-center gap-5 pt-4 mobile:items-end mobile:pt-0">
            <div className="flex flex-row">
              <Link href="/policy" className="flex">
                <p>개인정보 처리방침</p>
                <p className="mx-2">|</p>
                <p>서비스 이용약관</p>
              </Link>
              <p className="mx-2">|</p>
              <p>환불규정</p>
            </div>
            <div className="flex flex-row gap-4">
              <Link
                href="https://www.instagram.com/sniperfactory_official/"
                target="_blank"
                className="sns-link"
              >
                <Image
                  src="/instagram.svg"
                  width={30}
                  height={30}
                  alt="instagram"
                  className="sns-icon"
                />
              </Link>
              <Link
                href="https://www.youtube.com/@user-tl4ho6fw4u"
                target="_blank"
                className="sns-link"
              >
                <Image
                  src="/youtube.svg"
                  width={30}
                  height={30}
                  alt="youtube"
                  className="sns-icon"
                />
              </Link>
            </div>
          </div>
        </section>
      </footer>
      {!(path.includes("entitle") || path.includes("apply")) && (
        <footer className="h-50 border-t-2 md:hidden">
          <section className="mx-auto my-auto flex max-w-6xl justify-between px-4 py-10 text-xs">
            <div className="tracking-wide">
              <p className="pb-3 font-bold">인사이드아웃 사회적 협동조합</p>
              <p>고유번호: 324-82-00580 | 이사장: 염민호 (스팩스페이스)</p>
              <p>통신판매업 신고번호: 2022-경기김포-3659</p>
              <p>
                주소: 서울특별시 강서구 마곡중앙2로 11, 3층 305호(마곡동, M밸리
                W TOWER III)
              </p>
              <p>연락처: 02-6217-1114</p>
              <p>FAX: 02-6217-1115</p>
              <p>고객센터: cs@sniperfactory.com</p>
            </div>
            <div className="flex flex-col items-center gap-5 pt-4 mobile:items-end mobile:pt-0">
              <div className="flex flex-row">
                <Link href="/policy" className="flex">
                  <p className="underline">개인정보 처리방침</p>
                  <p className="mx-2">|</p>
                  <p className="underline">서비스 이용약관</p>
                </Link>
                <p className="mx-2">|</p>
                <p className="underline">환불규정</p>
              </div>
              <div className="flex flex-row gap-4">
                <Link
                  href="https://www.instagram.com/sniperfactory_official/"
                  target="_blank"
                  className="sns-link"
                >
                  <Image
                    src="/instagram.svg"
                    width={30}
                    height={30}
                    alt="instagram"
                    className="sns-icon"
                  />
                </Link>
                <Link
                  href="https://www.youtube.com/@user-tl4ho6fw4u"
                  target="_blank"
                  className="sns-link"
                >
                  <Image
                    src="/youtube.svg"
                    width={30}
                    height={30}
                    alt="youtube"
                    className="sns-icon"
                  />
                </Link>
              </div>
            </div>
          </section>
        </footer>
      )}
    </>
  );
}
