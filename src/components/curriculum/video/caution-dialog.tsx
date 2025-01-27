"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function CautionDialog() {
  const [isOpend, setIsOpend] = useState(false);

  useEffect(() => {
    setIsOpend(true);
  }, []);

  return (
    <Dialog open={isOpend} onOpenChange={setIsOpend}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>📌 잊지마세요</DialogTitle>
          <DialogDescription className="flex py-2 text-base">
            상단에 있는 '저장하기' 버튼을 눌러야 시청 기록이 저장됩니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setIsOpend(false);
              }}
            >
              이해했어요
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
