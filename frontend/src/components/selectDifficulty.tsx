import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Difficulties, type Difficulty } from "@/lib/constants";

interface SelectDifficultyProps {
  value?: Difficulty;
  onChange?: (val: Difficulty) => void;
  disabled?: boolean;
}

export function SelectDifficulty({ value, onChange, disabled }: SelectDifficultyProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: string) => onChange?.(val as Difficulty)}
      disabled={disabled}
    >
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Difficulty</SelectLabel>
          {Difficulties.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0) + option.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
