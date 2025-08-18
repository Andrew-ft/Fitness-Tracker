import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectWorkout() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Workout" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Workout</SelectLabel>
          <SelectItem value="benchpress">Bench Press</SelectItem>
          <SelectItem value="squat">Squat</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
