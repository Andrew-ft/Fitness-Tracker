import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { SelectEquipment } from "../../selectEquipment";
import { SelectMuscleGroup } from "../../selectMuscleGroup";
import { SelectDifficulty } from "../../selectDifficulty";
import { Textarea } from "../../ui/textarea";
import type { MuscleGroup, Difficulty, SubMuscle } from "@/lib/constants";
import { SelectSubMuscle } from "@/components/selectSubMuscle";
import API from "@/lib/axios";
import { motion } from "framer-motion";

export default function TrainerAddWorkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workoutName: "",
    difficulty: "BEGINNER" as Difficulty,
    muscleGroup: "CHEST" as MuscleGroup,
    subMuscle: "UPPER_CHEST" as SubMuscle,
    equipment: "",
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
    if (!formData.workoutName.trim())
      newErrors.workoutName = "Workout Name is required";
    if (!formData.difficulty.trim())
      newErrors.difficulty = "Difficulty is required";
    if (!formData.muscleGroup.trim())
      newErrors.muscleGroup = "Muscle Group is required";
    if (!formData.subMuscle.trim())
      newErrors.subMuscle = "Sub Muscle is required";
    if (!formData.equipment.trim())
      newErrors.equipment = "Equipment is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await API.post("/workout", formData);
      console.log("Workout created:", res.data.workout);

      navigate("/trainer/workout");
    } catch (err: any) {
      console.error("Failed to create workout:", err);
      if (err.response?.data?.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("An unexpected error occurred.");
      }
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
        <div className="flex items-center gap-5 mb-5">
          <div>
            <Link to="/trainer/workout">
              <Button variant="outline">
                <ArrowLeft />
                Back
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="font-semibold text-xl">Add New Workout</h1>
            <p className="text-sm opacity-50">Create a new workout exercise</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            {/* Workout Name */}
            <div className="grid gap-3 mb-3">
              <p>Workout Name</p>
              <Input
                id="workoutName"
                type="text"
                className="md:w-4/5 w-full text-sm"
                placeholder="Bench Press"
                value={formData.workoutName}
                onChange={(e) => handleChange("workoutName", e.target.value)}
              />
              {errors.workoutName && (
                <p className="text-red-500 text-sm">{errors.workoutName}</p>
              )}
            </div>

            {/* Difficulty */}
            <div className="grid gap-3 mb-3">
              <p>Difficulty</p>
              <SelectDifficulty
                value={formData.difficulty}
                onChange={(val: Difficulty) => handleChange("difficulty", val)}
              />
              {errors.difficulty && (
                <p className="text-red-500 text-sm">{errors.difficulty}</p>
              )}
            </div>

            {/* Muscle Group */}
            <div className="grid gap-3 mb-3">
              <p>Muscle Group</p>
              <SelectMuscleGroup
                value={formData.muscleGroup}
                onChange={(val: MuscleGroup) =>
                  handleChange("muscleGroup", val)
                }
              />
              {errors.muscleGroup && (
                <p className="text-red-500 text-sm">{errors.muscleGroup}</p>
              )}
            </div>

            {/* Sub Muscle */}
            <div className="grid gap-1 mb-3">
              <p>Sub Muscle</p>
              <SelectSubMuscle
                value={formData.subMuscle}
                onChange={(val: SubMuscle) => handleChange("subMuscle", val)}
              />
              {errors.subMuscle && (
                <p className="text-red-500 text-sm">{errors.subMuscle}</p>
              )}
            </div>

            {/* Equipment */}
            <div className="grid gap-3 mb-3">
              <p>Equipment</p>
              <SelectEquipment
                value={formData.equipment}
                onChange={(val: string) => handleChange("equipment", val)}
              />
              {errors.equipment && (
                <p className="text-red-500 text-sm">{errors.equipment}</p>
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

            {/* Submit Button */}
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create New Workout"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
