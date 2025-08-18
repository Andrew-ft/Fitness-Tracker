import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Full Body Split",
  "Upper/Lower Split",
  "PPL Split",
  "Bro Split",
  "Circuit Training"
];

export function RoutineGroupBtnGroup({ active, onSelect }: { active: string; onSelect: (routineGroup: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-lg">
      {categories.map((routineGroup) => (
        <Button
          key={routineGroup}
          variant="ghost"
          onClick={() => onSelect(routineGroup)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            active === routineGroup
              ? "bg-primary text-white"
              : "bg-secondary text-white"
          }`}
        >
          {routineGroup}
        </Button>
      ))}
    </div>
  );
}
