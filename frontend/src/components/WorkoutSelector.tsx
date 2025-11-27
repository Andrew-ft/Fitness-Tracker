import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import API from "@/lib/axios";

interface WorkoutOption {
  value: string;
  label: string;
}

interface WorkoutSelectorProps {
  onWorkoutAdd: (workout: WorkoutOption) => void;
}

export function WorkoutSelector({ onWorkoutAdd }: WorkoutSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [workouts, setWorkouts] = useState<WorkoutOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const res = await API.get("/workout");
        const formatted = res.data.workouts.map((w: any) => ({
          value: String(w.workoutId),
          label: w.workoutName,
        }));
        setWorkouts(formatted);
      } catch (err) {
        console.error("Failed to load workouts", err);
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, []);

  const handleSelect = (val: string) => {
    const selected = workouts.find((w) => w.value === val);
    if (selected) {
      onWorkoutAdd(selected);
      setQuery("");  
      setOpen(false);
    }
  };

  const filteredWorkouts = workouts.filter((w) =>
    w.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
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
            <span className="text-muted-foreground">
              {loading ? "Loading..." : "Add a workout..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {!loading && (
        <PopoverContent
          className="w-full p-0 bg-popover border-2 shadow-lg max-h-60 overflow-y-auto scrollbar-hide"
        >
          <Command>
            <CommandInput
              placeholder="Search workouts..."
              className="h-9"
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty>No workout found.</CommandEmpty>
            <CommandGroup>
              {filteredWorkouts.map((workout) => (
                <CommandItem
                  key={workout.value}
                  value={workout.value}
                  onSelect={handleSelect}
                  className="cursor-pointer hover:bg-accent"
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  {workout.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
