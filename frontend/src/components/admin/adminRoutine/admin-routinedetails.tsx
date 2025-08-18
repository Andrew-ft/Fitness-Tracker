import { useState } from "react";
import RoutineCreation from "@/components/RoutineCreation";
import { SelectDifficulty } from "@/components/selectDifficulty";
import { SelectMuscleGroup } from "@/components/selectMuscleGroup";
import { SelectRoutineType } from "@/components/selectRoutineType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Mocked initial data
const initialRoutine = {
  routineName: "Push Pull Legs",
  difficulty: "Intermediate",
  muscleGroup: "Full Body",
  duration: 60,
  calories: 350,
  type: "Strength",
  description: "A balanced push-pull-legs workout.",
  workouts: [
    { id: "1", value: "bench_press", label: "Bench Press", sets: 3, reps: 10 },
    { id: "2", value: "squat", label: "Squat", sets: 4, reps: 8 },
    { id: "3", value: "deadlift", label: "Deadlift", sets: 3, reps: 6 },
    { id: "4", value: "pull_up", label: "Pull Ups", sets: 3, reps: 12 },
    { id: "5", value: "shoulder_press", label: "Shoulder Press", sets: 3, reps: 10 },
    { id: "6", value: "bicep_curl", label: "Bicep Curls", sets: 3, reps: 15 },
  ],
};

export default function AdminRoutineDetails() {
  const [routine, setRoutine] = useState(initialRoutine);
  const [formData, setFormData] = useState(initialRoutine);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setFormData(routine);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRoutine(formData); // commit changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(routine); // reset to last saved data
    setIsEditing(false);
  };

  return (
    <div>
      {/* Top Buttons */}
      <div className="flex items-center gap-5 mb-5">
        <Link to="/admin/routines">
          <Button variant="outline">
            <ArrowLeft /> Back
          </Button>
        </Link>
        {!isEditing && (
          <Button onClick={handleEdit}>Edit Routine</Button>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Routine Name */}
          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Routine Name</p>
            <Input
              type="text"
              value={formData.routineName}
              onChange={(e) =>
                setFormData({ ...formData, routineName: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Difficulty */}
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

          {/* Muscle Group */}
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

          {/* Duration */}
          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>
              Duration <span className="text-sm">(mins)</span>
            </p>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: Number(e.target.value) })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Calories */}
          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Calories</p>
            <Input
              type="number"
              value={formData.calories}
              onChange={(e) =>
                setFormData({ ...formData, calories: Number(e.target.value) })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Routine Type */}
          <div className="grid gap-3 mb-3 md:w-5/5 w-full">
            <p>Routine Type</p>
            <SelectRoutineType
              value={formData.type}
              onChange={(val: string) =>
                setFormData({ ...formData, type: val })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Description */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full ">
            <p>Description</p>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Workouts Section */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            {!isEditing ? (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Your Workouts ({routine.workouts.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {routine.workouts.map((w) => (
                    <div
                      key={w.id}
                      className="flex justify-between p-2 "
                    >
                      <span>{w.label}</span>
                      <span>
                        {w.sets} sets × {w.reps} reps
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <RoutineCreation
                workouts={formData.workouts}
                onWorkoutsChange={(ws) =>
                  setFormData({ ...formData, workouts: ws })
                }
              />
            )}
          </div>

          {/* Save / Cancel */}
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
