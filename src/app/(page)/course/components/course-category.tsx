import Image from "next/image";

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
    ["기타", "/course-category/etc.png"],
  ];
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-HB24">분야별 강의</h1>
      <div className="flex justify-between">
        {categoryData.map((data: [string, string], index: number) => (
          <div key={index} className="flex flex-col gap-4 items-center">
            <Image
              src={data[1]}
              alt="course-category"
              width={100}
              height={100}
              className="shadow-md rounded-lg p-4 hover:shadow-lg"
            />
            <p className="text-BB14">{data[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
