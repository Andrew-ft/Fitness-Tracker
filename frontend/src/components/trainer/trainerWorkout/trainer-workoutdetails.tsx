import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { SelectSubMuscle } from "@/components/selectSubMuscle";
import API from "@/lib/axios";
import type { Difficulty, MuscleGroup, SubMuscle } from "@/lib/enums";
import { motion } from "framer-motion";

interface Workout {
  workoutId: number;
  workoutName: string;
  difficulty: Difficulty;
  muscleGroup: MuscleGroup;
  subMuscle: SubMuscle;
  equipment?: string;
  description?: string;
}

export default function TrainerWorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [formData, setFormData] = useState<Workout | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchWorkout = async () => {
    try {
      const res = await API.get(`/workout/${id}`);
      setWorkout(res.data.workout);
      setFormData(res.data.workout);
    } catch (err) {
      console.error("Error fetching workout:", err);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const handleEdit = () => {
    setFormData(workout);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await API.put(`/workout/${id}`, formData);
      setWorkout(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  const handleCancel = () => {
    setFormData(workout);
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

  if (!formData) return <p className="text-center mt-10">Loading workout...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
                <h1 className="text-xl font-bold">{workout?.workoutName}</h1>
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm">
                {renderDifficultyBadge(workout!.difficulty)}
                <Target className="w-4 h-4" />
                <span>{workout?.muscleGroup}</span>
                <span>• {workout?.subMuscle}</span> {/* added sub muscle */}
              </div>
              <p className="mt-2 text-sm font-semibold">
                Equipment required: {workout?.equipment}
              </p>
            </div>

            <div className="mt-5 md:w-9/10 w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{workout?.description}</CardDescription>
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
                  onChange={(val: Difficulty) =>
                    setFormData({ ...formData, difficulty: val })
                  }
                />
              </div>

              <div className="grid gap-3 mb-3">
                <p>Muscle Group</p>
                <SelectMuscleGroup
                  value={formData.muscleGroup}
                  onChange={(val: MuscleGroup) =>
                    setFormData({ ...formData, muscleGroup: val })
                  }
                />
              </div>

              <div className="grid gap-3 mb-3">
                <p>Sub Muscle</p>
                <SelectSubMuscle
                  value={formData.subMuscle}
                  onChange={(val: SubMuscle) =>
                    setFormData({ ...formData, subMuscle: val })
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
    </motion.div>
  );
}
