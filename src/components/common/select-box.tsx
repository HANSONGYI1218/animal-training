import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectBoxProps = {
  lists: string[];
  placeholder: string;
  className: string;
  useStateF: (state: string) => void;
};

export default function SelectBox({
  lists,
  placeholder,
  className,
  useStateF,
}: SelectBoxProps) {
  return (
    <Select onValueChange={(v) => useStateF(v)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {lists.map((item: any) => {
            return <SelectItem value={item}>{item}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
