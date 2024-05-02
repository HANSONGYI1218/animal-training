import CourseCard from "./components/course-card";
import CourseCategory from "./components/course-category";

export default function CoursePage() {
  const count = 10;
  const cards = Array.from({ length: count }, (_, index) => index);
  return (
    <div className="flex flex-col container w-full gap-24">
      <CourseCategory />
      <div className="grid grid-cols-3 gap-4">
        {cards.map((_, index) => (
          <CourseCard key={index} />
        ))}
      </div>
    </div>
  );
}
