import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import API from "@/lib/axios";

export default function AdminDashboardStatusCard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeTrainers: 0,
    routines: 0,
    workouts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Members", value: stats.totalMembers },
    { title: "Total Trainers", value: stats.activeTrainers },
    { title: "Routines", value: stats.routines },
    { title: "Workouts", value: stats.workouts },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-4/5 mx-auto gap-5">
      {cards.map((card) => (
        <div key={card.title}>
          <Card className="gap-1 border-primary bg-primary/10 p-3">
            <CardHeader>
              <p className="font-semibold">{card.title}</p>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                {card.value}
              </CardTitle>
            </CardContent>
            <CardFooter>
              <CardDescription>In total</CardDescription>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
