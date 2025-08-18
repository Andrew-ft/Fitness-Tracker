import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectRoutineTypeProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export function SelectRoutineType({ value, onChange, disabled }: SelectRoutineTypeProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Routine Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Routine Type</SelectLabel>
          <SelectItem value="strength">Strength</SelectItem>
          <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
          <SelectItem value="cardio">Cardio</SelectItem>
          <SelectItem value="HIIT">HIIT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
