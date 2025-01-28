import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type EmailData = {
  randomMailNumber: number;
  to: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  // 아래 secure 옵션을 사용하려면 465 포트를 사용해야함
  port: 587,
  auth: {
    // 초기에 설정해둔 env 데이터
    user: process.env.NEXT_PUBLIC_AUTH_USER,
    pass: process.env.NEXT_PUBLIC_AUTH_PASS,
  },
});

// /app/api/contact.route.ts
export async function POST(req: Request) {
  const body = await req.json(); // body = ReadableStream

  // 이메일 전송 처리
  try {
    if (body?.isinvitation) {
      await sendInvitationEmail(body);
    } else {
      await sendCertificateMail(body);
    }

    // 성공적으로 메일 전송 후 응답
    return NextResponse.json(
      { message: "메일을 성공적으로 보냈음" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "메일 전송에 실패함" },
      { status: 500 },
    );
  }
}

async function sendCertificateMail(data: EmailData) {
  const certificateMail = {
    from: process.env.NEXT_PUBLIC_AUTH_USER,
    to: data.to,
    subject: `[쓰스 이메일 인증]`,
    html: `
    <h1>이메일 인증</h1>
    <div>이메일 코드: ${data.randomMailNumber}</div>
    </br>
    <p>보낸사람: ${process.env.NEXT_PUBLIC_AUTH_USER}</p>
    `,
    //	attachments 옵션으로 첨부파일도 전송 가능함
    //	attachments : [첨부파일]
  };

  return transporter.sendMail(certificateMail);
}

async function sendInvitationEmail(data: EmailData) {
  const invitationEmail = {
    from: process.env.NEXT_PUBLIC_AUTH_USER,
    to: data.to,
    subject: `[쓰스 이메일 인증]`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h1 style="color: #4CAF50;">쓰스 이메일 초대</h1>
        <p>안녕하세요! 이메일 초대를 위해 아래 버튼을 클릭하여 해당 링크로 이동해주세요.</p>
        
        <a href="${process.env.NEXT_PUBLIC_WEB_URL}/login?isInvited=true" 
          style="display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          이메일 인증하기
        </a>
        
        <p style="margin-top: 20px; color: #777;">위 링크는 이메일 인증을 위한 링크입니다. 본인이 요청하지 않았다면 무시해 주세요.</p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 30px;" />
        
        <p style="font-size: 12px; color: #999;">보낸 사람: ${process.env.NEXT_PUBLIC_AUTH_USER}</p>
      </div>
    `,
  };

  return transporter.sendMail(invitationEmail);
}
