import { Button } from "../../../ui/button";

export default function CurriculumNav({
  tab,
  setTab,
}: {
  tab: string | null;
  setTab: (v: string) => void;
}) {
  return (
    <div className="flex w-full gap-2 border-b">
      <Button
        onClick={() => {
          setTab("tutor");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "tutor" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        강사
      </Button>
      <Button
        onClick={() => {
          setTab("lecture");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "lecture" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        강의
      </Button>
      <Button
        onClick={() => {
          setTab("training-center");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "training-center" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        훈련소
      </Button>
      <Button
        onClick={() => {
          setTab("certificate");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "certificate" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        자격증
      </Button>
    </div>
  );
}
