import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";
import { motion } from "framer-motion";

const MemberDashboard: React.FC = () => {
  const [progressData, setProgressData] = useState<
    { day: string; completed: number }[]
  >([]);
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    streak: 0,
    savedWorkouts: 0,
    savedRoutines: 0,
  });

  const memberName = localStorage.getItem("name") || "Member";

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await API.get("/member/dashboard-stats");
        const stats = res.data.stats;

        setSummary({
          totalWorkouts: stats.routineCreated,
          streak: stats.streak,
          savedWorkouts: stats.savedWorkouts,
          savedRoutines: stats.savedRoutines,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress");
        const analytics = res.data.analytics;

        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const data: { day: string; completed: number }[] = weekDays.map(
          (d) => ({
            day: d,
            completed: 0,
          })
        );

        analytics.forEach((item: any) => {
          if (item.status === "COMPLETED" && item.completedAt) {
            const date = new Date(item.completedAt);
            const dayName = weekDays[date.getDay()];
            const idx = weekDays.indexOf(dayName);
            if (idx >= 0) data[idx].completed += 1;
          }
        });

        setProgressData(data);
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          Welcome back,{" "}
          <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            {memberName}
          </span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Routine Created", value: summary.totalWorkouts },
            { title: "Workout Streak", value: `${summary.streak} days` },
            { title: "Saved Workouts", value: summary.savedWorkouts },
            { title: "Saved Routines", value: summary.savedRoutines },
          ].map((item, idx) => (
            <Card key={idx} className="border-primary bg-primary/10 p-3">
              <CardHeader>
                <p className="font-semibold">{item.title}</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                  {item.value}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Weekly Routine Completion</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  label={{
                    value: "Day of Week",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
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
                  <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7e22ce" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default MemberDashboard;
