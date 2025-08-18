import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";
import { SelectRoutineType } from "../../selectRoutineType";
import RoutineCreation from "../../RoutineCreation";

interface Workout {
  id: string;
  value: string;
  label: string;
  sets: number;
  reps: number;
}

export default function AdminAddRoutine() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center gap-5 mb-5">
        <Link to="/admin/routines">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-xl">Add New Routine</h1>
          <p className="text-sm opacity-50">Create a new routine plan</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Routine created with workouts:", workouts);
          // here you can send workouts to backend
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Routine Name */}
          <div className="grid gap-3 mb-3">
            <p>Routine Name</p>
            <Input
              id="routinetName"
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="Push Pull Leg"
            />
          </div>

          {/* Difficulty */}
          <div className="grid gap-3 mb-3">
            <p>Difficulty</p>
            <SelectDifficulty />
          </div>

          {/* Muscle Group */}
          <div className="grid gap-3 mb-3">
            <p>Muscle Group</p>
            <SelectMuscleGroup />
          </div>

          {/* Duration */}
          <div className="grid gap-3 mb-3">
            <p>
              Duration <span className="text-sm">(mins)</span>
            </p>
            <Input
              id="duration"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="60"
            />
          </div>

          {/* Calories */}
          <div className="grid gap-3 mb-3">
            <p>Calories</p>
            <Input
              id="calories"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="350"
            />
          </div>

          {/* Routine Type */}
          <div className="grid gap-3 mb-3">
            <p>Choose routine type</p>
            <SelectRoutineType
              value={""}
              onChange={(val) => {
                console.log("Selected type:", val);
              }}
            />
          </div>

          {/* Description */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Description</p>
            <Textarea
              id="bio"
              className="w-full text-sm"
              placeholder="Write a description about the new workout exercise."
            />
          </div>

          {/* Routine Creation */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <RoutineCreation workouts={workouts} onWorkoutsChange={setWorkouts} />
          </div>

          {/* Submit */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <Button className="w-full">Create New Workout</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
