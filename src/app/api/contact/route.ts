// /app/api/contact.route.ts
export async function POST(req: Request) {
  const body = await req.json(); // body = ReadableStream

  // Nodemailer 이메일 전송 로직
  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: "메일을 성공적으로 보냈음" }), {
          status: 200,
        }),
    )
    .catch((error) => {
      console.error(error);

      return new Response(JSON.stringify({ message: "메일 전송에 실패함" }), {
        status: 500,
      });
    });
}

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

async function sendEmail(data: EmailData) {
  const mailData = {
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

  return transporter.sendMail(mailData);
}
