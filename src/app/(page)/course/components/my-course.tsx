import Image from "next/image";
import Link from "next/link";
import ProgressColor from "./progress-color";

export default function MyCourse({ course }: { course: any }) {
  return (
    <Link href={`course/${course.id}`}>
      <div className="flex flex-col shadow-md border-t border-neutral-5 rounded-lg gap-3 p-6 hover:shadow-xl w-[400px] hover:cursor-pointer">
        <h1 className="text-BB18">{course.title}</h1>
        <div className="flex gap-2 items-center">
          <span className="text-BB14">진도율</span>
          <ProgressColor progress={course.progress} className="text-BB18" />
        </div>
        <div className="flex flex-col">
          <p className="text-BR14">{course.content}</p>
        </div>
        <Image
          src={course.sumnailImg}
          alt="기본 이미지"
          width={100}
          height={100}
          className="w-full rounded-md"
        />
      </div>
    </Link>
  );
}
