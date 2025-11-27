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
  onChange?: (val: string) => void; // 👈 renamed to onChange
}

export function SelectClientTypes({ disabled, value, onChange }: SelectProps) {
  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select clients types served" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Client Types Served</SelectLabel>
          <SelectItem value="General Population">General Population</SelectItem>
          <SelectItem value="Athletes & Sports Teams">
            Athletes & Sports Teams
          </SelectItem>
          <SelectItem value="Corporate Wellness Programs">
            Corporate Wellness Programs
          </SelectItem>
          <SelectItem value="Rehabilitation & Special Needs Clients">
            Rehabilitation & Special Needs Clients
          </SelectItem>
          <SelectItem value="Senior Fitness & Active Aging">
            Senior Fitness & Active Aging
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
