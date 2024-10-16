"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import LectureTab from "./lecture-tab";
import TraningLectureTab from "./traning-lecture-tab";
import TraningCenterTab from "./traning-center-tab";
import CertificateTab from "./certificate-tab";

export default function CurriculumContainer() {
  const [tab, setTab] = useState("lecture");

  return (
    <main className="flex flex-col gap-10">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" && <LectureTab />}
      {tab === "traning-lecture" && <TraningLectureTab />}
      {tab === "traningCenter" && <TraningCenterTab />}
      {tab === "certificate" && <CertificateTab />}
    </main>
  );
}
