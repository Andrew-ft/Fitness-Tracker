import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";
import NotFound from "./pages/notFound.tsx";

import AdminPage from "./pages/admin-page.tsx";
import AdminDashboard from "./components/admin-dashboard.tsx";
import AdminWorkout from "./components/admin-workout.tsx";
import AdminRoutines from "./components/admin-routines.tsx";
import AdminMembers from "./components/admin-member.tsx";
import AdminTrainers from "./components/admin-trainer.tsx";
import AdminProfile from "./components/admin-profile.tsx";

import TrainerDashboard from "./components/trainer-dashboard.tsx";
import TrainerWorkout from "./components/trainer.workout.tsx";
import TrainerRoutines from "./components/trainer-routine.tsx";
import TrainerMembers from "./components/trainer-member.tsx";
import TrainerProfile from "./components/trainer-profile.tsx";

import MemberDashboard from "./pages/member-dashboard.tsx";
import MemberWorkout from "./pages/member-workout.tsx";
import MemberRoutines from "./pages/member-routine.tsx";
import MemberProfile from "./pages/member-profile.tsx";

import PrivateRoute from "./components/routing/PrivateRoute.tsx";
import TrainerPage from "./pages/trainer-page.tsx";
import MemberPage from "./pages/member-page.tsx";

export default function RouteLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="workouts" element={<AdminWorkout />} />
          <Route path="routines" element={<AdminRoutines />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Trainer Dashboard */}
        <Route
          path="/trainer"
          element={
            <PrivateRoute allowedRoles={["trainer"]}>
              <TrainerDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<TrainerPage />} />
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="workout" element={<TrainerWorkout />} />
          <Route path="routines" element={<TrainerRoutines />} />
          <Route path="members" element={<TrainerMembers />} />
          <Route path="profile" element={<TrainerProfile />} />
        </Route>

        {/* Member Dashboard */}
        <Route
          path="/member"
          element={
            <PrivateRoute allowedRoles={["member"]}>
              <MemberDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<MemberPage />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="workout" element={<MemberWorkout />} />
          <Route path="routines" element={<MemberRoutines />} />
          <Route path="profile" element={<MemberProfile />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
