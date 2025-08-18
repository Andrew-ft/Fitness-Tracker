import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDifficultyProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

export function SelectDifficulty({ value, onChange, disabled }: SelectDifficultyProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Difficulty</SelectLabel>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
  
