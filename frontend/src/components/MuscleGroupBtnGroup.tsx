import { Button } from "@/components/ui/button";
import { MuscleGroup } from "@/lib/enums";

const categories: MuscleGroup[] = [
  MuscleGroup.ALL,
  MuscleGroup.CHEST,
  MuscleGroup.BACK,
  MuscleGroup.SHOULDERS,
  MuscleGroup.ARMS,
  MuscleGroup.CORE,
  MuscleGroup.LEGS,
  MuscleGroup.CARDIO,
];

interface MuscleGroupBtnGroupProps {
  active: MuscleGroup;
  onSelect: (muscleGroup: MuscleGroup) => void;
}

export function MuscleGroupBtnGroup({ active, onSelect }: MuscleGroupBtnGroupProps) {
  return (
    <div className="flex flex-wrap md:justify-start justify-center gap-2 p-2 rounded-lg">
      {categories.map((muscleGroup) => (
        <Button
          key={muscleGroup}
          variant="ghost"
          onClick={() => onSelect(muscleGroup)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            active === muscleGroup ? "bg-primary text-white" : "bg-secondary text-white"
          }`}
        >
          {muscleGroup.charAt(0) + muscleGroup.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  );
}
