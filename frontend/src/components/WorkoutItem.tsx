import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { X, Dumbbell } from "lucide-react";

interface Workout {
  id: string;
  value: string;
  label: string;
  sets: number;
  reps: number;
}

interface WorkoutItemProps {
  workout: Workout;
  onRemove?: (id: string) => void;
  onUpdate?: (id: string, sets: number, reps: number) => void;
}

export function WorkoutItem({ workout, onRemove, onUpdate }: WorkoutItemProps) {
  const [sets, setSets] = useState(workout.sets);
  const [reps, setReps] = useState(workout.reps);

  const handleSetsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setSets(numValue);
    onUpdate?.(workout.id, numValue, reps);
  };

  const handleRepsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setReps(numValue);
    onUpdate?.(workout.id, sets, numValue);
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-card to-accent/5 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{workout.label}</h3>
        </div>

        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(workout.id)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`sets-${workout.id}`} className="text-sm font-medium text-muted-foreground">
            Sets
          </Label>
          <Input
            id={`sets-${workout.id}`}
            type="number"
            value={sets}
            onChange={(e) => handleSetsChange(e.target.value)}
            min="1"
            className="h-10 text-center font-medium"
            placeholder="0"
            disabled={!onUpdate}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`reps-${workout.id}`} className="text-sm font-medium text-muted-foreground">
            Reps
          </Label>
          <Input
            id={`reps-${workout.id}`}
            type="number"
            value={reps}
            onChange={(e) => handleRepsChange(e.target.value)}
            min="1"
            className="h-10 text-center font-medium"
            placeholder="0"
            disabled={!onUpdate}
          />
        </div>
      </div>
    </Card>
  );
}
