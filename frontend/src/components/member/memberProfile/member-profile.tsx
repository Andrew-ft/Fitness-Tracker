import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar1,
  Mars,
  NotebookPen,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar28 } from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import API from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [activeSection, setActiveSection] = useState<
    "profile" | "savedRoutines" | "savedWorkouts"
  >("profile");

  const [savedRoutines, setSavedRoutines] = useState<any[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [goal, setGoal] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mapTrainer = (trainer: any) => {
    if (!trainer) return null;
    return {
      id: trainer.user?.userId || 0,
      fullName: trainer.user?.userName || "N/A",
      specialization: trainer.specialization || "N/A",
      experienceYears: trainer.experiencedYears || 0,
      clientsAssigned: trainer.members?.length || 0,
    };
  };

  const fetchMember = async () => {
    try {
      const res = await API.get("/member/profile");
      const data = res.data.profile;

      setMemberData({
        userId: data.user.userId,
        userName: data.user.userName,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        dateOfBirth: data.user.dateOfBirth?.split("T")[0] || "",
        gender: data.user.gender,
        bio: data.user.bio,
        goal: data.goal || "",
        medicalNotes: data.medicalNotes || "",
        assignedTrainer: mapTrainer(data.trainer),
      });

      setFullName(data.user.userName);
      setEmail(data.user.email);
      setPhone(data.user.phoneNumber);
      setDob(data.user.dateOfBirth?.split("T")[0] || "");
      setGender(data.user.gender);
      setBio(data.user.bio);
      setGoal(data.goal || "");
      setMedicalNotes(data.medicalNotes || "");
    } catch (error: any) {
      console.error("Failed to fetch member:", error);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const handleCancelClick = () => {
    if (!memberData) return;
    setFullName(memberData.userName);
    setEmail(memberData.email);
    setPhone(memberData.phoneNumber);
    setDob(memberData.dateOfBirth);
    setGender(memberData.gender);
    setBio(memberData.bio);
    setGoal(memberData.goal);
    setMedicalNotes(memberData.medicalNotes);

    setErrors({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const res = await API.put("/member/profile", {
        userName: fullName,
        email,
        phoneNumber: phone,
        dateOfBirth: dob,
        gender,
        bio,
        goal,
        medicalNotes,
      });

      const data = res.data.profile;

      setMemberData({
        userId: data.user.userId,
        userName: data.user.userName,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        dateOfBirth: data.user.dateOfBirth?.split("T")[0] || "",
        gender: data.user.gender,
        bio: data.user.bio,
        goal: data.goal || "",
        medicalNotes: data.medicalNotes || "",
        assignedTrainer: mapTrainer(data.trainer),
      });

      setIsEditing(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
    }
  };

  const fetchSavedRoutines = async () => {
    try {
      setLoadingSaved(true);
      const res = await API.get("/routine/saved/me");
      setSavedRoutines(res.data.saved || []);
    } catch (error: any) {
      console.error("Failed to fetch saved routines:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  const fetchSavedWorkouts = async () => {
    try {
      setLoadingSaved(true);
      const res = await API.get("/workout/saved/me");
      setSavedWorkouts(res.data.saved || []);
    } catch (error: any) {
      console.error("Failed to fetch saved workouts:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  if (!memberData) return <p>Loading...</p>;

  const initials = memberData.userName
    ? memberData.userName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "NA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-10">
        <div className="mb-5">
          <h1 className="font-semibold text-2xl">Profile</h1>
          <p className="text-sm opacity-50">
            View your personal information and assigned trainer
          </p>
        </div>

        <div className="mb-10 flex items-center justify-between w-4/5 mx-auto">
          <div>
            <h2 className="font-semibold text-lg">{memberData.userName}</h2>
            <p className="text-sm opacity-50">Member Profile</p>
          </div>

          {!isEditing && (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              <Button
                variant={
                  activeSection === "savedRoutines" ? "default" : "outline"
                }
                onClick={() => {
                  setActiveSection("savedRoutines");
                  fetchSavedRoutines();
                }}
              >
                Saved Routines
              </Button>
              <Button
                variant={
                  activeSection === "savedWorkouts" ? "default" : "outline"
                }
                onClick={() => {
                  setActiveSection("savedWorkouts");
                  fetchSavedWorkouts();
                }}
              >
                Saved Workouts
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeSection === "profile" && !isEditing && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="md:w-5/6 w-full mx-auto">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Member Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-fitness-primary text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl font-semibold">
                        {memberData.userName}
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{memberData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{memberData.phoneNumber || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar1 className="h-4 w-4" />
                          <span>DOB: {memberData.dateOfBirth || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Mars className="h-4 w-4" />
                          <span>Gender: {memberData.gender || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <NotebookPen className="h-4 w-4" />
                          <span>Goal: {memberData.goal || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Dumbbell className="h-4 w-4" />
                          <span>
                            Medical Notes: {memberData.medicalNotes || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Bio</h3>
                    <p className="text-sm">{memberData.bio || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "savedRoutines" && (
            <motion.div
              key="savedRoutines"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="md:w-5/6 w-full mx-auto space-y-4">
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection("profile")}
                  >
                    Back to Profile
                  </Button>
                </div>
                {loadingSaved ? (
                  <p>Loading...</p>
                ) : savedRoutines.length === 0 ? (
                  <p>No saved routines</p>
                ) : (
                  savedRoutines.map((r) => (
                    <Card
                      key={r.routineId}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() =>
                        navigate(`/member/routines/${r.routineId}`)
                      }
                    >
                      <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">
                          {r.routine?.routineName || r.routineName}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          Difficulty: {r.routine?.difficulty || r.difficulty}
                        </span>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          Duration: {r.routine?.duration || r.duration} min
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeSection === "savedWorkouts" && (
            <motion.div
              key="savedWorkouts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="md:w-5/6 w-full mx-auto space-y-4">
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection("profile")}
                  >
                    Back to Profile
                  </Button>
                </div>
                {loadingSaved ? (
                  <p>Loading...</p>
                ) : savedWorkouts.length === 0 ? (
                  <p>No saved workouts</p>
                ) : (
                  savedWorkouts.map((w) => (
                    <Card
                      key={w.workoutId}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() =>
                        navigate(`/member/workouts/${w.workoutId}`)
                      }
                    >
                      <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">
                          {w.workout?.workoutName || w.workoutName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Muscle Group: {w.workout?.muscleGroup || w.muscleGroup}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isEditing && (
          <div className="md:w-5/6 w-full mx-auto p-6 mt-5">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2 md:w-4/5">
                <p>Full Name</p>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="grid gap-2 md:w-4/5">
                <p>Email</p>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2 md:w-4/5">
                <p>Phone Number</p>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <p>Date of Birth</p>
                <div className="md:w-4/5 w-full text-sm">
                  <Calendar28 value={dob} onChange={setDob} />
                </div>
              </div>

              <div className="grid gap-2 md:w-4/5">
                <p>Gender</p>
                <Input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 grid gap-2">
                <p>Bio</p>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 grid gap-2">
                <p>Goal</p>
                <Textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 grid gap-2">
                <p>Medical Notes</p>
                <Textarea
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Card className="md:w-5/6 w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Assigned Trainer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h2 className="text-xl font-semibold">
              {memberData.assignedTrainer?.fullName || "N/A"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Specialization: {memberData.assignedTrainer?.specialization}
            </p>
            <p className="text-sm text-muted-foreground">
              Experience: {memberData.assignedTrainer?.experienceYears} years
            </p>
            <p className="text-sm text-muted-foreground">
              Clients Assigned: {memberData.assignedTrainer?.clientsAssigned}
            </p>

            {memberData.assignedTrainer && (
              <Button
                className="mt-2"
                onClick={() => navigate(`/member/profile/trainer`)}
              >
                View Trainer Profile
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
