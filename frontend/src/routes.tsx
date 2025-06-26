import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";
import Dashboard from "./pages/dashboard.tsx";
import NotFound from "./pages/notFound.tsx";
import AdminDashboard from "./components/admin-dashboard.tsx";
import TrainerDashboard from "./components/trainer-dashboard.tsx";
import MemberDashboard from "./components/member-dashboard.tsx";

export default function RouteLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="trainer" element={<TrainerDashboard />} />
          <Route path="member" element={<MemberDashboard />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for invalid roles */}
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all for other invalid paths */}
      </Routes>
    </BrowserRouter>
  );
}