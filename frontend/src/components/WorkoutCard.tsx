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
  description,
  onDelete,
}: {
  id: number;
  title: string;
  muscleGroup: string;
  difficulty: string;
  description?: string;
  onDelete: (id: number) => void;
}) {
  const role = localStorage.getItem("role") || "MEMBER";

  const basePath =
    role === "ADMIN"
      ? "/admin/workouts"
      : role === "TRAINER"
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
    <Card className="w-full sm:w-64 flex flex-col justify-between border shadow hover:shadow-lg transition-shadow duration-200">
      {/* Card Header */}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-primary w-5 h-5" />
          <Link to={`${basePath}/${id}`} className="flex-1">
            <CardTitle className="text-base font-semibold truncate hover:underline">
              {title}
            </CardTitle>
          </Link>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary" className="capitalize">
            {muscleGroup}
          </Badge>
          {renderDifficultyBadge(difficulty)}
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="py-2 flex-1">
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {description || `This is a ${muscleGroup} exercise for building strength.`}
        </CardDescription>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="pt-2">
        <CardAction className="flex gap-2 flex-wrap w-full">
          {(role === "ADMIN" || role === "TRAINER") ? (
            <>
              <Link to={`${basePath}/${id}`}>
                <Button variant="secondary" className="flex-1 min-w-[70px]">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => onDelete(id)}
                className="flex-1 min-w-[70px] text-white"
              >
                Delete
              </Button>
            </>
          ) : (
            <div className="w-full"></div>
          )}
        </CardAction>
      </CardFooter>
    </Card>
  );
}
