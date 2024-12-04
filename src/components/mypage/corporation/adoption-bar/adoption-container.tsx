"use client";

import { useState } from "react";
import AdoptionRecord from "./record/adoption-record";
import AdoptionNav from "./adoption-nav";
import ManagementTab from "./management/management-tab";

export default function AdoptionContainer() {
  const [tab, setTab] = useState("management");

  return (
    <main className="flex flex-col gap-10">
      <AdoptionNav tab={tab} setTab={setTab} />
      {tab === "management" && <ManagementTab />}
      {tab === "record" && <AdoptionRecord />}
    </main>
  );
}
