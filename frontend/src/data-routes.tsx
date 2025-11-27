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

import MemberDashboard from "./components/member/memberDashboard/member-dashboard.tsx";
import MemberWorkout from "./components/member/memberWorkout/member-workout.tsx";
import MemberRoutines from "./components/member/memberRoutine/member-routine.tsx";
import MemberProfile from "./components/member/memberProfile/member-profile.tsx";

import PrivateWrapper from "./components/routing/PrivateWrapper.tsx";
import TrainerPage from "./pages/trainer/trainer-page.tsx";
import MemberPage from "./pages/member/member-page.tsx";
import AdminAddWorkout from "./components/admin/adminWorkout/admin-addworkout.tsx";
import AdminAddRoutine from "./components/admin/adminRoutine/admin-addroutine.tsx";
import AdminTrainerDetails from "./components/admin/adminTrainer/admin-trainerdetails.tsx";
import AdminMemberDetails from "./components/admin/adminMember/admin-memberdetails.tsx";
import AdminWorkoutDetails from "./components/admin/adminWorkout/admin-workoutdetails.tsx";
import AdminRoutineDetails from "./components/admin/adminRoutine/admin-routinedetails.tsx";
import TrainerAddWorkout from "./components/trainer/trainerWorkout/trainer-addworkout.tsx";
import TrainerWorkoutDetails from "./components/trainer/trainerWorkout/trainer-workoutdetails.tsx";
import TrainerAddRoutine from "./components/trainer/trainerRoutine/trainer-addroutine.tsx";
import TrainerRoutineDetails from "./components/trainer/trainerRoutine/trainer-routinedetails.tsx";
import TrainerAddMember from "./components/trainer/trainerMember/trainer-addmember.tsx";
import TrainerMemberDetails from "./components/trainer/trainerMember/trainer-memberdetails.tsx";
import MemberWorkoutDetails from "./components/member/memberWorkout/member-workoutdetails.tsx";
import MemberRoutineDetails from "./components/member/memberRoutine/member-routinedetails.tsx";
import MemberAddRoutines from "./components/member/memberRoutine/member-addroutine.tsx";
import MemberTrainerProfile from "./components/member/memberProfile/member-trainerprofile.tsx";
import MemberChat from "./components/member/chat/member-chat.tsx";
import TrainerChat from "./components/trainer/chat/trainer-chat.tsx";

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
      <PrivateWrapper allowedRoles={["ADMIN"]}>
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
      <PrivateWrapper allowedRoles={["TRAINER"]}>
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
      { path: "chat", element: <TrainerChat /> }
    ],
  },
  {
    path: "/member",
    element: (
      <PrivateWrapper allowedRoles={["MEMBER"]}>
        <MemberPage />
      </PrivateWrapper>
    ),
    children: [
      { index: true, element: <MemberDashboard /> },
      { path: "dashboard", element: <MemberDashboard /> },
      { path: "workouts", element: <MemberWorkout /> },
      { path: "workouts/:id", element: <MemberWorkoutDetails /> },
      { path: "routines", element: <MemberRoutines /> },
      { path: "routines/add", element: <MemberAddRoutines /> },
      { path: "routines/:id", element: <MemberRoutineDetails /> },
      { path: "profile", element: <MemberProfile /> },
      { path: "profile/trainer", element: <MemberTrainerProfile /> },
      { path: "chat", element: <MemberChat /> }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
