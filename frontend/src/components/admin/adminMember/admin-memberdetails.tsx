import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AssignedTrainer } from "@/components/AssignedTrainer";
import API from "@/lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface Trainer {
  id: string;
  name: string;
  email: string;
}

interface MemberData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  lastLogin: string;
  gender: string;
  bio: string;
  goal: string;
  medicalNotes: string;
  routinesCreated: number;
  workoutSaved: number;
  trainerId?: number;
}

export default function AdminMemberDetails() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [assignedTrainer, setAssignedTrainer] = useState<Trainer | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<
    { day: string; completed: number }[]
  >([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await API.get("/admin/trainers");
        const mapped: Trainer[] = res.data.trainers.map((t: any) => ({
          id: String(t.trainerId),
          name: t.user.userName,
          email: t.user.email,
        }));
        setTrainers(mapped);
      } catch (err) {
        console.error("Failed to fetch trainers:", err);
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await API.get(`/admin/members/${id}`);
        const data = res.data.member;

        setMember({
          fullName: data.user.userName,
          email: data.user.email,
          phone: data.user.phoneNumber,
          dob: data.user.dateOfBirth?.split("T")[0] || "",
          lastLogin: data.user.lastLogin || "",
          gender: data.user.gender || "",
          bio: data.user.bio || "",
          goal: data.goal || "",
          medicalNotes: data.medicalNotes || "",
          routinesCreated: data.savedRoutines?.length || 0,
          workoutSaved: data.savedWorkouts?.length || 0,
          trainerId: data.trainer?.trainerId,
        });

        if (data.trainer) {
          const trainerMatch = trainers.find(
            (t) => Number(t.id) === data.trainer.trainerId
          );
          setAssignedTrainer(
            trainerMatch || {
              id: String(data.trainer.trainerId),
              name: data.trainer.user.userName,
              email: data.trainer.user.email,
            }
          );
        }
      } catch (err) {
        console.error("Failed to fetch member:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, trainers]);

  const handleAssignTrainer = async (trainer: Trainer) => {
    setAssignedTrainer(trainer);
    try {
      await API.put(`/admin/members/${id}/assign-trainer`, {
        trainerId: Number(trainer.id),
      });
    } catch (err) {
      console.error("Failed to assign trainer:", err);
    }
  };

  const handleRemoveTrainer = async () => {
    setAssignedTrainer(null);
    try {
      await API.put(`/admin/members/${id}/assign-trainer`, {
        trainerId: null,
      });
    } catch (err) {
      console.error("Failed to remove trainer:", err);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    if (!member) return;
    try {
      await API.put(`/admin/members/${id}`, {
        user: {
          userName: member.fullName,
          email: member.email,
          phoneNumber: member.phone,
          gender: member.gender,
          bio: member.bio,
        },
        goal: member.goal,
        medicalNotes: member.medicalNotes,
        trainerId: assignedTrainer ? Number(assignedTrainer.id) : null,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save member:", err);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (!member) return;
    setMember((prev) => ({ ...prev!, [field]: value }));
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get(`/progress/member/${id}`);
        const analytics = res.data.analytics;

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
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      }
    };

    fetchProgress();
  }, [id]);

  if (loading || !member)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/admin/members">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        {!isEditing && <Button onClick={handleEdit}>Edit Profile</Button>}
      </div>

      <form>
        {/* Personal Information */}
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Full Name</p>
            <Input
              value={member.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              type="text"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              value={member.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3">
            <p>Phone Number</p>
            <Input
              value={member.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              type="tel"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3">
            <p>Date of Birth</p>
            <div className="md:w-4/5 w-full text-sm">
              <Calendar28
                value={member.dob}
                onChange={(val) => handleChange("dob", val)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender
              value={member.gender}
              onValueChange={(val) => handleChange("gender", val)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Bio</p>
            <Textarea
              value={member.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full text-sm"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Other Information */}
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Other Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Goal</p>
            <Textarea
              value={member.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
              className="w-full text-sm"
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Medical Notes</p>
            <Textarea
              value={member.medicalNotes}
              onChange={(e) => handleChange("medicalNotes", e.target.value)}
              className="w-full text-sm"
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-3 mb-3">
            <p>Routines Created</p>
            <Input
              value={member.routinesCreated}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled
            />
          </div>
          <div className="grid gap-3 mb-3">
            <p>Workout Saved</p>
            <Input
              value={member.workoutSaved}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled
            />
          </div>
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <AssignedTrainer
              availableTrainers={trainers}
              assignedTrainer={assignedTrainer}
              onAssignTrainer={handleAssignTrainer}
              onRemoveTrainer={handleRemoveTrainer}
              isEditing={isEditing}
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
      <div className="w-4/5 mx-auto mb-10">
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
}
