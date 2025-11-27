import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectEquipment } from "../../selectEquipment";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";

export default function TrainerAddWorkout() {
  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/trainer/workout">
            <Button className="" variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Add New Workout</h1>
          <p className="text-sm opacity-50">Create a new workout exercise</p>
        </div>
      </div>

      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Workout Name</p>
            <Input
              id="workoutName"
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="Bench Press"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Difficulty</p>
            <SelectDifficulty />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Muscle Group</p>
            <SelectMuscleGroup />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Equipment</p>
            <SelectEquipment />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Description</p>
            <Textarea
              id="bio"
              className="w-full text-sm"
              placeholder="Write a description about the new workout exercise."
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <Button className="w-full">Create New Workout</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
