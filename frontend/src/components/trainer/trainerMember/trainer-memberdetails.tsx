import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import API from "@/lib/axios";
import { motion } from "framer-motion";

export default function TrainerMemberDetails() {
  const { id } = useParams(); 
  const [isEditing, setIsEditing] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [progressData, setProgressData] = useState<{ day: string; completed: number }[]>([]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await API.get(`/trainer/members/${id}`);
        setMember(res.data.member);

        const progressRes = await API.get(`/progress/member/${id}`);
        const analytics = progressRes.data.analytics;

        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const data = weekDays.map((d) => ({ day: d, completed: 0 }));

        analytics.forEach((item: any) => {
          if (item.status === "COMPLETED" && item.completedAt) {
            const date = new Date(item.completedAt);
            const dayName = weekDays[date.getDay()];
            const idx = weekDays.indexOf(dayName);
            if (idx >= 0) data[idx].completed += 1;
          }
        });

        setProgressData(data);
      } catch (err) {
        console.error("Failed to fetch member or progress:", err);
      }
    };

    fetchMember();
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setMember((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    try {
      await API.put(`/trainer/profile`, {
        user: {
          fullName: member.user.userName,
          email: member.user.email,
          gender: member.user.gender,
          dateOfBirth: member.user.dateOfBirth,
          bio: member.user.bio,
        },
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!member) return <p>Loading member...</p>;

  return (
         <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-5 mb-5">
        <Link to="/trainer/members">
          <Button variant="outline">
            <ArrowLeft /> Back
          </Button>
        </Link>
      </div>

      <form>
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Full Name</p>
            <Input
              value={member.user.userName || ""}
              onChange={(e) =>
                handleChange("user", { ...member.user, userName: e.target.value })
              }
              disabled={!isEditing}
              className="md:w-4/5 w-full text-sm"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              value={member.user.email || ""}
              onChange={(e) =>
                handleChange("user", { ...member.user, email: e.target.value })
              }
              type="email"
              disabled={!isEditing}
              className="md:w-4/5 w-full text-sm"
            />
          </div>

          <div className="grid gap-3 mb-3 md:w-4/5">
            <p>Date of Birth</p>
            <Calendar28
              value={member.user.dateOfBirth || ""}
              onChange={(val) =>
                handleChange("user", { ...member.user, dateOfBirth: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender
              value={member.user.gender || ""}
              onValueChange={(val) =>
                handleChange("user", { ...member.user, gender: val })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Bio</p>
            <Textarea
              value={member.user.bio || ""}
              onChange={(e) =>
                handleChange("user", { ...member.user, bio: e.target.value })
              }
              disabled={!isEditing}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Other Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Goal</p>
            <Textarea
              value={member.goal || ""}
              onChange={(e) => handleChange("goal", e.target.value)}
              disabled={!isEditing}
              className="w-full text-sm"
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Medical Notes</p>
            <Textarea
              value={member.medicalNotes || ""}
              onChange={(e) => handleChange("medicalNotes", e.target.value)}
              disabled={!isEditing}
              className="w-full text-sm"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4 w-4/5 mx-auto">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </form>

      {/* Weekly Progress Chart */}
      <div className="w-4/5 mx-auto mb-5">
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
                  label={{ value: "Day of Week", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  label={{ value: "Completed Routines", angle: -90, position: "insideLeft" }}
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
      </div>
      </motion.div>
  );
}
