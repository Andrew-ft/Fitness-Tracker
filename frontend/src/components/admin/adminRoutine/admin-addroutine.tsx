import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { SelectDifficulty } from "../../selectDifficulty";
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

export default function AdminAddRoutine() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [formData, setFormData] = useState({
    routineName: "",
    difficulty: "BEGINNER" as Difficulty,
    duration: "",
    calories: "",
    routineType: "",
    description: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | string[]) => {
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
    if (!validate()) return;

    const payload = {
      routineName: formData.routineName,
      difficulty: formData.difficulty,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
      type: formData.routineType,
      description: formData.description,
      routineWorkouts: workouts.map((w) => ({
        workoutId: Number(w.id),
        sets: w.sets,
        reps: w.reps,
      })),
    };

    try {
      setLoading(true);
      const res = await API.post("/routine", payload);
      console.log("Routine created successfully:", res.data);
      navigate("/admin/routines");
    } catch (err: any) {
      console.error(
        "Failed to create routine:",
        err.response?.data || err.message
      );
      setErrors((prev) => ({
        ...prev,
        general: "Failed to create routine. Try again.",
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
      {/* Top Bar */}
      <div className="flex items-center gap-5 mb-5">
        <Link to="/admin/routines">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-xl">Add New Routine</h1>
          <p className="text-sm opacity-50">Create a new routine plan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Routine Name */}
          <div className="grid gap-3 mb-3">
            <p>Routine Name</p>
            <Input
              id="routineName"
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="Push Pull Legs"
              value={formData.routineName}
              onChange={(e) => handleChange("routineName", e.target.value)}
            />
            {errors.routineName && (
              <p className="text-red-500 text-sm">{errors.routineName}</p>
            )}
          </div>

          {/* Difficulty */}
          <div className="grid gap-3 mb-3">
            <p>Difficulty</p>
            <SelectDifficulty
              value={formData.difficulty}
              onChange={(val) => handleChange("difficulty", val)}
            />
            {errors.difficulty && (
              <p className="text-red-500 text-sm">{errors.difficulty}</p>
            )}
          </div>

          {/* Duration */}
          <div className="grid gap-3 mb-3">
            <p>
              Duration <span className="text-sm">(mins)</span>
            </p>
            <Input
              id="duration"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="60"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>

          {/* Calories */}
          <div className="grid gap-3 mb-3">
            <p>Calories</p>
            <Input
              id="calories"
              type="number"
              className="md:w-4/5 w-full text-sm"
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
            <p>Routine Type</p>
            <SelectRoutineType
              value={formData.routineType}
              onChange={(val) => handleChange("routineType", val)}
            />
            {errors.routineType && (
              <p className="text-red-500 text-sm">{errors.routineType}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Description</p>
            <Textarea
              id="description"
              className="w-full text-sm"
              placeholder="Write a description about the new workout exercise."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Routine Creation (Workouts) */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <RoutineCreation
              workouts={workouts}
              onWorkoutsChange={(newWorkouts) => {
                setWorkouts(newWorkouts);
                if (errors.workouts && newWorkouts.length > 0) {
                  setErrors((prev) => ({ ...prev, workouts: "" }));
                }
              }}
            />
            {errors.workouts && (
              <p className="text-red-500 text-sm mt-1">{errors.workouts}</p>
            )}
          </div>

          {/* Submit */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create New Routine"}
            </Button>
            {errors.general && (
              <p className="text-red-500 text-sm mt-2">{errors.general}</p>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
