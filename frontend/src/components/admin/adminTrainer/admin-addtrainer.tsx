import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";

import API from "@/lib/axios";
import { SelectGender } from "../../selectGender";

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

export default function AdminAddTrainer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bio: "",
    certificate: "",
    experience: "",
    specialization: "",
    clientType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.certificate.trim())
      newErrors.certificate = "Certificate is required";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.clientType.trim())
      newErrors.clientType = "Client Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        userName: formData.fullname,
        email: formData.email,
        phoneNumber: formData.phone,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        bio: formData.bio,
        certificate: formData.certificate,
        experiencedYears: Number(formData.experience),
        specialization: formData.specialization,
        clientTypes: formData.clientType,
        password: "defaultpassword123",
      };

      const response = await API.post("/admin/trainers", payload);

      if (response.data.success) {
        navigate("/admin/trainers");
      } else {
        setErrors({ form: response.data.error || "Failed to create trainer" });
      }
    } catch (err: any) {
      console.error(err);
      setErrors({ form: err.response?.data?.error || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/admin/trainers">
            <Button variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Add New Trainer</h1>
          <p className="text-sm opacity-50">Create a new trainer profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Info Section */}
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Full Name */}
          <div className="grid gap-3 md:w-4/5">
            <p>Full Name</p>
            <Input
              value={formData.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-3 md:w-4/5">
            <p>Email</p>
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-3 md:w-4/5">
            <p>Phone Number</p>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* DOB */}
          <div className="grid gap-3 md:w-4/5">
            <p>Date of Birth</p>
            <Calendar28
              value={formData.dob}
              onChange={(val: string) => handleChange("dob", val)}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="grid gap-3 ">
            <p>Gender</p>
            <SelectGender
              value={formData.gender}
              onValueChange={(val: string) => handleChange("gender", val)}
              error={errors.gender}
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2 grid gap-3 md:w-9/10">
            <p>Bio</p>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>
        </div>

        {/* Qualification Section */}
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Qualification
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Certificate */}
          <div className="grid gap-3 md:w-4/5">
            <p>Certificate</p>
            <Input
              type="file"
              onChange={(e) => handleChange("certificate", e.target.value)}
            />
            {errors.certificate && (
              <p className="text-red-500 text-sm">{errors.certificate}</p>
            )}
          </div>

          {/* Specialization */}
          <div className="grid gap-3 md:w-4/5">
            <p>Specialization</p>
            <Select
              value={formData.specialization}
              onValueChange={(val) => handleChange("specialization", val)}
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
            {errors.specialization && (
              <p className="text-red-500 text-sm">{errors.specialization}</p>
            )}
          </div>

          {/* Experience */}
          <div className="grid gap-3 md:w-4/5">
            <p>Experience Years</p>
            <Input
              value={formData.experience}
              type="number"
              onChange={(e) => handleChange("experience", e.target.value)}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience}</p>
            )}
          </div>

          {/* Client Type */}
          <div className="grid gap-3 md:w-4/5">
            <p>Clients Type Served</p>
            <Select
              value={formData.clientType}
              onValueChange={(val) => handleChange("clientType", val)}
            >
              <SelectTrigger className="w-full">
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
            {errors.clientType && (
              <p className="text-red-500 text-sm">{errors.clientType}</p>
            )}
          </div>
        </div>

        {/* FORM ERROR */}
        {errors.form && (
          <p className="text-red-500 text-sm w-4/5 mx-auto mb-3">
            {errors.form}
          </p>
        )}

        <div className="flex gap-4 w-4/5 mx-auto">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create New Trainer"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
