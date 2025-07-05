import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";
import AdminDashboard from "./pages/admin-dashboard.tsx";
import TrainerDashboard from "./pages/trainer-dashboard.tsx";
import MemberDashboard from "./pages/member-dashboard.tsx";
import NotFound from "./pages/notFound.tsx";

import PrivateRoute from "./components/routing/PrivateRoute.tsx";

export default function RouteLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Role-protected dashboards */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainer-dashboard"
          element={
            <PrivateRoute allowedRoles={["trainer"]}>
              <TrainerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/member-dashboard"
          element={
            <PrivateRoute allowedRoles={["member"]}>
              <MemberDashboard />
            </PrivateRoute>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
