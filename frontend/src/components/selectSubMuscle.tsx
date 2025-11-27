import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubMuscles, type SubMuscle } from "@/lib/constants";

interface SelectSubMuscleProps {
  value?: SubMuscle;
  onChange?: (val: SubMuscle) => void;
  disabled?: boolean;
}

export function SelectSubMuscle({ value, onChange, disabled }: SelectSubMuscleProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: string) => onChange?.(val as SubMuscle)}
      disabled={disabled}
    >
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Sub Muscle" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sub Muscle</SelectLabel>
          {SubMuscles.map((option) => (
            <SelectItem key={option} value={option}>
              {option
                .split("_")
                .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                .join(" ")}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
