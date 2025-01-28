import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: (process.env.GCS_PRIVATE_KEY ?? "").replace(/\\n/gm, "\n"),
  },
});

const uploadFile = async (file: File, path: string) => {
  const randomUUID = uuidv4();

  if (!file.name) {
    throw new Error("Failed to create Animal: Missing file name");
  }

  const buffer = await file.arrayBuffer();

  await storage
    .bucket(process.env.GCS_BUCKET_NAME ?? "")
    .file(
      `${getFileType(file.type)}/${path.toLowerCase()}/${randomUUID}_${file.name}`,
    )
    .save(Buffer.from(buffer));

  const fileUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${getFileType(file.type)}/${path.toLowerCase()}/${randomUUID}_${file.name}`;
  return fileUrl;
};

// 호출 예제 (Next.js API Route)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File; // 한 개의 파일만 가져오기
    const path = formData.get("path") as string;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const uploadedUrl = await uploadFile(file, path);

    return NextResponse.json(uploadedUrl);
  } catch (error) {
    return new NextResponse("File upload failed", { status: 500 });
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
    return NextResponse.json(
      { error: "파일 다운로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  const form = await request?.formData();
  const file = form.get("file") as File; // 하나의 파일 가져오기
  const path = form.get("path") as string;
  const prevFile = form.get("prevFile") as string; // 이전 파일 하나만

  if (!file) {
    return new NextResponse("No file provided", { status: 400 });
  }

  try {
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME ?? "");

    // 이전 파일 삭제
    if (prevFile) {
      const fileName = decodeURIComponent(prevFile.split("/").pop() || "");
      await bucket
        .file(`${getFileType(file.type)}/${path.toLowerCase()}/${fileName}`)
        .delete();
    }

    const uploadedUrl = await uploadFile(file, path);

    return NextResponse.json(uploadedUrl); // 업로드된 URL 반환
  } catch (error) {
    return NextResponse.json(
      { error: "파일 다운로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const dto = await req.json();
  const bucket = storage.bucket(process.env.GCS_BUCKET_NAME ?? "");

  try {
    if (dto?.prevFile) {
      const fileName = decodeURIComponent(dto?.prevFile.split("/").pop() || "");

      await bucket
        .file(`${dto?.type}/${dto?.path.toLowerCase()}/${fileName}`)
        .delete();
    }
    return new NextResponse("성공", { status: 200 });
  } catch {
    return new NextResponse("No file provided", { status: 400 });
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
