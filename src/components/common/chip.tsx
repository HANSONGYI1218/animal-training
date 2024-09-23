import { Button } from '../ui/button';

type ChipProps = {
  name: string;
  useStateF: (state: string) => void;
};

export default function Chip({ name, useStateF }: ChipProps) {
  return <Button>{name}</Button>;
}
