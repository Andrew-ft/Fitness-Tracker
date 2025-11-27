import { useState } from "react";
import RoutineCreation from "@/components/RoutineCreation";
import { SelectDifficulty } from "@/components/selectDifficulty";
import { SelectMuscleGroup } from "@/components/selectMuscleGroup";
import { SelectRoutineType } from "@/components/selectRoutineType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BicepsFlexed,
  Clock,
  Dumbbell,
  Flame,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutDetailsCard } from "@/components/WorkoutDetailsCard";

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
    {
      id: "5",
      value: "shoulder_press",
      label: "Shoulder Press",
      sets: 3,
      reps: 10,
    },
    { id: "6", value: "bicep_curl", label: "Bicep Curls", sets: 3, reps: 15 },
  ],
};

export default function TrainerRoutineDetails() {
  const [routine, setRoutine] = useState(initialRoutine);
  const [formData, setFormData] = useState(initialRoutine);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setFormData(routine);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRoutine(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(routine);
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
        return <Badge variant="default">{level}</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div>
      {/* Top Buttons */}
      <div className="flex items-center gap-5 mb-5">
        <Link to="/trainer/routines">
          <Button variant="outline">
            <ArrowLeft /> Back
          </Button>
        </Link>
        {!isEditing && <Button onClick={handleEdit}>Edit Routine</Button>}
      </div>

      {/* VIEW MODE */}
      {!isEditing && (
        <div className="workout-details mx-auto md:w-4/5 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="text-primary" />
              <h1 className="text-xl font-bold">{routine.routineName}</h1>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              {renderDifficultyBadge(routine.difficulty)}
              <Target className="w-4 h-4" />
              {routine.muscleGroup}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <p>{routine.duration} min</p>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-primary" />
              <p>{routine.calories} cal</p>
            </div>
            <div className="flex items-center gap-1">
              <BicepsFlexed className="w-4 h-4 text-primary" />
              <p>{routine.type}</p>
            </div>
          </div>

          <div className="mt-5 md:w-9/10 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Routine Description</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{routine.description}</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 md:w-9/10 w-full">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-primary" />
                  Workouts ({routine.workouts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routine.workouts.map((w, index) => (
                  <WorkoutDetailsCard
                    key={w.id ?? index}
                    name={w.label}
                    sets={w.sets}
                    reps={w.reps}
                    index={index}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5"
        >
          {/* Routine Name */}
          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Routine Name</p>
            <Input
              type="text"
              value={formData.routineName}
              onChange={(e) =>
                setFormData({ ...formData, routineName: e.target.value })
              }
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
            />
          </div>

          {/* Workouts Section */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <RoutineCreation
              workouts={formData.workouts}
              onWorkoutsChange={(ws) =>
                setFormData({ ...formData, workouts: ws })
              }
            />
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-4">
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
