import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const workouts = [
  { value: "bench-press", label: "Bench Press" },
  { value: "squat", label: "Squat" },
  { value: "deadlift", label: "Deadlift" },
  { value: "overhead-press", label: "Overhead Press" },
  { value: "barbell-row", label: "Barbell Row" },
  { value: "pull-ups", label: "Pull-ups" },
  { value: "dips", label: "Dips" },
  { value: "bicep-curls", label: "Bicep Curls" },
  { value: "tricep-extensions", label: "Tricep Extensions" },
  { value: "lateral-raises", label: "Lateral Raises" },
];

interface WorkoutSelectorProps {
  onWorkoutAdd: (workout: { value: string; label: string }) => void;
}

export function WorkoutSelector({ onWorkoutAdd }: WorkoutSelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: string) => {
    const selectedWorkout = workouts.find(workout => workout.value === currentValue);
    if (selectedWorkout) {
      onWorkoutAdd(selectedWorkout);
      setValue("");
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 bg-card border-2 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Plus className="text-muted-foreground" />
              <span className="text-muted-foreground">Add a workout...</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-popover border-2 shadow-lg">
          <Command>
            <CommandInput placeholder="Search workouts..." className="h-9" />
            <CommandEmpty>No workout found.</CommandEmpty>
            <CommandGroup>
              {workouts.map((workout) => (
                <CommandItem
                  key={workout.value}
                  value={workout.value}
                  onSelect={handleSelect}
                  className="cursor-pointer hover:bg-accent"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === workout.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {workout.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}