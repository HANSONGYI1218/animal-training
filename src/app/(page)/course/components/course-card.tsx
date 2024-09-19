import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function CourseCard({ course }: { course: any }) {
  return (
    <Link href={`course/${course.id}`}>
      <div className="flex flex-col shadow-md border-t border-neutral-5 rounded-lg gap-3 p-6 w-full hover:shadow-xl hover:cursor-pointer">
        <h1 className="text-BB18">{course.title}</h1>
        <div className="flex gap-2">
          <Badge variant={"default"} className="w-fit">
            {course.category}
          </Badge>
          <Badge
            variant={
              course.animal_type === "강아지" ? "secondary" : "destructive"
            }
            className="w-fit"
          >
            {course.animal_type}
          </Badge>
        </div>
        <div className="flex flex-col">
          <p className="text-BR14">{course.content}</p>
        </div>
        <Image
          src="/Test-courseImg.png"
          alt="기본 이미지"
          width={100}
          height={100}
          className="w-full rounded-md"
        />
      </div>
    </Link>
  );
}
