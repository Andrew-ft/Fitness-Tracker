import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function TrainerAddRoutine() {
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
    if (!formData.routineName.trim()) newErrors.routineName = "Routine Name is required";
    if (!formData.difficulty.trim()) newErrors.difficulty = "Difficulty is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.calories.trim()) newErrors.calories = "Calories is required";
    if (!formData.routineType.trim()) newErrors.routineType = "Routine Type is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (workouts.length === 0) newErrors.workouts = "Please add at least one workout";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

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
    navigate("/trainer/routines");
  } catch (err: any) {
    console.error("Caught error:", err); 
    if (err.response) {
      console.error("Error response data:", err.response.data);
      console.error("Error status:", err.response.status);
      console.error("Error headers:", err.response.headers);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {

      console.error("Error message:", err.message);
    }

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
        <Link to="/trainer/routines">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2" />
            Back
          </Button>
        </Link>

        <div>
          <h1 className="text-xl font-semibold">Add New Routine</h1>
          <p className="text-sm text-muted-foreground">Create a new workout routine</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          
          {/* Routine Name */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Routine Name</label>
            <Input
              placeholder="Push Pull Leg"
              value={formData.routineName}
              onChange={(e) => handleChange("routineName", e.target.value)}
            />
            {errors.routineName && <p className="text-red-500 text-sm">{errors.routineName}</p>}
          </div>

          {/* Difficulty */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Difficulty</label>
            <SelectDifficulty
              value={formData.difficulty}
              onChange={(val) => handleChange("difficulty", val)}
            />
            {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
          </div>

          {/* Duration */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Duration <span className="text-xs">(mins)</span>
            </label>
            <Input
              type="number"
              placeholder="60"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>

          {/* Calories */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Calories</label>
            <Input
              type="number"
              placeholder="350"
              value={formData.calories}
              onChange={(e) => handleChange("calories", e.target.value)}
            />
            {errors.calories && <p className="text-red-500 text-sm">{errors.calories}</p>}
          </div>

          {/* Routine Type */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Routine Type</label>
            <SelectRoutineType
              value={formData.routineType}
              onChange={(val) => handleChange("routineType", val)}
            />
            {errors.routineType && <p className="text-red-500 text-sm">{errors.routineType}</p>}
          </div>

          {/* Description */}
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Write a description about the routine."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Routine Creation */}
          <div className="grid gap-2 md:col-span-2">
            <RoutineCreation
              workouts={workouts}
              onWorkoutsChange={(newWorkouts) => {
                setWorkouts(newWorkouts);
                if (errors.workouts && newWorkouts.length > 0) {
                  setErrors((prev) => ({ ...prev, workouts: "" }));
                }
              }}
            />
            {errors.workouts && <p className="text-red-500 text-sm">{errors.workouts}</p>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create New Routine"}
            </Button>
            {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
          </div>

        </div>
      </form>
      </div>
      </motion.div>
  );
}
