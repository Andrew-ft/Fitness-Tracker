import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";
import { SelectRoutineType } from "../../selectRoutineType";
import RoutineCreation from "../../RoutineCreation";
import API from "@/lib/axios";
import type { Difficulty } from "@/lib/constants";
import { motion } from "framer-motion";

interface Workout {
  id: string;
  value: string;
  label: string;
  sets: number;
  reps: number;
}

export default function MemberAddRoutine() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [formData, setFormData] = useState({
    routineName: "",
    difficulty: "BEGINNER" as Difficulty,
    duration: "",
    calories: "",
    routineType: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.routineName.trim())
      newErrors.routineName = "Routine Name is required";
    if (!formData.difficulty.trim())
      newErrors.difficulty = "Difficulty is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.calories.trim()) newErrors.calories = "Calories is required";
    if (!formData.routineType.trim())
      newErrors.routineType = "Routine Type is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (workouts.length === 0)
      newErrors.workouts = "Please add at least one workout";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const payload = {
      routineName: formData.routineName,
      difficulty: formData.difficulty,
      type: formData.routineType,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
      description: formData.description,
      routineWorkouts: workouts.map((w) => ({
        workoutId: Number(w.id),
        sets: w.sets,
        reps: w.reps,
      })),
    };

    try {
      setLoading(true);
      console.log("Submitting payload:", payload);
      const res = await API.post("/routine", payload);
      console.log("Routine created successfully:", res.data);
      navigate("/member/routines");
    } catch (err: any) {
      console.error("Caught error:", err);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to create routine. Check console for details.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Top Bar */}
        <div className="flex items-center gap-5 mb-5">
          <Link to="/member/routines">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>

          <div>
            <h1 className="font-semibold text-xl">Add New Routine</h1>
            <p className="text-sm opacity-50">Create a new workout routine</p>
          </div>
        </div>

        {/* General Errors */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.general && <p>{errors.general}</p>}
            {errors.workouts && <p>{errors.workouts}</p>}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            {/* Routine Name */}
            <div className="grid gap-3 mb-3 md:w-4/5">
              <label className="text-sm font-medium">Routine Name</label>
              <Input
                placeholder="Push Pull Leg"
                value={formData.routineName}
                onChange={(e) => handleChange("routineName", e.target.value)}
              />
              {errors.routineName && (
                <p className="text-red-500 text-sm">{errors.routineName}</p>
              )}
            </div>

            {/* Difficulty */}
            <div className="grid gap-3 mb-3">
              <label className="text-sm font-medium">Difficulty</label>
              <SelectDifficulty
                value={formData.difficulty}
                onChange={(val) => handleChange("difficulty", val)}
              />
              {errors.difficulty && (
                <p className="text-red-500 text-sm">{errors.difficulty}</p>
              )}
            </div>

            {/* Duration */}
            <div className="grid gap-3 mb-3 md:w-4/5">
              <label className="text-sm font-medium">Duration (mins)</label>
              <Input
                type="number"
                placeholder="60"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>

            {/* Calories */}
            <div className="grid gap-3 mb-3 md:w-4/5">
              <label className="text-sm font-medium">Calories</label>
              <Input
                type="number"
                placeholder="350"
                value={formData.calories}
                onChange={(e) => handleChange("calories", e.target.value)}
              />
              {errors.calories && (
                <p className="text-red-500 text-sm">{errors.calories}</p>
              )}
            </div>

            {/* Routine Type */}
            <div className="grid gap-3 mb-3">
              <label className="text-sm font-medium">Routine Type</label>
              <SelectRoutineType
                value={formData.routineType}
                onChange={(val) => handleChange("routineType", val)}
              />
              {errors.routineType && (
                <p className="text-red-500 text-sm">{errors.routineType}</p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Write a description about the routine."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Routine Creation */}
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
              <RoutineCreation
                workouts={workouts}
                onWorkoutsChange={(newWorkouts) => {
                  setWorkouts(newWorkouts);
                  if (errors.workouts && newWorkouts.length > 0) {
                    setErrors((prev) => ({ ...prev, workouts: "" }));
                  }
                }}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 md:w-9/10">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create New Routine"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
