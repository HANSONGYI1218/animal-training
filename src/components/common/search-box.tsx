import { Search } from "lucide-react";
import { Input } from "../ui/input";

type SearchBoxProps = {
  placeholder: string;
  className: string;
  useStateF: (state: string) => void;
};

export default function SearchBox({
  placeholder,
  className,
  useStateF,
}: SearchBoxProps) {
  return (
    <div
      className={`group flex h-full items-center gap-4 rounded-lg border px-3 py-2 hover:bg-slate-100 ${className}`}
    >
      <Input
        onChange={(v) => useStateF(v.target.value)}
        placeholder={placeholder}
        className="h-full border-none p-0 group-hover:bg-slate-100"
      />
      <Search width={20} height={20} cursor={"pointer"} />
    </div>
  );
}
