import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { SelectSpecialization } from "../../selectSpecialization";
import { SelectClientTypes } from "../../selectClientTypes";
import { AssignedMembers } from "@/components/AssignedMember";
import type { Member } from "../../../type.ts";

const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatar: "",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    avatar: "",
  },
  {
    id: "4",
    name: "Lisa Davis",
    email: "lisa.davis@email.com",
    avatar: "",
  },
  {
    id: "5",
    name: "David Miller",
    email: "david.miller@email.com",
    avatar: "",
  },
  {
    id: "6",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@email.com",
    avatar: "",
  },
  {
    id: "7",
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    avatar: "",
  },
  {
    id: "8",
    name: "Sarah Taylor",
    email: "sarah.taylor@email.com",
    avatar: "",
  },
];

export default function AdminTrainerDetails() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Example trainer initial state
  const [trainer, setTrainer] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "09000000000",
    dob: "1990-01-01",
    lastLogin: "2023-10-01 12:00:00",
    gender: "male",
    bio: "Short bio here",
    certificate: "",
    specialization: "Strength & Conditioning Specializations",
    experienceYears: 5,
    clientTypes: "General Population",
    clientsAssigned: 3,
    routinesCreated: 3,
  });

  const [assignedMembers, setAssignedMembers] = useState([
    mockMembers[0], // Pre-assign some members for demo
    mockMembers[1],
  ]);

  function toast(_arg0: {
    title: string;
    description: string;
    variant: string;
  }) {
    throw new Error("Function not implemented.");
  }

  const handleAssignMember = (member: Member) => {
    setAssignedMembers((prev) => [...prev, member]);
    setTrainer((prev) => ({
      ...prev,
      clientsAssigned: prev.clientsAssigned + 1,
    }));
    toast({
      title: "Member Assigned",
      description: `${member.name} has been assigned to ${trainer.fullName}`,
      variant: "",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    const member = assignedMembers.find((m) => m.id === memberId);
    setAssignedMembers((prev) => prev.filter((m) => m.id !== memberId));
    // Update clients assigned count
    setTrainer((prev) => ({
      ...prev,
      clientsAssigned: Math.max(0, prev.clientsAssigned - 1),
    }));
    if (member) {
      toast({
        title: "Member Removed",
        description: `${member.name} has been removed from ${trainer.fullName}'s assigned members`,
        variant: "destructive",
      });
    }
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/admin/members/${memberId}`);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // Save logic here, e.g., send trainer state to API
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setTrainer((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/admin/trainers">
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

      {/* Personal Information */}
      <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
        Personal Information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
        <div className="grid gap-3 mb-3">
          <p>Full Name</p>
          <Input
            value={trainer.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            type="text"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Email</p>
          <Input
            value={trainer.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Phone Number</p>
          <Input
            value={trainer.phone}
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
              value={trainer.dob}
              onChange={(val) => handleChange("dob", val)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="grid gap-3 mb-3">
          <p>Last Login Date</p>
          <Input
            value={trainer.lastLogin}
            type="text"
            className="md:w-4/5 w-full text-sm"
            disabled
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Gender</p>
          <SelectGender
            value={trainer.gender}
            onValueChange={(val) => handleChange("gender", val)}
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
          <p>Bio</p>
          <Textarea
            value={trainer.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full text-sm"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Qualification */}
      <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
        Qualification
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
        <div className="grid gap-3 mb-3">
          <p>Certificate</p>
          <Input
            type="file"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
            onChange={(e) => handleChange("certificate", e.target.files?.[0])}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Specialization</p>
          <SelectSpecialization
            value={trainer.specialization}
            onValueChange={(val) => handleChange("specialization", val)}
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Experience Years</p>
          <Input
            value={trainer.experienceYears}
            onChange={(e) => handleChange("experienceYears", e.target.value)}
            type="number"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Clients Type Served</p>
          <SelectClientTypes
            value={trainer.clientTypes}
            onValueChange={(val) => handleChange("clientTypes", val)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Other Information */}
      <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
        Other Information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
        <div className="grid gap-3 mb-3">
          <p>Clients Assigned</p>
          <Input
            value={trainer.clientsAssigned}
            onChange={(e) => handleChange("clientsAssigned", e.target.value)}
            type="number"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
          />
        </div>
        <div className="grid gap-3 mb-3">
          <p>Routines Created</p>
          <Input
            value={trainer.routinesCreated}
            onChange={(e) => handleChange("routinesCreated", e.target.value)}
            type="number"
            className="md:w-4/5 w-full text-sm"
            disabled={!isEditing}
          />
        </div>
              {/* Assigned Trainer */}
      {/* <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Assigned Trainer
        </div> */}
      <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 full">
        <AssignedMembers
          availableMembers={mockMembers}
          assignedMembers={assignedMembers}
          onAssignMember={isEditing ? handleAssignMember : () => {}}
          onRemoveMember={isEditing ? handleRemoveMember : () => {}}
          onMemberClick={handleMemberClick}
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
    </div>
  );
}
