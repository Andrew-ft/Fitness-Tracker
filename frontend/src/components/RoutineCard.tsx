import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Clock, Flame, Dumbbell, BicepsFlexed } from "lucide-react";

export default function RoutineCard({
  id,
  title,
  focus,
  difficulty,
  creator,
  duration,
  caloriesBurned,
  numWorkouts,
  onDelete,
}: {
  id: number;
  title: string;
  focus: string;
  difficulty: string;
  creator: string;
  duration: string;
  caloriesBurned: number;
  numWorkouts: number;
  onDelete: (id: number) => void;
}) {
  // helper to pick badge style
  const renderDifficultyBadge = (level: string) => {
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
        return <Badge variant="default">{level}</Badge>; // dark primary
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        <div className="flex items-center gap-2 pb-3">
                  <BicepsFlexed className="text-primary"/>
        <Link to={`/admin/routines/${id}`}>
          <CardTitle className="mb-1 cursor-pointer inline-flex items-center">{title}</CardTitle>
        </Link>
        </div>
        <div className="flex gap-1">
          <Badge variant="secondary">{focus}</Badge>
          {renderDifficultyBadge(difficulty)}
        </div>
        <p className="text-sm opacity-70 mt-1">
          Created by <span className="font-semibold">{creator}</span>
        </p>
      </CardHeader>

      <CardContent>
        <CardDescription>
          This is a {focus} routine designed to enhance your fitness goals.
        </CardDescription>
        <div className="flex justify-between gap-4 mt-2 text-sm opacity-80 py-2">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-primary" /> {duration} min
          </span>
          <span className="flex items-center">
            <Flame className="w-4 h-4 mr-1 text-primary" /> {caloriesBurned} cal
          </span>
          <span className="flex items-center">
            <Dumbbell className="w-4 h-4 mr-1 text-primary" /> {numWorkouts} workouts
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="flex flex-wrap gap-2 w-full">
          <Link to={`/admin/routines/${id}`}>
            <Button variant="secondary" className="cursor-pointer">
              Edit
            </Button>
          </Link>
          <Button onClick={() => onDelete(id)}>Delete</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
