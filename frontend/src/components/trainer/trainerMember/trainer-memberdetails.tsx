import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { AssignedTrainer } from "@/components/AssignedTrainer";
import type { Trainer } from "../../../type.ts";
import MemberProfile from "@/components/MemberProfile.tsx";

const mockTrainers: Trainer[] = [
  { id: "1", name: "John Smith", email: "john.smith@email.com" },
  { id: "2", name: "Emma Wilson", email: "emma.wilson@email.com" },
  { id: "3", name: "Michael Brown", email: "michael.brown@email.com" },
];

export default function TrainerMemberDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [assignedTrainer, setAssignedTrainer] = useState<Trainer | null>(
    mockTrainers[0]
  );

  // original persisted member data
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
    workoutSaved: 5,
  });

  // temporary copy for editing
  const [draft, setDraft] = useState(member);

  const handleAssignTrainer = (trainer: Trainer) => {
    setAssignedTrainer(trainer);
  };

  const handleRemoveTrainer = () => {
    setAssignedTrainer(null);
  };

  const handleEdit = () => {
    setDraft(member); // copy current member into draft before editing
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft(member); // reset draft
  };

  const handleSave = () => {
    setMember(draft); // persist changes
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <Link to="/trainer/members">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        {!isEditing && (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </div>

      {/* Show Profile when not editing */}
      {!isEditing && (
        <div className="md:w-5/6 w-full mx-auto">
          <MemberProfile />
        </div>
      )}

      {/* Show form when editing */}
      {isEditing && (
        <form>
          <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
            Personal Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            <div className="grid gap-3 mb-3">
              <p>Full Name</p>
              <Input
                value={draft.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                type="text"
                className="md:w-4/5 w-full text-sm"
              />
            </div>
            <div className="grid gap-3 mb-3">
              <p>Email</p>
              <Input
                value={draft.email}
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                className="md:w-4/5 w-full text-sm"
              />
            </div>
            <div className="grid gap-3 mb-3">
              <p>Phone Number</p>
              <Input
                value={draft.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                type="tel"
                className="md:w-4/5 w-full text-sm"
              />
            </div>
            <div className="grid gap-3 mb-3">
              <p>Date of Birth</p>
              <div className="md:w-4/5 w-full text-sm">
                <Calendar28
                  value={draft.dob}
                  onChange={(val) => handleChange("dob", val)}
                />
              </div>
            </div>
            <div className="grid gap-3 mb-3">
              <p>Last Login Date</p>
              <Input
                value={draft.lastLogin}
                type="text"
                className="md:w-4/5 w-full text-sm"
                disabled
              />
            </div>
            <div className="grid gap-3 mb-3">
              <p>Gender</p>
              <SelectGender
                value={draft.gender}
                onValueChange={(val) => handleChange("gender", val)}
              />
            </div>
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Bio</p>
              <Textarea
                value={draft.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* other info */}
          <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
            Other Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Goal</p>
              <Textarea
                value={draft.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
                className="w-full text-sm"
              />
            </div>
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Medical Notes</p>
              <Textarea
                value={draft.medicalNotes}
                onChange={(e) => handleChange("medicalNotes", e.target.value)}
                className="w-full text-sm"
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Routines Created</p>
              <Input
                value={draft.routinesCreated}
                onChange={(e) => handleChange("routinesCreated", e.target.value)}
                type="number"
                className="md:w-4/5 w-full text-sm"
              />
            </div>

            <div className="grid gap-3 mb-3">
              <p>Workout Saved</p>
              <Input
                value={draft.workoutSaved}
                onChange={(e) => handleChange("workoutSaved", e.target.value)}
                type="number"
                className="md:w-4/5 w-full text-sm"
              />
            </div>

            {/* Assigned Trainer */}
            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <AssignedTrainer
                availableTrainers={mockTrainers}
                assignedTrainer={assignedTrainer}
                onAssignTrainer={handleAssignTrainer}
                onRemoveTrainer={handleRemoveTrainer}
                isEditing={true}
              />
            </div>
          </div>

          <div className="flex gap-4 w-4/5 mx-auto">
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
