import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home.tsx";
import Register from "./pages/auth/register.tsx";
import Login from "./pages/auth/login.tsx";
import ResetPassword from "./pages/auth/resetPassword.tsx";
import NotFound from "./pages/notFound.tsx";

import AdminPage from "./pages/admin/admin-page.tsx";
import AdminDashboard from "./components/admin/adminDashboard/admin-dashboard.tsx";
import AdminWorkout from "./components/admin/adminWorkout/admin-workout.tsx";
import AdminRoutines from "./components/admin/adminRoutine/admin-routines.tsx";
import AdminMembers from "./components/admin/adminMember/admin-member.tsx";
import AdminTrainers from "./components/admin/adminTrainer/admin-trainer.tsx";
import AdminProfile from "./components/admin/adminProfile/admin-profile.tsx";
import AdminAddTrainers from "./components/admin/adminTrainer/admin-addtrainer.tsx";
import AdminAddMember from "./components/admin/adminMember/admin-addmember.tsx";

import TrainerDashboard from "./components/trainer/trainerDashboard/trainer-dashboard.tsx";
import TrainerWorkout from "./components/trainer/trainerWorkout/trainer-workout.tsx";
import TrainerRoutines from "./components/trainer/trainerRoutine/trainer-routine.tsx";
import TrainerMembers from "./components/trainer/trainerMember/trainer-member.tsx";
import TrainerProfile from "./components/trainer/trainerProfile/trainer-profile.tsx";

import MemberDashboard from "./pages/member-dashboard.tsx";
import MemberWorkout from "./pages/member-workout.tsx";
import MemberRoutines from "./pages/member-routine.tsx";
import MemberProfile from "./pages/member-profile.tsx";

import PrivateWrapper from "./components/routing/PrivateWrapper.tsx";
import TrainerPage from "./pages/trainer/trainer-page.tsx";
import MemberPage from "./pages/member-page.tsx";
import AdminAddWorkout from "./components/admin/adminWorkout/admin-addworkout.tsx";
import AdminAddRoutine from "./components/admin/adminRoutine/admin-addroutine.tsx";
import AdminTrainerDetails from "./components/admin/adminTrainer/admin-trainerdetails.tsx";
import AdminMemberDetails from "./components/admin/adminMember/admin-memberdetails.tsx";
import AdminWorkoutDetails from "./components/admin/adminWorkout/admin-workoutdetails.tsx";
import AdminRoutineDetails from "./components/admin/adminRoutine/admin-routinedetails.tsx";
import TrainerAddWorkout from "./components/trainer/trainerWorkout/trainer-addworkout.tsx";
import TrainerWorkoutDetails from "./components/trainer/trainerWorkout/trainer-workoutdetails.tsx";
import TrainerAddRoutine from "./components/trainer/trainerRoutine/trainer-routinedetails.tsx";
import TrainerRoutineDetails from "./components/trainer/trainerRoutine/trainer-routinedetails.tsx";
import TrainerAddMember from "./components/trainer/trainerMember/trainer-addmember.tsx";
import TrainerMemberDetails from "./components/trainer/trainerMember/trainer-memberdetails.tsx";

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
      { path: "workouts/add", element: <AdminAddWorkout /> },
      { path: "workouts/:id", element: <AdminWorkoutDetails /> },
      { path: "routines", element: <AdminRoutines /> },
      { path: "routines/add", element: <AdminAddRoutine /> },
      { path: "routines/:id", element: <AdminRoutineDetails /> },
      { path: "members", element: <AdminMembers /> },
      { path: "members/add", element: <AdminAddMember /> },
      { path: "members/:id", element: <AdminMemberDetails /> },
      { path: "trainers", element: <AdminTrainers /> },
      { path: "trainers/add", element: <AdminAddTrainers /> },
      { path: "trainers/:id", element: <AdminTrainerDetails /> },
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
      { path: "workouts/add", element: <TrainerAddWorkout /> },
      { path: "workouts/:id", element: <TrainerWorkoutDetails /> },
      { path: "routines", element: <TrainerRoutines /> },
      { path: "routines/add", element: <TrainerAddRoutine /> },
      { path: "routines/:id", element: <TrainerRoutineDetails /> },
      { path: "members", element: <TrainerMembers /> }, 
      { path: "members/add", element: <TrainerAddMember /> },
      { path: "members/:id", element: <TrainerMemberDetails /> },
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
