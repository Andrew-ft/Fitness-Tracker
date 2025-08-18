import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Core",
  "Legs",
  "Cardio",
];

export function MuscleGroupBtnGroup({ active, onSelect }: { active: string; onSelect: (muscleGroup: string) => void }) {
  return (
    <div className="flex flex-wrap md:justify-start justify-center gap-2 p-2 rounded-lg">
      {categories.map((muscleGroup) => (
        <Button
          key={muscleGroup}
          variant="ghost"
          onClick={() => onSelect(muscleGroup)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            active === muscleGroup
              ? "bg-primary text-white"
              : "bg-secondary text-white"
          }`}
        >
          {muscleGroup}
        </Button>
      ))}
    </div>
  );
}
