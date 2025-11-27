import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectEquipment } from "../../selectEquipment";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";

export default function AdminWorkoutDetails() {
  // Initial workout data (would normally come from API)
  const initialWorkout = {
    workoutName: "Bench Press",
    difficulty: "Intermediate",
    muscleGroup: "Chest",
    equipment: "Barbell",
    description: "Write a description about the new workout exercise.",
  };

  const [workout, setWorkout] = useState(initialWorkout);
  const [formData, setFormData] = useState(initialWorkout);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setFormData(workout); // copy latest saved data
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkout(formData); // commit changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(workout); // reset to saved values
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/admin/workouts">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <div>
          {!isEditing && <Button onClick={handleEdit}>Edit Workout</Button>}
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Workout Name</p>
            <Input
              id="workoutName"
              type="text"
              className="md:w-4/5 w-full text-sm"
              value={formData.workoutName}
              onChange={(e) =>
                setFormData({ ...formData, workoutName: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Difficulty</p>
            <SelectDifficulty
              value={formData.difficulty}
              onChange={(val: string) =>
                setFormData({ ...formData, difficulty: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Muscle Group</p>
            <SelectMuscleGroup
              value={formData.muscleGroup}
              onChange={(val: string) =>
                setFormData({ ...formData, muscleGroup: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Equipment</p>
            <SelectEquipment
              value={formData.equipment}
              onChange={(val: string) =>
                setFormData({ ...formData, equipment: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Description</p>
            <Textarea
              id="bio"
              className="w-full text-sm"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value }) 
              }
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex gap-4">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
