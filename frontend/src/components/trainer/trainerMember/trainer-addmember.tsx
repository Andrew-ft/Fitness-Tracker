import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectTrainer } from "../../selectTrainer";
import { SelectGender } from "../../selectGender";
import { motion } from "framer-motion";

export default function TrainerAddMember() {
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
    if (!formData.trainer.trim())
      newErrors.trainer = "Assigned Trainer is required";
    if (!formData.goal.trim()) newErrors.goal = "Goal is required";
    if (!formData.medicalNotes.trim())
      newErrors.medicalNotes = "Medical Notes are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Member created:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <div className="flex items-center gap-5 mb-5">
          <div>
            <Link to="/trainer/members">
              <Button className="" variant="outline">
                <ArrowLeft />
                Back
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="font-semibold text-xl">Add New Member</h1>
            <p className="text-sm opacity-50">Create a new member profile</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-5 font-semibold text-lg flex  w-5/6 mx-auto">
            Personal Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
            <div className="grid gap-3 mb-3">
              <p>Full Name</p>
              <Input
                id="fullname"
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

            <div className="grid gap-3 mb-3">
              <p>Email</p>
              <Input
                id="email"
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

            <div className="grid gap-3 mb-3">
              <p>Phone Number</p>
              <Input
                id="phone"
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

            <div className="grid gap-3 mb-3">
              <p>Date of Birth</p>
              <div className="md:w-4/5 w-full text-sm">
                <Calendar28
                  value={formData.dob}
                  onChange={(val: string) => handleChange("dob", val)}
                />
              </div>
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}
            </div>

            <div className="grid gap-3 mb-3">
              <p>Gender</p>
              <SelectGender
                value={formData.gender}
                onValueChange={(val: string) => handleChange("gender", val)}
                error={errors.gender}
              />
            </div>

            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Bio</p>
              <Textarea
                id="bio"
                className="w-full text-sm"
                placeholder="Write a short bio about the trainer"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio}</p>
              )}
            </div>

            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Goal</p>
              <Textarea
                id="goal"
                className="w-full text-sm"
                placeholder="Write your goals"
                value={formData.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
              />
              {errors.goal && (
                <p className="text-red-500 text-sm">{errors.goal}</p>
              )}
            </div>

            <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
              <p>Medical Notes</p>
              <Textarea
                id="medNotes"
                className="w-full text-sm"
                placeholder="Medical Notes"
                value={formData.goal}
                onChange={(e) => handleChange("medicalNotes", e.target.value)}
              />
              {errors.medicalNotes && (
                <p className="text-red-500 text-sm">{errors.medicalNotes}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-4/5 mx-auto">
            <Button>Create New Member</Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
