import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { RoutineGroupBtnGroup } from "../../RoutineGroupBtnGroup";
import { useState } from "react";
import RoutineCard from "../../RoutineCard";

const initialRoutines = [
  { id: 1, title: "Full Body Strength", focus: "Full Body Split", difficulty: "Beginner" },
  { id: 2, title: "Upper Body Power", focus: "Upper/Lower Split", difficulty: "Intermediate" },
  { id: 3, title: "Upper Body Power", focus: "Upper/Lower Split", difficulty: "Intermediate" },
  
];

export default function AdminRoutines() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [routines, setRoutines] = useState(initialRoutines);

  const handleDelete = (id: number) => {
    setRoutines((prev) => prev.filter((routine) => routine.id !== id));
  };

  const filteredRoutines =
    activeCategory === "All"
      ? routines
      : routines.filter((r) => r.focus === activeCategory);

  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRoutines.map((routine) => (
          <RoutineCard
            key={routine.id}
            id={routine.id}
            title={routine.title}
            focus={routine.focus}
            difficulty={routine.difficulty}
            onDelete={handleDelete} creator={""} duration={""} caloriesBurned={0} numWorkouts={0}          />
        ))}
      </div>
    </div>
  );
}