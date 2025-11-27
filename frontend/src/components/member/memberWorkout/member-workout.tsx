import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { MuscleGroups, type MuscleGroup } from "@/lib/constants";
import { MuscleGroupBtnGroup } from "../../MuscleGroupBtnGroup";
import WorkoutCard from "../../WorkoutCard";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";

export default function MemberWorkout() {
  const [activeCategory, setActiveCategory] = useState<MuscleGroup>("ALL");
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/workout");
      setWorkouts(res.data.workouts || []);
    } catch (err) {
      console.error("Error fetching workouts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/workout/${id}`);
      setWorkouts((prev) => prev.filter((w) => w.workoutId !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredWorkouts =
    activeCategory === "ALL"
      ? workouts
      : workouts.filter((w) => w.muscleGroup === activeCategory);

  if (loading) return <p>Loading workouts...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Header */}
        <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Workouts</h1>
            <p className="text-sm opacity-50">Discover workout exercises</p>
          </div>
        </div>

        {/* Muscle Group Filter */}
        <div className="mb-5 flex">
          <MuscleGroupBtnGroup
            active={activeCategory}
            onSelect={(cat) => setActiveCategory(cat)}
          />
        </div>

        {/* Workout Cards */}
        <div className="flex flex-wrap gap-5 w-fit">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((w) => (
              <WorkoutCard
                key={w.workoutId}
                id={w.workoutId}
                title={w.workoutName}
                muscleGroup={w.muscleGroup}
                difficulty={w.difficulty}
                description={w.description}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="opacity-50">No workouts found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
