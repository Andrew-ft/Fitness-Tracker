import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { RoutineGroupBtnGroup } from "../../RoutineGroupBtnGroup";
import { useState, useEffect } from "react";
import RoutineCard from "../../RoutineCard";
import API from "@/lib/axios";
import { motion } from "framer-motion";

interface Routine {
  routineId: number;
  routineName: string;
  type: string;
  difficulty: string;
  description?: string;
  isPrivate?: boolean;
  duration: number;
  calories: number;
  routineWorkouts: any[];
  createdBy?: { userName: string };
}

export default function TrainerRoutines() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const res = await API.get("/routine");
      setRoutines(res.data.routines || []);
    } catch (err) {
      console.error("Error fetching routines:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/routine/${id}`);
      setRoutines((prev) => prev.filter((routine) => routine.routineId !== id));
    } catch (err) {
      console.error("Error deleting routine:", err);
    }
  };

  const filteredRoutines =
    activeCategory === "All"
      ? routines
      : routines.filter((r) => r.type === activeCategory);

  if (loading) return <p className="text-center mt-10">Loading routines...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Routines</h1>
            <p className="text-sm opacity-50">
              Structured workout programs for your fitness goals.
            </p>
          </div>
          <div>
            <Link to="/trainer/routines/add">
              <Button>Add New Routine</Button>
            </Link>
          </div>
        </div>

        <div className="mb-5">
          <RoutineGroupBtnGroup
            active={activeCategory}
            onSelect={(cat) => setActiveCategory(cat)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-fit">
          {filteredRoutines.map((routine) => (
            <RoutineCard
              key={routine.routineId}
              id={routine.routineId}
              title={routine.routineName}
              focus={routine.type}
              difficulty={routine.difficulty}
              onDelete={handleDelete}
              creator={routine.createdBy?.userName || ""}
              duration={routine.duration}
              caloriesBurned={routine.calories}
              numWorkouts={routine.routineWorkouts.length}
              description={routine.description}
              isPrivate={routine.isPrivate}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
