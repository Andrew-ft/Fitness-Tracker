import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectTrainer } from "../../selectTrainer";
import { SelectGender } from "../../selectGender";
import API from "@/lib/axios";
import { motion } from "framer-motion";

export default function AdminAddMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bio: "",
    trainer: "",
    goal: "",
    medicalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (field: string, value: string) => {
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
    if (!formData.goal.trim()) newErrors.goal = "Goal is required";
    if (!formData.trainer.trim()) newErrors.trainer = "Trainer is required";
    if (!formData.medicalNotes.trim())
      newErrors.medicalNotes = "Medical Notes are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess("");

    try {
      await API.post("/admin/members", {
        userName: formData.fullname,
        email: formData.email,
        password: "password123",
        dateOfBirth: formData.dob,
        gender: formData.gender,
        phoneNumber: formData.phone,
        bio: formData.bio,
        goal: formData.goal,
        medicalNotes: formData.medicalNotes,
        trainerId: Number(formData.trainer),
      });

      setSuccess("Member created successfully!");
      setTimeout(() => navigate("/admin/members"), 1200);
    } catch (err: any) {
      console.error(err);
      setErrors({
        ...errors,
        form: err.response?.data?.error || "Failed to create member",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-5 mb-5">
        <Link to="/admin/members">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>

        <div>
          <h1 className="font-semibold text-xl">Add New Member</h1>
          <p className="text-sm opacity-50">Create a new member profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="my-5 font-semibold text-lg flex w-5/6 mx-auto">
          Personal Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          {/* Full Name */}
          <div className="grid gap-3 mb-3">
            <p>Full Name</p>
            <Input
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="Name"
              value={formData.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              type="email"
              className="md:w-4/5 w-full text-sm"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-3 mb-3">
            <p>Phone Number</p>
            <Input
              type="tel"
              className="md:w-4/5 w-full text-sm"
              placeholder="09000000000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* DOB */}
          <div className="grid gap-3 mb-3">
            <p>Date of Birth</p>
            <div className="md:w-4/5 w-full text-sm">
              <Calendar28
                value={formData.dob}
                onChange={(val: string) => handleChange("dob", val)}
              />
            </div>
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender
              value={formData.gender}
              onValueChange={(val: string) => handleChange("gender", val)}
              error={errors.gender}
            />
          </div>

          {/* Bio */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Bio</p>
            <Textarea
              placeholder="Write a short bio about the member"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>

          {/* Goal */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Goal</p>
            <Textarea
              placeholder="Write member's goals"
              value={formData.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
            />
            {errors.goal && (
              <p className="text-red-500 text-sm">{errors.goal}</p>
            )}
          </div>

          {/* Medical Notes */}
          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10">
            <p>Medical Notes</p>
            <Textarea
              placeholder="Medical Notes"
              value={formData.medicalNotes}
              onChange={(e) => handleChange("medicalNotes", e.target.value)}
            />
            {errors.medicalNotes && (
              <p className="text-red-500 text-sm">{errors.medicalNotes}</p>
            )}
          </div>

          {/* Trainer */}
          <div className="grid gap-3 mb-3 md:col-span-2">
            <p>Assigned Trainer</p>
            <SelectTrainer
              value={formData.trainer || undefined}
              onValueChange={(val: string) => handleChange("trainer", val)}
              error={errors.trainer}
            />
          </div>
        </div>

        {errors.form && (
          <p className="text-red-500 text-center mt-3 font-semibold">
            {errors.form}
          </p>
        )}

        <div className="flex gap-4 w-4/5 mx-auto">
          <Button disabled={loading}>
            {loading ? "Creating..." : "Create New Member"}
          </Button>
        </div>

        {success && (
          <p className="text-green-600 text-center mt-3 font-semibold">
            {success}
          </p>
        )}
      </form>
    </motion.div>
  );
}
