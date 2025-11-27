import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft, Dumbbell, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import API from "@/lib/axios";
import { motion } from "framer-motion";

export default function MemberWorkoutDetails() {
  const { id } = useParams<{ id: string }>();

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchWorkout = async () => {
    try {
      const res = await API.get(`/workout/${id}`);
      setWorkout(res.data.workout);
    } catch (err) {
      console.error("Error loading workout", err);
    } finally {
      setLoading(false);
    }
  };

  const checkSaved = async () => {
    try {
      const res = await API.get("/workout/saved/me");
      const savedList = res.data.saved;
      const found = savedList.some(
        (item: any) => item.workoutId === Number(id)
      );
      setIsSaved(found);
    } catch (err) {
      console.error("Error checking saved workouts", err);
    }
  };

  useEffect(() => {
    fetchWorkout();
    checkSaved();
  }, [id]);

  const handleSaveToggle = async () => {
    try {
      setSaving(true);

      if (isSaved) {
        const res = await API.delete(`/workout/${id}/save`);
        if (res.data.success) setIsSaved(false);
      } else {
        const res = await API.post(`/workout/${id}/save`);
        if (res.data.success) setIsSaved(true);
      }
    } catch (err: any) {
      console.error("Save/Unsave error:", err);
      alert(err.response?.data?.error || "Failed to update save status");
    } finally {
      setSaving(false);
    }
  };

  const renderDifficultyBadge = (level: string) => {
    if (!level) return null;

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

  if (loading) return <p className="text-center mt-10">Loading workout...</p>;
  if (!workout) return <p className="text-center mt-10">Workout not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center gap-5 mb-5">
          <Link to="/member/workouts">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>

        <div className="workout-details mx-auto md:w-4/5 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="text-primary" />
              <h1 className="text-xl font-bold">{workout.workoutName}</h1>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              {renderDifficultyBadge(workout.difficulty)}
              <Target className="w-4 h-4" />
              {workout.muscleGroup}
            </div>
            <p className="mt-2 text-sm font-semibold">
              Equipment required: {workout.equipment || "None"}
            </p>
          </div>

          <div className="mt-5 md:w-9/10 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Workout Description</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{workout.description}</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Save/Unsave Button */}
          <div className="mt-4 md:w-9/10 w-full">
            <Button
              className="w-full"
              disabled={saving}
              onClick={handleSaveToggle}
            >
              {saving ? "Updating..." : isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
