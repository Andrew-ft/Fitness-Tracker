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
  onValueChange?: (val: string) => void;
}

export function SelectGender({ disabled }: SelectProps) {
  return (
    <Select disabled={disabled}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
