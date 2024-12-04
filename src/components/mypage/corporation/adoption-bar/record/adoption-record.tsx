import ListTable from "../management/list-table";

export default function AdoptionRecord() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-lg font-semibold">입양자 리스트</span>
      <ListTable isRecord />
    </div>
  );
}
