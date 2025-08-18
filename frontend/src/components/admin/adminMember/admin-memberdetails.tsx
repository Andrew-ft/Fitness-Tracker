import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AssignedTrainer } from "@/components/AssignedTrainer";
import type { Member, Trainer } from "../../../type.ts";

const mockTrainers: Trainer[] = [
  { id: "1", name: "John Smith", email: "john.smith@email.com" },
  { id: "2", name: "Emma Wilson", email: "emma.wilson@email.com" },
  { id: "3", name: "Michael Brown", email: "michael.brown@email.com" },
];

export default function AdminMemberDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [assignedTrainer, setAssignedTrainer] = useState<Trainer | null>(
    mockTrainers[0] // optionally pre-assign
  );

  // Example member initial state
  const [member, setMember] = useState({
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
    wokroutSaved: 5,
  });

  const handleAssignTrainer = (trainer: Trainer) => {
    setAssignedTrainer(trainer);
  };

  const handleRemoveTrainer = () => {
    setAssignedTrainer(null);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // Save logic here, e.g., send member state to API
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/admin/members">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        {!isEditing && (
          <div>
            <Button onClick={handleEdit}>Edit Profile</Button>
          </div>
        )}
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
            <p>Last Login Date</p>
            <Input
              value={member.lastLogin}
              type="text"
              className="md:w-4/5 w-full text-sm"
              disabled
            />
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

        {/* other information */}
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
              onChange={(e) => handleChange("Medical Notes", e.target.value)}
              className="w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Routines Created</p>
            <Input
              value={member.routinesCreated}
              onChange={(e) => handleChange("routinesCreated", e.target.value)}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Workout Saved</p>
            <Input
              value={member.wokroutSaved}
              onChange={(e) => handleChange("workoutSaved", e.target.value)}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          {/* Assigned Trainer */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <AssignedTrainer
              availableTrainers={mockTrainers}
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
    </div>
  );
}
