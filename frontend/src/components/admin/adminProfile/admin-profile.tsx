import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import API from "@/lib/axios";

import { motion } from "framer-motion";

type AdminProfileType = {
  userName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  role: string;
};

export default function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfileType>({
    userName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/admin/profile");
        if (res.status === 200) {
          setProfile(res.data.profile);
          setOriginalProfile(res.data.profile);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const res = await API.put("/admin/profile", {
        userName: profile.userName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
      });

      if (res.status === 200) {
        setProfile(res.data.profile);
        setOriginalProfile(res.data.profile);
        setIsEditing(false);
      }
    } catch (err: any) {
      console.error("Failed to update profile", err.response?.data || err);
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
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Profile</h1>
        <p className="text-sm opacity-50">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="mb-10 flex items-center justify-between w-4/5 mx-auto">
        <div>
          <h2 className="font-semibold text-lg">{profile.userName}</h2>
          <p className="text-sm opacity-50">{profile.role}</p>
        </div>
        <div>
          <Button onClick={handleEditClick} disabled={isEditing}>
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
        <div className="grid gap-3 mb-3">
          <p>Full Name</p>
          <Input
            id="fullname"
            type="text"
            disabled={!isEditing}
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            value={profile.userName}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-3 mb-3">
          <p>Email</p>
          <Input
            id="email"
            type="email"
            disabled={!isEditing}
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            value={profile.email}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-3 mb-3">
          <p>Phone Number</p>
          <Input
            id="phone"
            type="tel"
            disabled={!isEditing}
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            value={profile.phoneNumber}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />
        </div>

        <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
          <p>Bio</p>
          <Textarea
            id="bio"
            disabled={!isEditing}
            className={`w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            value={profile.bio || ""}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4 md:w-4/5 w-full mx-auto">
          <Button onClick={handleSaveClick} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      )}
    </motion.div>
  );
}
