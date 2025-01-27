"use client";

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { AdoptionStep, CurriculumStep } from "@prisma/client";

export const trainingAgreementPdfCreation = async (
  adoptionId: string,
  userCurriculumId: string,
  tutorTrainingCenterId: string,
) => {
  try {
    // 1. 새 PDF 문서 생성
    const pdfDoc = await PDFDocument.create();

    // 2. fontkit 등록 (필수)
    pdfDoc.registerFontkit(fontkit);

    // 3. 페이지 추가
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // 4. 한글 폰트 불러오기
    const fontBytes = await fetch("/fonts/NanumGothic-Regular.ttf").then(
      (res) => res.arrayBuffer(),
    );

    // 5. 폰트 임베드
    const customFont = await pdfDoc.embedFont(fontBytes);

    // 6. 내용 작성
    page.drawText("훈련 동의서", {
      x: 50,
      y: height - 50,
      size: 24,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("본인은 해당 내용에 동의합니다.", {
      x: 50,
      y: height - 100,
      size: 16,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    // 5. PDF 파일 저장
    const pdfBytes = await pdfDoc.save();

    // 6. 파일 다운로드
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const formData = new FormData();
    formData.append("file", blob, `${adoptionId}.pdf`);
    formData.append("path", `trainingAgreementUrl`);

    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "agreement.pdf"; // 다운로드 이름 설정
    // link.click();

    // 1️⃣ 병렬 요청 준비
    const blobRequest = fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/blob`, {
      method: "POST",
      body: formData,
    });

    const adoptionRequest = fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: adoptionId,
          step: AdoptionStep.TRAINING,
          trainingAgreementUrl: `${adoptionId}.pdf`,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const userCurriculumRequest = fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: userCurriculumId,
          step: CurriculumStep.TRAINING_APPLICATION,
          tutorTrainingCenterId: tutorTrainingCenterId,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    // 2️⃣ 모든 요청이 완료될 때까지 대기
    const responses = await Promise.all([
      blobRequest,
      adoptionRequest,
      userCurriculumRequest,
    ]);

    // 3️⃣ 응답 상태 확인
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`요청 실패: ${response.url}`);
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
