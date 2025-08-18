import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import API from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

type FieldErrors = {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFields = (
    updatedFields: Partial<{
      email: string;
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }>
  ) => {
    const errors: FieldErrors = { ...fieldErrors };

    if ("email" in updatedFields) {
      if (!updatedFields.email?.trim() || !validateEmail(updatedFields.email)) {
        errors.email = "Please enter a valid email.";
      } else {
        delete errors.email;
      }
    }

    if ("oldPassword" in updatedFields) {
      if (!updatedFields.oldPassword) {
        errors.oldPassword = "Old password is required.";
      } else {
        delete errors.oldPassword;
      }
    }

    if ("newPassword" in updatedFields) {
      if (!updatedFields.newPassword) {
        errors.newPassword = "New password is required.";
      } else if (updatedFields.newPassword.length < 6) {
        errors.newPassword = "New password must be at least 6 characters.";
      } else {
        delete errors.newPassword;
      }

      // Confirm password must also match the updated newPassword
      if (confirmPassword && updatedFields.newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      } else if (confirmPassword) {
        delete errors.confirmPassword;
      }
    }

    if ("confirmPassword" in updatedFields) {
      if (!updatedFields.confirmPassword) {
        errors.confirmPassword = "Please confirm your new password.";
      } else if (updatedFields.confirmPassword !== newPassword) {
        errors.confirmPassword = "Passwords do not match.";
      } else {
        delete errors.confirmPassword;
      }
    }

    setFieldErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateFields({ email, oldPassword, newPassword, confirmPassword });

    if (Object.keys(fieldErrors).length > 0) return;

    setLoading(true);
    setSuccessMessage(null);

    try {
      const res = await API.post("/auth/reset-password", {
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (res.status === 200) {
        setSuccessMessage("Password updated successfully. Redirecting...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setFieldErrors({ email: res.data?.error || "Something went wrong." });
      }
    } catch (err: any) {
      const backendErrors = err.response?.data?.errors;

      if (backendErrors && typeof backendErrors === "object") {
        const formattedErrors: FieldErrors = {};
        Object.entries(backendErrors).forEach(([key, value]) => {
          if (typeof value === "string") {
            formattedErrors[key as keyof FieldErrors] = value;
          } else if (value && typeof value === "object" && "msg" in value) {
            formattedErrors[key as keyof FieldErrors] = (
              value as { msg: string }
            ).msg;
          }
        });
        setFieldErrors(formattedErrors);
      } else {
        setFieldErrors({ email: err.response?.data?.error || "Reset failed." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Link to="/login">
            <ArrowLeft className="w-4 cursor-pointer" />
          </Link>
          <CardTitle>Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateFields({ email: e.target.value });
                  }}
                  placeholder="Enter your email"
                />
                {fieldErrors.email && (
                  <p className="text-sm text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              {/* Old Password */}
              <div className="grid gap-1.5">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    validateFields({ oldPassword: e.target.value });
                  }}
                  placeholder="Enter your old password"
                />
                {fieldErrors.oldPassword && (
                  <p className="text-sm text-red-500">
                    {fieldErrors.oldPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="grid gap-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    validateFields({ newPassword: e.target.value });
                  }}
                  placeholder="Enter new password"
                />
                {fieldErrors.newPassword && (
                  <p className="text-sm text-red-500">
                    {fieldErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateFields({ confirmPassword: e.target.value });
                  }}
                  placeholder="Confirm new password"
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Confirm"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
