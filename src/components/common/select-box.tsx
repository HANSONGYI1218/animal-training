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
    <Select onValueChange={(v) => useStateF(v)} defaultValue={placeholder}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {lists.map((item: any, index: number) => {
          return (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
