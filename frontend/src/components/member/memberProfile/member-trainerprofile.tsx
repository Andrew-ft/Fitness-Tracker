import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar1,
  Mars,
  NotebookPen,
  BicepsFlexed,
  ArrowLeft,
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
import API from "@/lib/axios";
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

export default function MemberTrainerProfile() {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [certificate, setCertificate] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clientTypes, setClientTypes] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchTrainer = async () => {
    try {
      const res = await API.get(`/member/trainer`);
      const data = res.data.trainer;

      setTrainer(data);
      setFullName(data.user.userName);
      setEmail(data.user.email);
      setPhone(data.user.phoneNumber);
      setDob(data.user.dateOfBirth?.split("T")[0] || "");
      setGender(data.user.gender);
      setCertificate(data.certificate);
      setSpecialization(data.specialization);
      setClientTypes(data.clientTypes);
      setBio(data.user.bio);
    } catch (err: any) {
      console.error("Error fetching trainer profile:", err);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!certificate.trim()) newErrors.certificate = "Certificate is required";
    if (!specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!clientTypes.trim()) newErrors.clientTypes = "Client Types is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        userName: fullName,
        email,
        phoneNumber: phone,
        dateOfBirth: dob,
        gender,
        bio,
        certificate,
        specialization,
        clientTypes,
      };

      const res = await API.put(`member/trainer`, payload);
      const updated = res.data.trainer;

      setTrainer(updated);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Error updating trainer:", err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  if (!trainer) {
    return <p>Loading trainer...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-semibold text-2xl">Trainer Profile</h1>
          <p className="text-sm opacity-50">
            View and edit your profile information
          </p>
        </div>

        <div className="mb-10 flex items-center gap-5  mx-auto">
          <div>
            <Link to="/member/profile">
              <Button variant="outline">
                <ArrowLeft /> Back
              </Button>
            </Link>
          </div>
          <div>
            <h2 className="font-semibold text-lg">{fullName}</h2>
            <p className="text-sm opacity-50">{clientTypes}</p>
          </div>
        </div>

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
                {isEditing ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{fullName}</h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    ) : (
                      <span>{email}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                      />
                    ) : (
                      <span>{phone}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar1 className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    ) : (
                      <span>DOB: {dob}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mars className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Gender"
                      />
                    ) : (
                      <span>Gender: {gender}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <NotebookPen className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={certificate}
                        onChange={(e) => setCertificate(e.target.value)}
                        placeholder="Certificate"
                      />
                    ) : (
                      <span>Certificate: {trainer.certificate}</span>
                    )}
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
              {isEditing ? (
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <p className="text-sm">{trainer.user.bio}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <h3 className="font-semibold text-lg">Specialization</h3>
              {isEditing ? (
                <Select
                  value={specialization}
                  onValueChange={(val) => setSpecialization(val)}
                >
                  <SelectTrigger className="w-full">
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
              ) : (
                <Badge className="bg-blue-100 text-blue-700 border">
                  {trainer.specialization}
                </Badge>
              )}
            </div>

            {/* Client Types */}
            <div>
              <h3 className="font-semibold text-lg">Client Types</h3>
              {isEditing ? (
                <Select
                  value={clientTypes}
                  onValueChange={(val) => setClientTypes(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select client types" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLIENT_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge className="bg-green-100 text-green-700 border">
                  {trainer.clientTypes}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
