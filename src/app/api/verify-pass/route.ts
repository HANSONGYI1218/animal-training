import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.NICE_CLIENT_ID;
const clientSecret = process.env.NICE_CLIENT_SECRET_KEY;
const authorization = Buffer.from(clientId + ":" + clientSecret).toString(
  "base64",
);

export async function POST(req: NextRequest, res: NextResponse) {
  const phoneNumber = req.json();

  try {
    // PASS 인증 API 호출
    const passResponse = await fetch("https://pass-api-url.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // PASS API 키
      },
      body: JSON.stringify({
        phoneNumber, // 요청 데이터
        returnUrl: "http://your-redirect-url.com/complete", // 결과 처리 URL
      }),
    });

    if (!passResponse.ok) {
      throw new Error("PASS 인증 요청 실패");
    }

    const result = await passResponse.json();

    // 인증 성공 시 클라이언트로 전달
    return new NextResponse("UserTutorTrainingCenter created successfully", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Failed to create UserTutorTrainingCenter", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const dataBody = {
    scope: "default",
    grant_type: "client_credentials",
  };

  try {
    // PASS 인증 API 호출

    const passResponse = await fetch(
      "https://svc.niceapi.co.kr:22001/digital/niceid/oauth/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authorization}`,
        },
        body: dataBody.toString(),
      },
    );

    if (!passResponse.ok) {
      throw new Error("PASS 인증 요청 실패");
    }

    const result = await passResponse.json();

    const token = result.data.dataBody.access_token;

    return NextResponse.json(token);
  } catch (error: any) {
    return new NextResponse("Failed to create UserTutorTrainingCenter", {
      status: 500,
    });
  }
}
