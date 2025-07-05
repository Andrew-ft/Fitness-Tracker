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
  const [fullNameError, setFullNameError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      setEmailError(null);
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setPasswordError(null);
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError(null);
    }

    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all errors at the start of submission
    setFullNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    let hasError = false;

    if (!fullName.trim()) {
      setFullNameError("This field is required.");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("This field is required.");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("This field is required.");
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("This field is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

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
        setFullNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);
        navigate("/login");
        return;
      }
    } catch (err: any) {
      console.log("Register error:", err.response?.data);
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Email already exists";

      setEmailError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Fill in your details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setFullNameError(null);
                  }}
                  aria-describedby="fullname-error"
                  aria-invalid={!!fullNameError}
                  className={cn(fullNameError && "")}
                />
                {fullNameError && (
                  <p
                    id="fullname-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {fullNameError}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  aria-describedby="email-error"
                  aria-invalid={!!emailError}
                  className={cn(emailError && "")}
                />
                {emailError && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  aria-describedby="password-error"
                  aria-invalid={!!passwordError}
                  className={cn(passwordError && "")}
                />
                {passwordError && (
                  <p
                    id="password-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(null);
                  }}
                  aria-describedby="confirm-password-error"
                  aria-invalid={!!confirmPasswordError}
                  className={cn(confirmPasswordError && "")}
                />
                {confirmPasswordError && (
                  <p
                    id="confirm-password-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary cursor-pointer">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}