import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectEquipmentProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

export function SelectEquipment({ value, onChange, disabled }: SelectEquipmentProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Equipment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Equipment</SelectLabel>
          <SelectItem value="Dumbbell">Dumbbell</SelectItem>
          <SelectItem value="Barbell">Barbell</SelectItem>
          <SelectItem value="Kettlebell">Kettlebell</SelectItem>
          <SelectItem value="Body Weight">Body Weight</SelectItem>
          <SelectItem value="Resistance Band">Resistance Band</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
