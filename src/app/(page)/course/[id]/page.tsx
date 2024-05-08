export default function CourseDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col">
      <div className="border rounded-lg h-[500px] w-3/5">영상 자리</div>
    </div>
  );
}
