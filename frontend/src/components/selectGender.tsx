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
  error?: string; 
}

export function SelectGender({ disabled, value, onValueChange, error }: SelectProps) {
  return (
    <div className="flex flex-col">
      <Select disabled={disabled} value={value} onValueChange={onValueChange}>
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
