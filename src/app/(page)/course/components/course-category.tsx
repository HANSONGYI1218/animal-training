import { Input } from "@/components/ui/input";

export default function CourseCategory() {
  const categoryData: [string, string][] = [
    ["건강", "/course-category/health.png"],
    ["미용", "/course-category/beauty.png"],
    ["식품", "/course-category/food.png"],
    ["산책", "/course-category/walk.png"],
    ["놀이", "/course-category/play.png"],
    ["입양", "/course-category/adopt.png"],
    ["훈련", "/course-category/traning.png"],
    ["의사소통", "/course-category/communication.png"],
    //["기타", "/course-category/etc.png"]
  ];
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex justify-between flex-col gap-4 md:gap-0 md:flex-row">
        <h1 className="text-HB24">분야별 강의</h1>
        <Input
          placeholder="찾으려는 단어나 분야를 검색해 보세요!"
          className="rounded-full text-BR14 w-4/5 md:w-2/5 text-[#008000] border-[#008000] border-2 placeholder:text-[#008000] placeholder:opacity-40"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 lg:flex justify-between">
        {categoryData.map((data: [string, string], index: number) => (
          <div key={index} className="flex flex-col gap-4 items-center">
            <img
              src={data[1]}
              alt="course-category"
              className="shadow-md rounded-lg border-t border-neutral-5 p-2 sm:p-4 hover:shadow-lg hover:cursor-pointer sm:w-24 sm:h-24 xl:w-28 xl:h-28"
            />
            <p className="text-BB14">{data[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
