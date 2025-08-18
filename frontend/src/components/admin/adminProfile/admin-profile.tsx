import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function AdminProfile() {
  // Form state
  const [fullName, setFullName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [phone, setPhone] = useState("09000000000");
  const [bio, setBio] = useState("bio");

  // Backup of original data to revert on cancel
  const [originalData, setOriginalData] = useState({
    fullName,
    email,
    phone,
    bio,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    // Save current data snapshot on edit start
    setOriginalData({ fullName, email, phone, bio });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    // Revert to original data on cancel
    setFullName(originalData.fullName);
    setEmail(originalData.email);
    setPhone(originalData.phone);
    setBio(originalData.bio);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // TODO: Save logic here (e.g., API call)
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl">Profile</h1>
        <p className="text-sm opacity-50">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="mb-10 flex items-center justify-between w-4/5 mx-auto">
        <div>
          <h2 className="font-semibold text-lg">{fullName}</h2>
          <p className="text-sm opacity-50">Admin</p>
        </div>
        <div>
          <Button
            className="cursor-pointer"
            onClick={handleEditClick}
            disabled={isEditing}
          >
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
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            disabled={!isEditing}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="grid gap-3 mb-3">
          <p>Email</p>
          <Input
            id="email"
            type="email"
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            disabled={!isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-3 mb-3">
          <p>Phone Number</p>
          <Input
            id="phonenumber"
            type="tel"
            className={`md:w-4/5 w-full text-sm ${
              isEditing ? "opacity-100" : "opacity-75"
            }`}
            disabled={!isEditing}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid gap-3 mb-3">
          <p>Last Login Date</p>
          <Input
            id="date"
            type="text"
            className="md:w-4/5 w-full text-sm opacity-75"
            disabled
            value="2023-10-01 12:00:00"
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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4 md:w-4/5 w-full mx-auto">
          <Button onClick={handleSaveClick}>Save Changes</Button>
          <Button variant="outline" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
