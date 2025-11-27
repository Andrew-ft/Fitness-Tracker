import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { SelectSpecialization } from "../../selectSpecialization";
import { SelectClientTypes } from "../../selectClientTypes";
import { AssignedMembers } from "@/components/AssignedMember";
import API from "@/lib/axios";
import type { Member } from "../../../type.ts";
import { motion } from "framer-motion";

export default function AdminTrainerDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [trainer, setTrainer] = useState<any>(null);
  const [assignedMembers, setAssignedMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!id) return;
    API.get(`/admin/trainers/${id}`)
      .then((res) => {
        if (res.data.success) {
          const t = res.data.trainer;
          setTrainer({
            fullName: t.user.userName || "",
            email: t.user.email || "",
            phone: t.user.phoneNumber || "",
            dob: t.user.dateOfBirth?.split("T")[0] || "",
            lastLogin: t.user.lastLogin || "",
            gender: t.user.gender || "male",
            bio: t.user.bio || "",
            certificate: t.certificate || "",
            specialization: t.specialization || "",
            experiencedYears: t.experiencedYears || "",
            clientTypes: t.clientTypes || [],
            clientsAssigned: t.members.length || 0,
            routinesCreated: t.routines?.length || 0,
            trainerId: t.trainerId,
            userId: t.user.userId,
          });
          setAssignedMembers(
            t.members.map((m: any) => ({
              id: m.memberId,
              name: m.user.userName || "",
              email: m.user.email || "",
              avatar: "",
            }))
          );
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAssignMember = async (member: Member) => {
    try {
      if (!trainer) return;
      await API.put(`/admin/members/${member.id}/assign-trainer`, {
        trainerId: trainer.trainerId,
      });
      setAssignedMembers((prev) => [...prev, member]);
      setTrainer((prev: { clientsAssigned: number }) => ({
        ...prev,
        clientsAssigned: prev.clientsAssigned + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await API.put(`/admin/members/${memberId}/assign-trainer`, {
        trainerId: null,
      });
      setAssignedMembers((prev) => prev.filter((m) => m.id !== memberId));
      setTrainer((prev: { clientsAssigned: number }) => ({
        ...prev,
        clientsAssigned: Math.max(0, prev.clientsAssigned - 1),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/admin/members/${memberId}`);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    if (!trainer) return;
    try {
      const dobIso = trainer.dob ? new Date(trainer.dob).toISOString() : null;

      const experiencedYears = Number(trainer.experiencedYears) || 0;

      let certificateValue: string | null = null;
      if (trainer.certificate) {
        certificateValue =
          trainer.certificate instanceof File
            ? trainer.certificate.name
            : trainer.certificate;
      }

      const assignedMemberIds = assignedMembers.map((m) => m.id);

      await API.put(`/admin/trainers/${trainer.trainerId}`, {
        certificate: certificateValue,
        specialization: trainer.specialization,
        experiencedYears: experiencedYears,
        clientTypes: trainer.clientTypes,
        assignedMembers: assignedMemberIds,
        user: {
          userName: trainer.fullName,
          email: trainer.email,
          phoneNumber: trainer.phone,
          gender: trainer.gender,
          bio: trainer.bio,
          dateOfBirth: dobIso,
        },
      });

      setIsEditing(false);
      navigate("/admin/trainers");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setTrainer((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!trainer) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-5 mb-5">
          <div>
            <Link to="/admin/trainers">
              <Button variant="outline">
                <ArrowLeft />
                Back
              </Button>
            </Link>
          </div>
          {!isEditing && <Button onClick={handleEdit}>Edit Profile</Button>}
        </div>

        {/* Personal Information */}
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Full Name</p>
            <Input
              value={trainer.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              type="text"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              value={trainer.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Phone Number</p>
            <Input
              value={trainer.phone || ""}
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
                value={trainer.dob || ""}
                onChange={(val) => handleChange("dob", val)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender
              value={trainer.gender || "male"}
              onValueChange={(val) => handleChange("gender", val)}
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Bio</p>
            <Textarea
              value={trainer.bio || ""}
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
              value={trainer.specialization || ""}
              onChange={(val) => handleChange("specialization", val)}
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Experience Years</p>
            <Input
              value={trainer.experiencedYears || ""}
              onChange={(e) => handleChange("experiencedYears", e.target.value)}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Clients Type Served</p>
            <SelectClientTypes
              value={trainer.clientTypes || []}
              onChange={(val) => handleChange("clientTypes", val)}
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
              value={trainer.clientsAssigned || 0}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Routines Created</p>
            <Input
              value={trainer.routinesCreated || 0}
              type="number"
              className="md:w-4/5 w-full text-sm"
              disabled
            />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 full">
            <AssignedMembers
              availableMembers={[]}
              assignedMembers={assignedMembers}
              onAssignMember={isEditing ? handleAssignMember : () => {}}
              onRemoveMember={isEditing ? handleRemoveMember : () => {}}
              onMemberClick={handleMemberClick}
              isEditing={isEditing}
              trainerId={trainer?.trainerId?.toString() || ""}
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
    </motion.div>
  );
}
