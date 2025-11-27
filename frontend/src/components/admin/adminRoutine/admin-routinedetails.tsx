import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import RoutineCreation from "@/components/RoutineCreation";
import { SelectDifficulty } from "@/components/selectDifficulty";
import { SelectRoutineType } from "@/components/selectRoutineType";
import API from "@/lib/axios";
import type { Difficulty } from "@/lib/enums";

import { motion } from "framer-motion";

interface Workout {
  id: string;
  label: string;
  sets: number;
  reps: number;
  value: string;
}

interface Routine {
  id: number;
  routineName: string;
  difficulty: Difficulty;
  duration: number;
  calories: number;
  type: string;
  description: string;
  workouts: Workout[];
}

export default function AdminRoutineDetails() {
  const { id } = useParams<{ id: string }>();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [formData, setFormData] = useState<Routine | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await API.get(`/routine/${id}`);
        const r = res.data.routine || res.data;

        if (!r) {
          setError("Routine not found");
          return;
        }

        const mappedRoutine: Routine = {
          id: r.routineId,
          routineName: r.routineName || "",
          difficulty: r.difficulty || "Beginner",
          duration: r.duration || 0,
          calories: r.calories || 0,
          type: r.type || "",
          description: r.description || "",
          workouts: (r.routineWorkouts || []).map((w: any) => ({
            id: w.workoutId?.toString() || "",
            label: w.workout?.workoutName || `Workout ${w.workoutId}`,
            sets: w.sets || 0,
            reps: w.reps || 0,
            value: w.workoutId?.toString() || "",
          })),
        };

        setRoutine(mappedRoutine);
        setFormData(mappedRoutine);
        setError("");
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        setError("Failed to load routine");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  const handleEdit = () => {
    if (routine) setFormData(routine);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (routine) setFormData(routine);
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const payload = {
      routineName: formData.routineName,
      difficulty: formData.difficulty,
      duration: formData.duration,
      calories: formData.calories,
      type: formData.type,
      description: formData.description,
      routineWorkouts: formData.workouts.map((w) => ({
        workoutId: Number(w.id),
        sets: w.sets,
        reps: w.reps,
      })),
    };

    try {
      setLoading(true);
      await API.put(`/routine/${id}`, payload);
      const updatedRoutine = {
        ...formData,
        workouts: formData.workouts.map((w) => ({
          ...w,
          label: w.label || w.value || `Workout ${w.id}`,
        })),
      };
      setRoutine(updatedRoutine);
      setIsEditing(false);
      setError("");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError("Failed to save routine");
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkoutCompletion = (workoutId: string) => {
    setCompletedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const handleFinish = async () => {
    if (!routine) return;
    try {
      await API.post(`/routine/${routine.id}/complete`, { completedWorkouts });
      setIsStarted(false);
      setCompletedWorkouts([]);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError("Failed to complete routine");
    }
  };

  if (loading && !routine) return <p>Loading routine...</p>;
  if (error && !routine) return <p className="text-red-500">{error}</p>;
  if (!routine || !formData) return <p>No routine found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-5 mb-5">
        <Link to="/admin/routines">
          <Button variant="outline">
            <ArrowLeft /> Back
          </Button>
        </Link>
        {!isEditing && <Button onClick={handleEdit}>Edit Routine</Button>}
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Routine Name</p>
            <Input
              type="text"
              value={formData.routineName || ""}
              onChange={(e) =>
                setFormData({ ...formData, routineName: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Difficulty</p>
            <SelectDifficulty
              value={formData.difficulty || ""}
              onChange={(val: Difficulty) =>
                setFormData({ ...formData, difficulty: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Duration (mins)</p>
            <Input
              type="number"
              value={formData.duration || 0}
              onChange={(e) =>
                setFormData({ ...formData, duration: Number(e.target.value) })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:w-4/5 w-full">
            <p>Calories</p>
            <Input
              type="number"
              value={formData.calories || 0}
              onChange={(e) =>
                setFormData({ ...formData, calories: Number(e.target.value) })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:w-5/5 w-full">
            <p>Routine Type</p>
            <SelectRoutineType
              value={formData.type || ""}
              onChange={(val: string) =>
                setFormData({ ...formData, type: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Description</p>
            <Textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            {!isEditing ? (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Workouts ({routine.workouts.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {routine.workouts.map((w) => (
                    <div
                      key={w.id}
                      className="flex justify-between items-center p-2"
                    >
                      <div className="flex items-center gap-2">
                        {isStarted && (
                          <Checkbox
                            checked={completedWorkouts.includes(w.id)}
                            onCheckedChange={() =>
                              toggleWorkoutCompletion(w.id)
                            }
                          />
                        )}
                        <span>{w.label}</span>
                      </div>
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

          {isEditing && (
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  );
}
