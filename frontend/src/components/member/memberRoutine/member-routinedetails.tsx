import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BicepsFlexed, Clock, Dumbbell, Flame } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutDetailsCard } from "@/components/WorkoutDetailsCard";
import { Checkbox } from "@/components/ui/checkbox";
import API from "@/lib/axios";
import { motion } from "framer-motion";

export default function MemberRoutineDetails() {
  const { id } = useParams();
  const [routine, setRoutine] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/routine/${id}`);
        setRoutine(res.data.routine);

        const savedRes = await API.get("/routine/saved/me");
        const savedRoutineIds = savedRes.data.saved.map(
          (r: any) => r.routine?.routineId || r.routineId
        );
        setIsSaved(savedRoutineIds.includes(Number(id)));

        const progressRes = await API.get(`/progress/${id}`);
        const lastSession = progressRes.data.progress.slice(-1)[0];
        if (lastSession && lastSession.status === "IN_PROGRESS") {
          setSessionActive(true);
          setSessionId(lastSession.sessionId);
          const completed = progressRes.data.progress
            .filter((p: any) => p.workoutId && p.status === "COMPLETED")
            .map((p: any) => p.workoutId);
          setCompletedWorkouts(completed);
        }
      } catch (error: any) {
        console.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  const startSession = async () => {
    try {
      const res = await API.post(`/progress/${id}/start`);
      setSessionId(res.data.sessionId);
      setSessionActive(true);
      setSessionCompleted(false);
      setCompletedWorkouts([]);
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Failed to start routine.");
    }
  };

  const finishSession = async () => {
    if (!sessionId) return;

    setIsFinishing(true);
    try {
      await API.post(`/progress/${id}/finish`, {
        sessionId,
        completedWorkoutIds: completedWorkouts,
      });
      setSessionActive(false);
      setSessionCompleted(true);
      setSessionId(null);
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Failed to finish routine.");
    } finally {
      setIsFinishing(false);
    }
  };

  const handleCheckboxChange = (workoutId: number) => {
    if (!sessionActive) return;

    setCompletedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const toggleSave = async () => {
    try {
      const method = isSaved ? "delete" : "post";
      await API[method](`/routine/${id}/save`);
      setIsSaved(!isSaved);
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      alert(
        error.response?.data?.error ||
          "Failed to save/unsave routine. Try again."
      );
    }
  };

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

  if (loading) return <p>Loading...</p>;
  if (!routine) return <p>Routine not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto md:w-4/5 w-full">
        {/* Top Buttons */}
        <div className="flex items-center gap-5 mb-5">
          <Link to="/member/routines">
            <Button variant="outline">
              <ArrowLeft /> Back
            </Button>
          </Link>
        </div>

        {/* Routine Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="text-primary" />
            <h1 className="text-xl font-bold">{routine.routineName}</h1>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm">
            {renderDifficultyBadge(routine.difficulty)}
          </div>

          <div className="flex items-center gap-5 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <p>{routine.duration} min</p>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-primary" />
              <p>{routine.calories} cal</p>
            </div>
            <div className="flex items-center gap-1">
              <BicepsFlexed className="w-4 h-4 text-primary" />
              <p>{routine.type}</p>
            </div>
          </div>

          {/* Routine Description */}
          <div className="mt-5 md:w-9/10 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Routine Description</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{routine.description}</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 md:w-9/10 w-full space-y-2">
            {routine.routineWorkouts.map((w: any, index: number) => {
              const wid = w.workoutId;
              return (
                <div
                  key={w.routineWorkoutId ?? wid ?? index}
                  className="flex items-center gap-2"
                >
                  {sessionActive && (
                    <Checkbox
                      checked={completedWorkouts.includes(wid)}
                      onCheckedChange={() => handleCheckboxChange(wid)}
                    />
                  )}

                  <WorkoutDetailsCard
                    name={w.workout.workoutName}
                    sets={w.sets}
                    reps={w.reps}
                    index={index}
                    className={`flex-1 ${
                      completedWorkouts.includes(wid)
                        ? "border-green-500 shadow-md"
                        : ""
                    }`}
                  />
                </div>
              );
            })}

            {!sessionActive && !sessionCompleted && (
              <Button className="w-full mt-3" onClick={startSession}>
                Start Routine
              </Button>
            )}

            {sessionActive && (
              <Button
                className="w-full mt-3"
                disabled={isFinishing}
                onClick={finishSession}
              >
                {isFinishing ? "Finishing..." : "Finish Routine"}
              </Button>
            )}

            {sessionCompleted && (
              <div className="p-4 border rounded-lg bg-green-50 mt-3 text-center">
                <p className="font-semibold text-green-700">
                  Session Completed!
                </p>
                <p className="text-sm text-green-700">
                  You completed {completedWorkouts.length} out of{" "}
                  {routine.routineWorkouts.length} workouts.
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="mt-4 md:w-9/10 w-full">
            <Button className="w-full" onClick={toggleSave}>
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
