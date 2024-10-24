import { NextRequest, NextResponse } from "next/server";
import { CreateNoticeDto, GetNoticeDto } from "@/dtos/notice.dtos";
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
} from "@/controllers/notice.controllers";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateNoticeDto = await req.json();

    await createNotice(dto);
    return new NextResponse("Notice created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create Notice", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");

  try {
    if (id) {
      const notice: GetNoticeDto | null = await getNoticeById(id as string);

      if (!notice) return new Response("Notice not found", { status: 404 });

      return NextResponse.json(notice);
    } else {
      const notices = await getAllNotices();

      return NextResponse.json(notices);
    }
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateNoticeDto = await req.json();

    await updateNotice(id as string, dto);
    return new NextResponse("Notice updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update Notice", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedNotice = await deleteNotice(id as string);
    if (!deletedNotice)
      return new Response("Notice not found", { status: 404 });
    return new NextResponse("Notice deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Notice", { status: 500 });
  }
}
