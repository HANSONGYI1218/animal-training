"use client";

import { useEffect, useState } from "react";
import CurriculumNav from "../../corporation/curriculum-bar/curriculum-nav";
import LectureTab from "./lecture/lecture-tab";
import TrainingCenterTab from "./training-center/training-center-tab";
import CertificateTab from "../../corporation/curriculum-bar/certification/certificate-tab";
import TutorTab from "./tutor/tutor-tab";

export default function CurriculumContainer() {
  const [tab, setTab] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage) {
      const prevUrl = sessionStorage.getItem("lastVisitedURL");
      const route = prevUrl?.split("/")[5];

      if (route === "lecture") {
        setTab("lecture");
      } else if (route === "training-center") {
        setTab("training-center");
      } else if (route === "certificate") {
        setTab("certificate");
      } else {
        setTab("tutor");
      }
    } else {
      setTab("tutor");
    }
  }, []);

  return (
    <main className="flex flex-col gap-10">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "tutor" && <TutorTab />}
      {tab === "lecture" && <LectureTab />}
      {tab === "training-center" && <TrainingCenterTab />}
      {tab === "certificate" && <CertificateTab />}
    </main>
  );
}
