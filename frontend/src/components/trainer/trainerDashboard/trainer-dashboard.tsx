import { useEffect, useState } from "react";
import API from "@/lib/axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

interface MemberProgress {
  name: string;
  completed: number;
}

export default function TrainerDashboardStatusCard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    routinesCreated: 0,
    totalWorkouts: 0,
    totalMembersInSystem: 0,
    completedRoutines: 0,
  });

  const [progressData, setProgressData] = useState<MemberProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/trainer/dashboard-stats");
        if (res.data.success) {
          const data = res.data.stats;

          setStats({
            totalMembers: data.totalMembers,
            routinesCreated: data.routinesCreated,
            totalWorkouts: data.totalWorkouts,
            totalMembersInSystem: data.totalMembersInSystem,
            completedRoutines: data.completedRoutines,
          });

          setProgressData(data.memberProgressData || []);
        } else {
          console.error("Failed to fetch stats:", res.data.error);
        }
      } catch (err) {
        console.error("Failed to load trainer dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-4/5 mx-auto gap-5">
        <CardDisplay
          title="Assigned Members"
          value={stats.totalMembers}
          description="Currently training"
        />
        <CardDisplay
          title="Routines Created"
          value={stats.routinesCreated}
          description="In total"
        />
        <CardDisplay
          title="Workouts"
          value={stats.totalWorkouts}
          description="In total"
        />
      </div>

      {/* Member Progress Chart */}
      <div className="mt-10 w-4/5 mx-auto">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Assigned Members Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading chart...</p>
              </div>
            ) : progressData.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No progress data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Completed Routines",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="url(#gradientLine)"
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient
                      id="gradientLine"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#7e22ce" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function CardDisplay({
  title,
  value,
  description,
}: {
  title: string;
  value: number;
  description: string;
}) {
  return (
    <div>
      <Card className="h-full gap-1 border-primary bg-primary/10 p-3 flex flex-col justify-between">
        <CardHeader>
          <p className="font-semibold">{title}</p>
        </CardHeader>
        <CardContent>
          <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            {value}
          </CardTitle>
        </CardContent>
        <CardFooter>
          <CardDescription>{description}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
