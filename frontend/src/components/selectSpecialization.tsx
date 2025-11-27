import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  disabled?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

export function SelectSpecialization({ disabled, value, onChange }: SelectProps) {
  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Specialization" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Specialization</SelectLabel>
          <SelectItem value="Strength & Conditioning Specializations">
            Strength & Conditioning Specializations
          </SelectItem>
          <SelectItem value="Body Transformation & Physique">
            Body Transformation & Physique
          </SelectItem>
          <SelectItem value="Mind-Body Fitness">Mind-Body Fitness</SelectItem>
          <SelectItem value="Endurance & Cardio Training">
            Endurance & Cardio Training
          </SelectItem>
          <SelectItem value="Sport-Specific Fitness">Sport-Specific Fitness</SelectItem>
          <SelectItem value="Rehabilitation & Health">Rehabilitation & Health</SelectItem>
          <SelectItem value="Data-Driven Fitness">Data-Driven Fitness</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
