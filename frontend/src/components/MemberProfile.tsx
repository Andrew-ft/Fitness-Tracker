import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, User, Calendar1, Mars, NotebookPen, Dumbbell, BicepsFlexed } from "lucide-react";

// Mock member data - replace with actual data fetching
const mockMemberData = {
  "1": {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "09000000000",
    dob: "1990-01-01",
    lastLogin: "2023-10-01 12:00:00",
    gender: "male",
    bio: "Short bio here",
    goal: "Fitness and health improvement",
    medicalNotes: "No known allergies",
    routinesCreated: 3,
    workoutSaved: 5,
    status: "Active",
    goals: ["Weight Loss", "Muscle Building", "Endurance"],
    assignedTrainer: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@gym.com",
      specialties: ["Strength Training", "Weight Loss"],
    },
  },
  "2": {
    id: "2",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "09000000000",
    dob: "1990-01-01",
    lastLogin: "2023-10-01 12:00:00",
    gender: "male",
    bio: "Short bio here",
    goal: "Fitness and health improvement",
    medicalNotes: "No known allergies",
    routinesCreated: 3,
    workoutSaved: 5,
    status: "Inactive",
    goals: ["Flexibility", "Yoga", "Stress Relief"],
    assignedTrainer: {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@gym.com",
      specialties: ["Yoga", "Flexibility"],
    },
  },
};

// --- helper to render badge styles ---
const renderStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <Badge className="bg-green-600 text-white hover:bg-green-700 text-xs">
          {status}
        </Badge>
      );
    case "inactive":
      return <Badge className="bg-secondary text-white ">{status}</Badge>;
    default:
      return (
        <Badge variant="secondary" className="text-xs">
          {status}
        </Badge>
      );
  }
};

const renderGoalBadge = (goal: string) => (
  <Badge className="bg-fitness-secondary/20 text-fitness-secondary border-fitness-secondary/30 text-xs">
    {goal}
  </Badge>
);

const renderSpecialtyBadge = (specialty: string) => (
  <Badge
    variant="outline"
    className="text-xs border-fitness-secondary/30 text-fitness-secondary"
  >
    {specialty}
  </Badge>
);

export default function TrainerMemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = mockMemberData[id as keyof typeof mockMemberData] || {
    id: id || "unknown",
    name: "Member Not Found",
    email: "N/A",
    phone: "N/A",
    membershipType: "N/A",
    joinDate: "N/A",
    status: "Unknown",
    goals: [],
    assignedTrainer: null,
  };

  const initials = member.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const joinDate = new Date(member.lastLogin).toLocaleDateString();

  return (
    <div className="">
      <div className="">
        {/* Member Profile Card */}
        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Member Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={undefined} alt={member.fullName} />
                <AvatarFallback className="bg-fitness-primary text-white text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {member.fullName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last Login Date: {member.lastLogin}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar1  className="h-4 w-4" />
                    <span>Date of Birth: {member.dob}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mars className="h-4 w-4" />
                    <span>Gender: {member.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <NotebookPen className="h-4 w-4" />
                    <span>Medical Notes: {member.medicalNotes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Dumbbell className="h-4 w-4" />
                    <span>Routines Created: {member.routinesCreated}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <BicepsFlexed className="h-4 w-4" />
                    <span>Workouts Saved: {member.workoutSaved}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {renderStatusBadge(member.status)}
                </div>
              </div>
            </div>

            {member.goals.length > 0 && (
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">
                  Fitness Goals
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.goals.map((goal, index) => (
                    <span key={index}>{renderGoalBadge(goal)}</span>
                  ))}
                </div>
              </div>
            )}

            {member.assignedTrainer && (
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">
                  Assigned Trainer
                </h3>
                <Card
                  className="cursor-pointer border-fitness-primary/20"
                  onClick={() =>
                    navigate(`/trainer/profile/${member.assignedTrainer?.id}`)
                  }
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-fitness-secondary text-white font-medium text-xs">
                          {member.assignedTrainer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">
                          {member.assignedTrainer.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {member.assignedTrainer.email}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.assignedTrainer.specialties.map(
                            (specialty, index) => (
                              <span key={index}>
                                {renderSpecialtyBadge(specialty)}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
