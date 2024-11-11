"use client";

import { useState } from "react";
import ConsentFormTab from "./consent-form/consent-form-tab";
import InvitaionTab from "./invitation/invitaion-tab";
import AdoptionNav from "./adoption-nav";

export default function AdoptionContainer() {
  const [tab, setTab] = useState("invitation");

  return (
    <main className="flex flex-col gap-10">
      <AdoptionNav tab={tab} setTab={setTab} />
      {tab === "invitation" && <InvitaionTab />}
      {tab === "consent-form" && <ConsentFormTab />}
    </main>
  );
}
