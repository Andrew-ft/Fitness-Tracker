import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/lib/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar28 } from "../../DatePicker"; 
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import {
  Mail,
  Phone,
  Calendar1,
  Mars,
  NotebookPen,
  BicepsFlexed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";


const SPECIALIZATION_OPTIONS = [
  "Strength & Conditioning",
  "Bodybuilding",
  "Weight Loss",
  "HIIT",
  "Flexibility",
  "Sports Performance",
];

const CLIENT_TYPE_OPTIONS = [
  "General Population",
  "Athletes",
  "Beginners",
  "Seniors",
  "Women",
  "Youth",
];

const renderStatusBadge = (status: string) => (
  <Badge className="bg-green-600 text-white text-xs">{status}</Badge>
);

export default function TrainerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const [trainer, setTrainer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [certificate, setCertificate] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clientTypes, setClientTypes] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchProfile = async () => {
    try {
      const res = await API.get("/trainer/profile");
      const profile = res.data.profile;

      setTrainer(profile);

      setFullName(profile.user.userName || "");
      setEmail(profile.user.email || "");
      setPhone(profile.user.phoneNumber || "");
      setDob(profile.user.dateOfBirth?.slice(0, 10) || "");
      setRole(profile.user.role || "");
      setGender(profile.user.gender || "");
      setBio(profile.user.bio || "");
      setCertificate(profile.certificate || "");
      setSpecialization(profile.specialization || "");
      setClientTypes(profile.clientTypes || "");
    } catch (err) {
      console.error("Failed to fetch trainer profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const initials =
    fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "NA";

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!certificate.trim()) newErrors.certificate = "Certificate is required";
    if (!specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!clientTypes.trim())
      newErrors.clientTypes = "Client Types is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async () => {
    if (!validate()) return;

    try {
      const payload = {
        user: {
          userName: fullName,
          email,
          phoneNumber: phone,
          dateOfBirth: dob ? new Date(dob) : null,
          role,
          gender,
          bio,
        },
        certificate,
        specialization,
        clientTypes,
        experiencedYears: trainer?.experiencedYears || 0,
      };

      const res = await API.put("/trainer/profile", payload);
      setTrainer(res.data.profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };


  const handleCancelClick = () => {
    if (trainer) {
      setFullName(trainer.user.userName);
      setEmail(trainer.user.email);
      setPhone(trainer.user.phoneNumber);
      setDob(trainer.user.dateOfBirth?.slice(0, 10) || "");
      setGender(trainer.user.gender);
      setBio(trainer.user.bio);
      setCertificate(trainer.certificate);
      setSpecialization(trainer.specialization);
      setClientTypes(trainer.clientTypes);
    }

    setErrors({});
    setIsEditing(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!trainer)
    return <p className="text-center mt-10 text-red-500">Trainer not found.</p>;

  return (
         <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Profile</h1>
        <p className="text-sm opacity-50">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="mb-10 flex items-center justify-between w-4/5 mx-auto">
        <div>
          <h2 className="font-semibold text-lg">{fullName}</h2>
          <p className="text-sm opacity-50">{role}</p>
        </div>
        <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
          Edit Profile
        </Button>
      </div>

      {/*  VIEW MODE */}
      {!isEditing && (
        <Card className="md:w-5/6 w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Trainer Profile
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
                <h2 className="text-xl font-semibold">{fullName}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar1 className="h-4 w-4" />
                    <span>DOB: {dob}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mars className="h-4 w-4" />
                    <span>Gender: {gender}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <NotebookPen className="h-4 w-4" />
                    <span>Certificate: {certificate}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <BicepsFlexed className="h-4 w-4" />
                    <span>Experience: {trainer.experiencedYears} years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-semibold text-lg">Bio</h3>
              <p className="text-sm">{bio}</p>
            </div>

            {/* Specialization */}
            <div>
              <h3 className="font-semibold text-lg">Specialization</h3>
              <Badge className="bg-blue-100 text-blue-700 border">
                {specialization}
              </Badge>
            </div>

            {/* Client Types */}
            <div>
              <h3 className="font-semibold text-lg">Client Types</h3>
              <Badge className="bg-green-100 text-green-700 border">
                {clientTypes}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/*  EDIT MODE  */}
      {isEditing && (
        <div className="md:w-5/6 w-full mx-auto p-6 mt-5">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="grid gap-2 md:w-4/5">
              <p>Full Name</p>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {errors.fullName && <p className="text-red-600 text-xs">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="grid gap-2 md:w-4/5">
              <p>Email</p>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="grid gap-2 md:w-4/5">
              <p>Phone Number</p>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
            </div>

            {/* DOB */}
            <div className="grid gap-2">
              <p>Date of Birth</p>
              {/* ===== FIXED: Replaced Input type="date" with Calendar28 component ===== */}
              <div className="md:w-4/5 w-full text-sm">
                <Calendar28
                  value={dob}
                  onChange={(val) => setDob(val)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="grid gap-2 md:w-4/5">
              <p>Gender</p>
              <Input value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>

            {/* Certificate */}
            <div className="grid gap-2 md:w-4/5">
              <p>Certificate</p>
              <Input value={certificate} onChange={(e) => setCertificate(e.target.value)} />
              {errors.certificate && <p className="text-red-600 text-xs">{errors.certificate}</p>}
            </div>

            {/* Specialization */}
            <div className="grid gap-2">
              <p>Specialization</p>
              <Select onValueChange={setSpecialization} defaultValue={specialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALIZATION_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialization && (
                <p className="text-red-600 text-xs">{errors.specialization}</p>
              )}
            </div>

            {/* Client Types */}
            <div className="grid gap-2">
              <p>Client Types</p>
              <Select onValueChange={setClientTypes} defaultValue={clientTypes}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  {CLIENT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clientTypes && (
                <p className="text-red-600 text-xs">{errors.clientTypes}</p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2 grid gap-2 md:w-9/10">
              <p>Bio</p>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={handleSaveClick}>Save Changes</Button>
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      </div>
      </motion.div>
  );
}
