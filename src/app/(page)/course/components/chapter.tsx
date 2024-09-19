import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProgressColor from "./progress-color";

export default function Chanpter({
  courses,
  courseId,
}: {
  courses: any[];
  courseId: number;
}) {
  console.log("dhkrdhkr: ", courseId);
  return (
    <Accordion type="single" collapsible className="w-full">
      {courses.map((course, index) => {
        return (
          <AccordionItem
            value={course.id}
            className={` ${courseId === course.id && "text-[#007200]"}`}
          >
            <AccordionTrigger className="text-sm font-semibold hover:text-[#007200]">{`${
              index + 1
            }. ${course.title}`}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <div className="flex gap-1">
                <p className="text-BB12">진도율</p>
                <ProgressColor
                  progress={course.progress}
                  className="text-BB12"
                />
              </div>
              <p className="text-xs font-medium">{course.content}</p>
              <Image
                src={course.sumnailImg}
                alt="기본 이미지"
                width={100}
                height={100}
                className="w-full rounded-md"
              />
              <Link href={`/course/${course.id}`} prefetch>
                <div className="flex itmes-center justify-end">
                  <p className="text-xs font-medium">강의보기</p>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
