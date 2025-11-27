import { useEffect, useState } from "react";
import AdminDashboardStatusCard from "@/components/AdminDashboardStatusCard";
import API from "@/lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; 

interface MemberGrowthData {
  month: string;
  members: number;
}

export default function AdminDashboard() {
  function capitalize(word: string) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  const adminName = capitalize(localStorage.getItem("name") || "User");

  const [memberGrowth, setMemberGrowth] = useState<MemberGrowthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberGrowth = async () => {
      try {
        const res = await API.get("/admin/dashboard/stats");
        if (res.data.success) {
          const rawData: MemberGrowthData[] = res.data.stats.memberGrowth || [];

          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const fullMonthData: MemberGrowthData[] = monthNames.map((month) => ({
            month,
            members: 0,
          }));

          rawData.forEach((item) => {
            const index = monthNames.indexOf(item.month);
            if (index >= 0) fullMonthData[index].members = item.members;
          });

          setMemberGrowth(fullMonthData);
        }
      } catch (err) {
        console.error("Failed to fetch member growth:", err);
        setMemberGrowth([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberGrowth();
  }, []);

  return (
    <motion.div
      className="p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Welcome Header */}
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-semibold text-2xl">
          Welcome Back,{" "}
          <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent font-bold">
            {adminName}
          </span>
        </h1>
      </div>

      {/* Status Cards */}
      <div>
        <AdminDashboardStatusCard />
      </div>

      {/* Member Growth Chart */}
      <div className="mt-10 w-8/10 mx-auto">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Monthly Member Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading chart...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memberGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: "Month",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "New Members",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="members"
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
