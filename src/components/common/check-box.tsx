"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export default function CheckboxDemo({
  label,
  id,
  value,
  useStateF,
}: {
  label: string;
  id: string;
  value: string;
  useStateF: (state: string) => void;
}) {
  const isChecked = value === label;

  const handleChange = () => {
    if (!isChecked) {
      // 체크박스를 클릭했을 때 value를 label로 설정하여 부모 상태를 업데이트
      useStateF(label); // value를 label로 업데이트
    }
  };

  return (
    <div className="flex w-28 items-center space-x-2">
      <Checkbox id={id} checked={isChecked} onClick={handleChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
