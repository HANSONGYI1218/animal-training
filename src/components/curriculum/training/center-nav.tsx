import { Button } from "@/components/ui/button";

export default function CenterNav({
  tab,
  setTab,
  onClickF,
}: {
  tab: string;
  setTab: (v: string) => void;
  onClickF: (v: string) => void;
}) {
  return (
    <div className="flex w-full gap-2 border-b">
      <Button
        onClick={() => {
          setTab("info");
          onClickF("info");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "info" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        정보
      </Button>
      <Button
        onClick={() => {
          setTab("curriculum");
          onClickF("curriculum");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "curriculum" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        커리큘럼
      </Button>
      <Button
        onClick={() => {
          setTab("price");
          onClickF("price");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "price" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        가격
      </Button>

      <Button
        onClick={() => {
          setTab("review");
          onClickF("review");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "review" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        후기
      </Button>
    </div>
  );
}
