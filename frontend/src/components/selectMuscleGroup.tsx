import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MuscleGroup } from "@/lib/enums";

interface SelectMuscleGroupProps {
  value?: MuscleGroup | MuscleGroup[];
  onChange?: (val: MuscleGroup | MuscleGroup[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export function SelectMuscleGroup({
  value,
  onChange,
  disabled,
  multiple = false,
}: SelectMuscleGroupProps) {
  const options = Object.values(MuscleGroup).filter(
    (mg) => mg !== MuscleGroup.ALL
  );

  const handleChange = (val: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? [...value] : [];
      if (current.includes(val as MuscleGroup)) {
        onChange?.(current.filter((v) => v !== val));
      } else {
        onChange?.([...current, val as MuscleGroup]);
      }
    } else {
      onChange?.(val as MuscleGroup);
    }
  };

  return (
    <Select
      value={multiple ? undefined : (value as string)}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue
          placeholder={multiple ? "Select Muscle Groups" : "Select Muscle Group"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Muscle Group</SelectLabel>
          {options.map((mg) => (
            <SelectItem key={mg} value={mg}>
              {mg.charAt(0) + mg.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
