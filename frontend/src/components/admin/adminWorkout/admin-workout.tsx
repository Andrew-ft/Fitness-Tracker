import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { MuscleGroupBtnGroup } from "../../MuscleGroupBtnGroup";
import WorkoutCard from "../../WorkoutCard";
import API from "@/lib/axios";
import type { MuscleGroup, Difficulty, SubMuscle } from "@/lib/constants";
import { motion } from "framer-motion";

interface Workout {
  workoutId: number;
  workoutName: string;
  muscleGroup: MuscleGroup;
  subMuscle: SubMuscle;
  difficulty: Difficulty;
  description?: string;
  equipment?: string;
}

export default function AdminWorkout() {
  const [activeCategory, setActiveCategory] = useState<MuscleGroup>("ALL");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/workout");
      const apiWorkouts: Workout[] = res.data.workouts.map((w: any) => ({
        ...w,
        muscleGroup: w.muscleGroup as MuscleGroup,
        difficulty: w.difficulty as Difficulty,
        subMuscle: w.subMuscle as SubMuscle,
      }));
      setWorkouts(apiWorkouts);
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
      const res = await API.delete(`/workout/${id}`);
      console.log(res.data);
      setWorkouts((prev) => prev.filter((w) => w.workoutId !== id));
    } catch (err: any) {
      console.error(
        "Error deleting workout:",
        err.response?.data || err.message
      );
    }
  };

  const filteredWorkouts =
    activeCategory === "ALL"
      ? workouts
      : workouts.filter((w) => w.muscleGroup === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Workouts</h1>
            <p className="text-sm opacity-50">
              Discover and manage workout exercises
            </p>
          </div>
          <div>
            <Link to="/admin/workouts/add">
              <Button>Add New Workout</Button>
            </Link>
          </div>
        </div>

        <div className="mb-5 flex">
          <MuscleGroupBtnGroup
            active={activeCategory}
            onSelect={(cat: MuscleGroup) => setActiveCategory(cat)}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading workouts...</p>
        ) : filteredWorkouts.length === 0 ? (
          <p className="text-center">No workouts found.</p>
        ) : (
          <div className="flex flex-wrap gap-5 w-fit">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.workoutId}
                id={workout.workoutId}
                title={workout.workoutName}
                muscleGroup={workout.muscleGroup}
                difficulty={workout.difficulty}
                description={workout.description}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
