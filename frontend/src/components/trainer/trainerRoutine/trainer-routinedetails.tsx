import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "@/lib/axios";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutDetailsCard } from "@/components/WorkoutDetailsCard";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function TrainerRoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [checkedWorkouts, setCheckedWorkouts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  if (!id) {
    navigate("/trainer/routines");
    return null;
  }

  const fetchRoutine = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/routine/${id}`);
      const routineData = res.data.routine || res.data;
      setRoutine(routineData);
      setFormData(routineData);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to fetch routine");
      navigate("/trainer/routines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, [id]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData(routine);
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    const payload = {
      routineName: formData.routineName,
      type: formData.type,
      difficulty: formData.difficulty,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
      description: formData.description || "",
      routineWorkouts:
        formData.routineWorkouts
          ?.filter((w: any) => w.workoutId && w.sets && w.reps)
          .map((w: any) => ({
            workoutId: Number(w.workoutId),
            sets: Number(w.sets),
            reps: Number(w.reps),
          })) || [],
    };

    try {
      const res = await API.put(`/routine/${id}`, payload);

      const updatedRoutine = {
        ...res.data.routine,
        routineWorkouts: formData.routineWorkouts?.map((w: any) => ({
          workoutId: Number(w.workoutId),
          sets: w.sets,
          reps: w.reps,
          workout: { workoutName: w.workout?.workoutName || w.value },
        })),
      };

      setRoutine(updatedRoutine);
      setFormData(updatedRoutine);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Error updating routine:", err);
      alert(err.response?.data?.error || "Failed to update routine");
    }
  };

  const handleStartFinish = () => {
    if (isStarted) setCheckedWorkouts([]);
    setIsStarted(!isStarted);
  };

  const handleCheckboxChange = (workoutId: string) => {
    setCheckedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((w) => w !== workoutId)
        : [...prev, workoutId]
    );
  };

  const renderDifficultyBadge = (level: string) => {
    switch (level?.toLowerCase()) {
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
        return <Badge variant="outline">{level || "N/A"}</Badge>;
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!routine) return <p className="text-center mt-10">Routine not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
            {/* Routine Header */}
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="text-primary" />
              <h1 className="text-xl font-bold">{routine.routineName}</h1>
            </div>

            {/* Routine Metadata */}
            <div className="flex items-center gap-2 mt-2 text-sm">
              {renderDifficultyBadge(routine.difficulty)}
            </div>

            <div className="flex items-center gap-5 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                <p>{routine.duration || 0} min</p>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-primary" />
                <p>{routine.calories || 0} cal</p>
              </div>
              <div className="flex items-center gap-1">
                <BicepsFlexed className="w-4 h-4 text-primary" />
                <p>{routine.type || "N/A"}</p>
              </div>
            </div>

            {/* Routine Description */}
            <div className="mt-5 md:w-9/10 w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Routine Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {routine.description || "No description provided."}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Workouts */}
            <div className="mt-5 md:w-9/10 w-full space-y-2">
              {routine.routineWorkouts?.map((w: any, index: number) => {
                const workoutIdStr = String(w.workoutId);
                return (
                  <div key={workoutIdStr} className="flex items-center gap-2">
                    {isStarted && (
                      <Checkbox
                        checked={checkedWorkouts.includes(workoutIdStr)}
                        onCheckedChange={() =>
                          handleCheckboxChange(workoutIdStr)
                        }
                      />
                    )}
                    <WorkoutDetailsCard
                      name={w.workout?.workoutName || w.value || "Workout"}
                      sets={w.sets || 0}
                      reps={w.reps || 0}
                      index={index}
                      className="flex-1"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && formData && (
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5"
          >
            {/* Routine Name */}
            <div className="grid gap-3 mb-3 md:w-4/5 w-full">
              <p>Routine Name</p>
              <Input
                type="text"
                value={formData.routineName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, routineName: e.target.value })
                }
              />
            </div>

            {/* Difficulty */}
            <div className="grid gap-3 mb-3">
              <p>Difficulty</p>
              <SelectDifficulty
                value={formData.difficulty || ""}
                onChange={(val: string) =>
                  setFormData({ ...formData, difficulty: val })
                }
              />
            </div>

            {/* Duration */}
            <div className="grid gap-3 mb-3 md:w-4/5 w-full">
              <p>Duration (mins)</p>
              <Input
                type="number"
                value={formData.duration || 0}
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
                value={formData.calories || 0}
                onChange={(e) =>
                  setFormData({ ...formData, calories: Number(e.target.value) })
                }
              />
            </div>

            {/* Routine Type */}
            <div className="grid gap-3 mb-3 md:col-span-1 w-full">
              <p>Routine Type</p>
              <SelectRoutineType
                value={formData.type || ""}
                onChange={(val: string) =>
                  setFormData({ ...formData, type: val })
                }
              />
            </div>

            {/* Description */}
            <div className="grid gap-3 mb-3 md:col-span-2 w-full">
              <p>Description</p>
              <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Workouts Section */}
            <div className="grid gap-3 mb-3 md:col-span-2 w-full">
              <RoutineCreation
                workouts={formData.routineWorkouts?.map((rw: any) => ({
                  id: String(rw.workoutId),
                  value: rw.workout?.workoutName || "",
                  label: rw.workout?.workoutName || "",
                  sets: rw.sets || 0,
                  reps: rw.reps || 0,
                }))}
                onWorkoutsChange={(ws) =>
                  setFormData({
                    ...formData,
                    routineWorkouts: ws.map((w) => ({
                      workoutId: Number(w.id),
                      workout: { workoutName: w.value },
                      sets: w.sets,
                      reps: w.reps,
                    })),
                  })
                }
              />
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-4 md:col-span-2">
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
