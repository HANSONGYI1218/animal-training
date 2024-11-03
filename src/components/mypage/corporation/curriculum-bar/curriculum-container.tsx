"use client";

import { useState } from "react";
import CurriculumNav from "../../corporation/curriculum-bar/curriculum-nav";
import LectureTab from "../../corporation/curriculum-bar/lecture-tab";
import TrainingCenterTab from "./training-center-tab";
import CertificateTab from "../../corporation/curriculum-bar/certificate-tab";

export default function CurriculumContainer() {
  const [tab, setTab] = useState("lecture");

  return (
    <main className="flex flex-col gap-10">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" && <LectureTab />}
      {tab === "trainingCenter" && <TrainingCenterTab />}
      {tab === "certificate" && <CertificateTab />}
    </main>
  );
}
