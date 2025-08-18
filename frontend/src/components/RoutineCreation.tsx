  import { useState } from "react";
  import { WorkoutSelector } from "@/components/WorkoutSelector";
  import { WorkoutItem } from "@/components/WorkoutItem";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Separator } from "@/components/ui/separator";
  import { Calendar, Clock } from "lucide-react";

  interface Workout {
    id: string;
    value: string;
    label: string;
    sets: number;
    reps: number;
  }

  interface RoutineCreationProps {
    workouts: Workout[];
    onWorkoutsChange: (ws: Workout[]) => void;
    editable?: boolean;
  }

  export default function RoutineCreation({
    workouts,
    onWorkoutsChange,
    editable = true,
  }: RoutineCreationProps) {
    const [errorMessage, setErrorMessage] = useState("");

const addWorkout = (workoutData: { value: string; label: string }) => {
  const newValue = workoutData.value.trim().toLowerCase();

  // Merge current workouts with original ones for duplicate check
  const allCurrentWorkouts = workouts.map(w => w.value.trim().toLowerCase());

  if (allCurrentWorkouts.includes(newValue)) {
    setErrorMessage("This workout already exists in the routine!");
    return;
  }

  const newWorkout: Workout = {
    id: Date.now().toString(),
    value: workoutData.value,
    label: workoutData.label,
    sets: 3,
    reps: 10,
  };

  setErrorMessage(""); // clear previous error
  onWorkoutsChange([...workouts, newWorkout]);
};



    const removeWorkout = (id: string) => {
      onWorkoutsChange(workouts.filter((workout) => workout.id !== id));
    };

    const updateWorkout = (id: string, sets: number, reps: number) => {
      onWorkoutsChange(
        workouts.map((workout) =>
          workout.id === id ? { ...workout, sets, reps } : workout
        )
      );
    };

    return (
      <div className="bg-background">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Workout Selection Card (only if editable) */}
          {editable && (
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                  Add Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {errorMessage && (
                  <div className="text-primary mb-2 text-sm">
                    {errorMessage}
                  </div>
                )}
                <WorkoutSelector onWorkoutAdd={addWorkout} />
              </CardContent>
            </Card>
          )}

          {/* Added Workouts */}
          {workouts.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  Your Workouts ({workouts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workouts.map((workout, index) => (
                  <div key={workout.id}>
                    <WorkoutItem
                      workout={workout}
                      onRemove={editable ? removeWorkout : undefined}
                      onUpdate={editable ? updateWorkout : undefined}
                    />
                    {index < workouts.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
