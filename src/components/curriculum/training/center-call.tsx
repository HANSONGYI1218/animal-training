"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CenterCall({ callNumber }: { callNumber: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-100 hover:bg-slate-200 hover:text-black">
          문의하기
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">훈련소 전화번호</DialogTitle>
        </DialogHeader>
        <span className="text-center text-3xl font-semibold">{callNumber}</span>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
