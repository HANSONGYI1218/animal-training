"use client";

import { useState } from "react";
import CurriculumNav from "../../corporation/curriculum-bar/curriculum-nav";
import LectureTab from "./lecture/lecture-tab";
import TrainingCenterTab from "./training-center/training-center-tab";
import CertificateTab from "../../corporation/curriculum-bar/certification/certificate-tab";

export default function CurriculumContainer() {
  const [tab, setTab] = useState("lecture");

  return (
    <main className="flex flex-col gap-10">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" && <LectureTab />}
      {tab === "training-center" && <TrainingCenterTab />}
      {tab === "certificate" && <CertificateTab />}
    </main>
  );
}
