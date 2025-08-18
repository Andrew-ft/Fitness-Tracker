import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectMuscleGroupProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

export function SelectMuscleGroup({ value, onChange, disabled }: SelectMuscleGroupProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Muscle Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Muscle Group</SelectLabel>
          <SelectItem value="Chest">Chest</SelectItem>
          <SelectItem value="Back">Back</SelectItem>
          <SelectItem value="Shoulders">Shoulders</SelectItem>
          <SelectItem value="Arms">Arms</SelectItem>
          <SelectItem value="Legs">Legs</SelectItem>
          <SelectItem value="Core">Core</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
