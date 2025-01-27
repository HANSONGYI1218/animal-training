import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: (process.env.GCS_PRIVATE_KEY ?? "").replace(/\\n/gm, "\n"),
  },
});

export async function POST(request: Request): Promise<NextResponse> {
  const form = await request?.formData();
  const file = form.get("file") as File;
  const path = form.get("path") as string;

  if (!file.name) {
    return new NextResponse("Failed to create Animal", { status: 500 });
  }

  try {
    const buffer = await file.arrayBuffer();

    await storage
      .bucket(process.env.GCS_BUCKET_NAME ?? "")
      .file(`${getFileType(file.type)}/${path.toLowerCase()}/${file.name}`)
      .save(Buffer.from(buffer));
    return new NextResponse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("파일 다운로드 실패:", error);
    return NextResponse.json(
      { error: "파일 다운로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("file");

  if (!filePath) {
    return NextResponse.json(
      { error: "파일명을 입력해주세요." },
      { status: 400 },
    );
  }

  // 마지막 '/'의 인덱스를 찾습니다.
  const lastSlashIndex = filePath.lastIndexOf("/");

  // 파일 경로에서 폴더 부분과 파일명 부분을 나눕니다.
  const folder = filePath.slice(0, lastSlashIndex); // 'video/curriculum/dog'
  const fileName = filePath.slice(lastSlashIndex + 1); // '1 경찰이 도둑 잡는 영상02.mp4'

  try {
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME ?? "");
    const file = bucket.file(filePath);

    const [metadata]: any = await file.getMetadata();

    const encodedFileName = encodeURIComponent(fileName);
    const publicUrl = `https://storage.googleapis.com/${metadata.bucket}/${folder}/${encodedFileName}`;

    return new NextResponse(
      JSON.stringify({
        success: true,
        url: publicUrl,
        fileName: metadata.name,
        size: metadata.size, // 파일 크기 (바이트 단위)
        contentType: metadata.contentType, // 파일 타입 (예: video/mp4)
        length: (metadata.size ?? 0) / 1024 / 1024, // 파일 크기 (MB)
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("파일 다운로드 실패:", error);
    return NextResponse.json(
      { error: "파일 다운로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

function getFileType(fileType: string): string {
  if (fileType.startsWith("image/")) {
    return "image";
  } else if (fileType.startsWith("video/")) {
    return "video";
  } else {
    return "pdf";
  }
}
