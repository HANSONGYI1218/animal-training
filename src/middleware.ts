// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = [
  "/",
  "/lecture",
  "/curriculum",
  "/login",
  "/id",
  "password",
  "register",
];

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;

  const sessionToken = cookies.get("next-auth.session-token");

  // 로그인이 필요 없는 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (sessionToken) {
      // 로그인된 상태에서 로그인, id, password, register 페이지에 접근하면 /lecture로 리다이렉트
      if (
        ["/login", "/id", "/password", "/register"].some((page) =>
          pathname.startsWith(page),
        )
      ) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_WEB_URL}/lecture`,
        );
      }
    }
    return NextResponse.next();
  }

  // 로그인이 필요한 페이지
  if (!sessionToken) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_URL}/login`);
  }

  // 로그인 되어 있는 경우 요청 페이지로 진행
  return NextResponse.next();
}
