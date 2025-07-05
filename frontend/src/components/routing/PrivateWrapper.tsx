import { Navigate } from "react-router-dom";

interface PrivateWrapperProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function PrivateWrapper({
  children,
  allowedRoles,
}: PrivateWrapperProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
