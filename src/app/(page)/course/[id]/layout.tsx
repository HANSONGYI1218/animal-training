import data from "@/utils/dummydata";
import Chanpter from "../components/chapter";
import MyCourseBanner from "../components/mycourse-banner";

type Props = Readonly<{
  children: React.ReactNode;
}> & {
  params: { id: number };
};

export default function CourseDetailLayout({ children, params }: Props) {
  const { id } = params;

  return (
    <div className="flex flex-col">
      <MyCourseBanner
        progress={data.myCoursDummy.map((item) => item.progress)}
      />
      <div className="flex px-6 sm:px-20 screen:container py-24 gap-8">
        <section className="border rounded-lg h-[500px] flex-1">
          {children}
        </section>
        <aside className=" rounded-lg w-[350px] h-fit shadow-md py-3 px-5">
          <Chanpter courses={data.myCoursDummy} courseId={id} />
        </aside>
      </div>
    </div>
  );
}
