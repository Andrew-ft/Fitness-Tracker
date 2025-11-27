import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { RoutineGroupBtnGroup } from "../../RoutineGroupBtnGroup";
import RoutineCard from "../../RoutineCard";
import API from "@/lib/axios";

import { motion } from "framer-motion";

interface Routine {
  id: number;
  title: string;
  focus: string;
  difficulty: string;
  creator?: string;
  duration?: number;
  caloriesBurned?: number;
  numWorkouts?: number;
  description?: string;
  isPrivate?: boolean;
}

export default function AdminRoutines() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const res = await API.get("/routine");
      const mappedRoutines: Routine[] = res.data.routines.map((r: any) => ({
        id: r.routineId,
        title: r.routineName,
        focus: r.type,
        difficulty: r.difficulty,
        creator: r.createdBy?.userName || "Unknown",
        duration: r.duration || 0,
        caloriesBurned: r.calories || 0,
        numWorkouts: r.routineWorkouts?.length || 0,
        description: r.description || "",
        isPrivate: r.isPrivate || false,
      }));
      setRoutines(mappedRoutines);
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
      setRoutines((prev) => prev.filter((routine) => routine.id !== id));
    } catch (err: any) {
      console.error(
        "Error deleting routine:",
        err.response?.data?.error || err.message
      );
    }
  };

  const filteredRoutines =
    activeCategory === "All"
      ? routines
      : routines.filter((r) => r.focus === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Routines</h1>
          <p className="text-sm opacity-50">
            Structured workout programs for your fitness goals.
          </p>
        </div>
        <div>
          <Link to="/admin/routines/add">
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

      {loading ? (
        <p className="text-center">Loading routines...</p>
      ) : filteredRoutines.length === 0 ? (
        <p className="text-center">No routines found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-fit">
          {filteredRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              id={routine.id}
              title={routine.title}
              focus={routine.focus}
              difficulty={routine.difficulty}
              onDelete={handleDelete}
              creator={routine.creator}
              duration={routine.duration || 0}
              caloriesBurned={routine.caloriesBurned || 0}
              numWorkouts={routine.numWorkouts || 0}
              description={routine.description}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
