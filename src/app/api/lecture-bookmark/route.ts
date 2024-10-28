import { NextRequest, NextResponse } from "next/server";

import {
  CreateLectureBookmarkDto,
  GetLectureBookmarkDto,
} from "@/dtos/lecture-bookmark.dtos";
import {
  createLectureBookmarkService,
  deleteLectureBookmarkService,
  getLectureBookmarkByIdService,
} from "@/services/lecture-bookmark.services";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateLectureBookmarkDto = await req.json();

    await createLectureBookmarkService(dto);

    return new NextResponse("LectureBookmark created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create LectureBookmark", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");

  try {
    if (id) {
      const lectureBookmark: GetLectureBookmarkDto | null =
        await getLectureBookmarkByIdService(id as string);

      if (!lectureBookmark)
        return new Response("LectureBookmark not found", { status: 404 });

      return NextResponse.json(lectureBookmark);
    }
  } catch (error) {
    return new NextResponse("Failed to create LectureBookmark(s)", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req?.nextUrl;

    const id = searchParams.get("id");

    const deletedLectureBookmark = await deleteLectureBookmarkService(
      id as string,
    );

    if (!deletedLectureBookmark)
      return new Response("LectureBookmark not found", { status: 404 });

    return new NextResponse("LectureBookmark deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete LectureBookmark", {
      status: 500,
    });
  }
}
