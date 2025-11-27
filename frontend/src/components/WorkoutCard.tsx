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
import { Dumbbell } from "lucide-react";

export default function WorkoutCard({
  id,
  title,
  muscleGroup,
  difficulty,
  onDelete,
}: {
  id: number;
  title: string;
  muscleGroup: string;
  difficulty: string;
  onDelete: (id: number) => void;
}) {
  const role = localStorage.getItem("role") || "member"; // default fallback

  // choose correct path based on role
  const basePath =
    role === "admin"
      ? "/admin/workouts"
      : role === "trainer"
      ? "/trainer/workouts"
      : "/member/workouts";

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
        return <Badge variant="default">{level}</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        <div className="flex items-center gap-2 pb-3">
          <Dumbbell className="text-primary" />
          <Link to={`${basePath}/${id}`}>
            <CardTitle className="mb-1 inline-flex items-center cursor-pointer">
              {title}
            </CardTitle>
          </Link>
        </div>
        <div className="flex gap-1">
          <Badge variant="secondary">{muscleGroup}</Badge>
          {renderDifficultyBadge(difficulty)}
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>
          This is a {muscleGroup} exercise for building strength.
        </CardDescription>
      </CardContent>

      <CardFooter>
        <CardAction className="flex flex-wrap gap-2 w-full">
          <Link to={`${basePath}/${id}`}>
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
