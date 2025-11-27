import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft, Dumbbell, Target } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectEquipment } from "../../selectEquipment";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TrainerWorkoutDetails() {
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

  const renderDifficultyBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return (
          <Badge className="bg-green-600 text-white hover:bg-green-700">
            {level}
          </Badge>
        );
      case "intermediate":
        return <Badge variant="secondary">{level}</Badge>;
      case "advanced":
        return <Badge variant="default">{level}</Badge>; // dark primary
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center gap-5 mb-5">
        <Link to="/trainer/workout">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>

        {!isEditing && <Button onClick={handleEdit}>Edit Workout</Button>}
      </div>

      {/* VIEW MODE */}
      {!isEditing && (
        <div className="workout-details mx-auto md:w-4/5 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="text-primary" />
              <h1 className="text-xl font-bold">{workout.workoutName}</h1>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              {renderDifficultyBadge(workout.difficulty)}
              <Target className="w-4 h-4" />
              {workout.muscleGroup}
            </div>
            <p className="mt-2 text-sm font-semibold">
              Equipment required: {workout.equipment}
            </p>
          </div>

          <div className="mt-5 md:w-9/10 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Workout Description</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{workout.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <form onSubmit={handleSave} className="workout-details-edit">
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
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Difficulty</p>
              <SelectDifficulty
                value={formData.difficulty}
                onChange={(val: string) =>
                  setFormData({ ...formData, difficulty: val })
                }
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Muscle Group</p>
              <SelectMuscleGroup
                value={formData.muscleGroup}
                onChange={(val: string) =>
                  setFormData({ ...formData, muscleGroup: val })
                }
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Equipment</p>
              <SelectEquipment
                value={formData.equipment}
                onChange={(val: string) =>
                  setFormData({ ...formData, equipment: val })
                }
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
              />
            </div>
          </div>

          <div className="flex gap-4 w-4/5 mx-auto">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
