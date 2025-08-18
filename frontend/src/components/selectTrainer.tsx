import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectTrainer() {
  return (
    <Select>
      <SelectTrigger className="md:w-4/5 w-full">
        <SelectValue placeholder="Select Trainer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Trainer</SelectLabel>
          <SelectItem value="John">John</SelectItem>
          <SelectItem value="Sarah">Sarah</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
