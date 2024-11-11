"use client";

import CorporationExtraInfForm from "./corporation-extra-info-form";
import LoginInfoForm from "./login-info-form";
import UserExtraInfoForm from "./user-extra-info-form";
import { useState } from "react";

export default function RegisterForm() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [userType, setUserType] = useState<string>("c");

  return (
    <div className="flex w-1/4">
      {currentIndex === 0 ? (
        <LoginInfoForm setCurrentIndex={setCurrentIndex} />
      ) : userType === "USER" ? (
        <UserExtraInfoForm />
      ) : (
        <CorporationExtraInfForm />
      )}
    </div>
  );
}
