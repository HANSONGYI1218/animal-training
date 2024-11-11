import { Button } from "../../../ui/button";

export default function AdoptionNav({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (v: string) => void;
}) {
  return (
    <div className="flex w-full gap-2 border-b">
      <Button
        onClick={() => {
          setTab("invitation");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "invitation" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        관리
      </Button>
      <Button
        onClick={() => {
          setTab("consent-form");
        }}
        variant={"default"}
        className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "consent-form" && "border-green-100 text-green-100 hover:border-green-100"}`}
      >
        기록
      </Button>
    </div>
  );
}
