import { NextRequest, NextResponse } from "next/server";

import {
  CreateTutorBookmarkDto,
  GetTutorBookmarkDto,
} from "@/dtos/tutor.bookmark.dto";
import {
  createTutorBookmarkService,
  deleteTutorBookmarkService,
  getTutorBookmarkByIdService,
} from "@/services/tutor.bookmark.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateTutorBookmarkDto = await req.json();

    await createTutorBookmarkService(dto);
    return new NextResponse("TutorBookmark created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create TutorBookmark", {
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
      const tutorBookmark: GetTutorBookmarkDto | null =
        await getTutorBookmarkByIdService(id as string);

      if (!tutorBookmark)
        return new Response("TutorBookmark not found", { status: 404 });

      return NextResponse.json(tutorBookmark);
    }
  } catch (error) {
    return new NextResponse("Failed to create TutorBookmark(s)", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req?.nextUrl;

    const id = searchParams.get("id");

    await deleteTutorBookmarkService(id as string);

    return new NextResponse("TutorBookmark deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete TutorBookmark", {
      status: 500,
    });
  }
}
