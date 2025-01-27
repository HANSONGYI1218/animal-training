"use server";

import { authOptions } from "@/authOptions";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("userType");
}

export async function currentAccount() {
  const session = await getServerSession(authOptions);
  return session;
}
