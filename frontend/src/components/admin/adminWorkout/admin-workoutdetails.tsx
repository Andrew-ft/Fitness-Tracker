import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectEquipment } from "../../selectEquipment";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { SelectSubMuscle } from "../../selectSubMuscle";
import { Textarea } from "../../ui/textarea";
import API from "@/lib/axios";
import type { MuscleGroup, Difficulty, SubMuscle } from "@/lib/constants";
import { motion } from "framer-motion";

interface Workout {
  workoutId: number;
  workoutName: string;
  muscleGroup: MuscleGroup;
  subMuscle: SubMuscle;
  difficulty: Difficulty;
  equipment?: string;
  description?: string;
}

export default function AdminWorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData(workout);
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await API.put(`/workout/${id}`, formData);
      setWorkout(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating workout:", err);
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
        <div className="flex items-center gap-5 mb-5">
          <Link to="/admin/workouts">
            <Button variant="outline">
              <ArrowLeft /> Back
            </Button>
          </Link>
          {!isEditing && <Button onClick={handleEdit}>Edit Workout</Button>}
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            <div className="grid gap-3 mb-3 md:w-4/5">
              <p>Workout Name</p>
              <Input
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
                onChange={(val: Difficulty) =>
                  setFormData({ ...formData, difficulty: val })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Muscle Group</p>
              <SelectMuscleGroup
                value={formData.muscleGroup}
                onChange={(val: MuscleGroup) =>
                  setFormData({ ...formData, muscleGroup: val })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Sub Muscle</p>
              <SelectSubMuscle
                value={formData.subMuscle}
                onChange={(val: SubMuscle) =>
                  setFormData({ ...formData, subMuscle: val })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Equipment</p>
              <SelectEquipment
                value={formData.equipment || ""}
                onChange={(val) => setFormData({ ...formData, equipment: val })}
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
              <p>Description</p>
              <Textarea
                value={formData.description || ""}
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
    </motion.div>
  );
}
