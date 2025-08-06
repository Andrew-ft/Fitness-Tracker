import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import API from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string | null>>({
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  }, [email]);

  useEffect(() => {
    if (password && password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
    } else {
      setErrors((prev) => ({ ...prev, password: null }));
    }

    if (confirmPassword && password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors: typeof errors = {
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,
    };

    if (!fullName.trim()) {
      newErrors.fullName = "This field is required.";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "This field is required.";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "This field is required.";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "This field is required.";
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setLoading(true);
    try {
      const res = await API.post("/auth/register", {
        fullName,
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({ fullName: null, email: null, password: null, confirmPassword: null });
        navigate("/login");
      }
    } catch (err: any) {
      console.log("Register error:", err.response?.data);

      const backendError = err.response?.data?.errors;
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";

      const newErrors = { ...errors };

      if (backendError) {
        for (const key in backendError) {
          newErrors[key] = backendError[key]?.msg || backendError[key];
        }
      } else if (typeof backendMessage === "string") {
        newErrors.email = backendMessage;
      }

      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Fill in your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="grid gap-3">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: null }));
                  }}
                  aria-describedby="fullname-error"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p id="fullname-error" className="text-red-500 text-sm" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  aria-describedby="email-error"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  aria-describedby="password-error"
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }}
                  aria-describedby="confirm-password-error"
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="text-red-500 text-sm" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary cursor-pointer">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
