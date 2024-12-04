"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import LectureTab from "./lecture-tab";
import TrainingLectureTab from "./training-lecture-tab";
import TrainingCenterTab from "./training-center-tab";
import CertificateTab from "./certificate-tab";
import AdoptionProvider from "@/providers/adoption-provider";

export default function CurriculumContainer() {
  const [tab, setTab] = useState("lecture");

  return (
    <main className="flex flex-col gap-10">
      <CurriculumNav tab={tab} setTab={setTab} />
      <AdoptionProvider adoption={}>
        {tab === "lecture" && <LectureTab />}
        {tab === "training-lecture" && <TrainingLectureTab />}
        {tab === "trainingCenter" && <TrainingCenterTab />}
        {tab === "certificate" && <CertificateTab />}
      </AdoptionProvider>
    </main>
  );
}
