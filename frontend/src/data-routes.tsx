import { createBrowserRouter } from "react-router-dom";

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

import PrivateWrapper from "./components/routing/PrivateWrapper.tsx";
import TrainerPage from "./pages/trainer-page.tsx";
import MemberPage from "./pages/member-page.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <PrivateWrapper allowedRoles={["admin"]}>
        <AdminPage />
      </PrivateWrapper>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "workouts", element: <AdminWorkout /> },
      { path: "routines", element: <AdminRoutines /> },
      { path: "members", element: <AdminMembers /> },
      { path: "trainers", element: <AdminTrainers /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
  {
    path: "/trainer",
    element: (
      <PrivateWrapper allowedRoles={["trainer"]}>
        <TrainerPage />
      </PrivateWrapper>
    ),
    children: [
      { index: true, element: <TrainerDashboard /> },
      { path: "dashboard", element: <TrainerDashboard /> },
      { path: "workout", element: <TrainerWorkout /> },
      { path: "routines", element: <TrainerRoutines /> },
      { path: "members", element: <TrainerMembers /> },
      { path: "profile", element: <TrainerProfile /> },
    ],
  },
  {
    path: "/member",
    element: (
      <PrivateWrapper allowedRoles={["member"]}>
        <MemberPage />
      </PrivateWrapper>
    ),
    children: [
      { index: true, element: <MemberDashboard /> },
      { path: "dashboard", element: <MemberDashboard /> },
      { path: "workout", element: <MemberWorkout /> },
      { path: "routines", element: <MemberRoutines /> },
      { path: "profile", element: <MemberProfile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
