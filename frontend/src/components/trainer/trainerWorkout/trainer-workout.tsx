import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { MuscleGroupBtnGroup } from "../../MuscleGroupBtnGroup";
import WorkoutCard from "../../WorkoutCard";

const initialWorkouts = [
  { id: 1, title: "Bench Press", muscleGroup: "Chest", difficulty: "Intermediate" },
  { id: 2, title: "Pull Up", muscleGroup: "Back", difficulty: "Advanced" },
  { id: 3, title: "Shoulder Press", muscleGroup: "Shoulders", difficulty: "Intermediate" },
  { id: 4, title: "Bicep Curl", muscleGroup: "Arms", difficulty: "Beginner" },
  { id: 5, title: "Plank", muscleGroup: "Core", difficulty: "Beginner" },
  { id: 6, title: "Squat", muscleGroup: "Legs", difficulty: "Intermediate" },
  { id: 7, title: "Jump Rope", muscleGroup: "Cardio", difficulty: "Beginner" },
];

export default function TrainerWorkout() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [workouts, setWorkouts] = useState(initialWorkouts);

  // delete handler
  const handleDelete = (id: number) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const filteredWorkouts =
    activeCategory === "All"
      ? workouts
      : workouts.filter((w) => w.muscleGroup === activeCategory);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Workouts</h1>
          <p className="text-sm opacity-50">
            Discover and manage workout exercises
          </p>
        </div>
        <div>
          <Link to="/trainer/workouts/add">
            <Button>Add New Workout</Button>
          </Link>
        </div>
      </div>

      <div className="mb-5 flex">
        <MuscleGroupBtnGroup
          active={activeCategory}
          onSelect={(cat) => setActiveCategory(cat)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            id={workout.id}
            title={workout.title}
            muscleGroup={workout.muscleGroup}
            difficulty={workout.difficulty}
            onDelete={handleDelete}  
          />
        ))}
      </div>
    </div>
  );
}
