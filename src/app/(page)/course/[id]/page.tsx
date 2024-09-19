import Chanpter from "../components/chapter";
import MyCourseBanner from "../components/mycourse-banner";
import data from "@/utils/dummydata";

export default function CourseDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;

  const course = data.myCoursDummy.find((item) => item.id === id);

  return <div className="flex flex-col">{course?.sumnailImg ?? ""}</div>;
}
