"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function curriculumPageNavigate() {
  revalidatePath("/curriculum");
}

export async function MCAPageNavigate() {
  redirect("/mypage/corporation/adoption");
}

export async function MCCPageNavigate() {
  redirect("/mypage/corporation/curriculum");
}
