import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // JWT 세션 전략 사용
    maxAge: 24 * 60 * 60, // 세션 쿠키
    // updateAge: 24 * 60 * 60, // 매일 세션 갱신
  },
  providers: [
    // 일반 로그인 로직 및 유효성 검사
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userType: {
          label: "구분",
        },
        email: {
          label: "이메일",
        },
        password: { label: "비밀번호" },
      },

      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/${credentials?.userType.toLowerCase()}?email=${credentials?.email}&password=${credentials?.password}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return null;
        }

        const user = await response.json();

        if (user) {
          // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
          cookies().set("userType", `${credentials?.userType}`);
          return user;
        } else {
          return null; // 잘못된 자격 증명
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
