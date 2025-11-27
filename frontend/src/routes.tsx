import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import TrainerDashboard from "./components/trainer/trainerDashboard/trainer-dashboard.tsx";
import TrainerWorkout from "./components/trainer/trainerWorkout/trainer-workout.tsx";
import TrainerRoutines from "./components/trainer/trainerRoutine/trainer-routine.tsx";
import TrainerMembers from "./components/trainer/trainerMember/trainer-member.tsx";
import TrainerProfile from "./components/trainer/trainerProfile/trainer-profile.tsx";

import MemberDashboard from "./components/member/memberDashboard/member-dashboard.tsx";
import MemberWorkout from "./components/member/memberWorkout/member-workout.tsx";
import MemberRoutines from "./components/member/memberRoutine/member-routine.tsx";
import MemberProfile from "./components/member/memberProfile/member-profile.tsx";

import PrivateRoute from "./components/routing/PrivateRoute.tsx";
import TrainerPage from "./pages/trainer/trainer-page.tsx";
import MemberPage from "./pages/member/member-page.tsx";
import AdminAddTrainer from "./components/admin/adminTrainer/admin-addtrainer.tsx";
import AdminAddMember from "./components/admin/adminMember/admin-addmember.tsx";
import AdminAddWorkout from "./components/admin/adminWorkout/admin-addworkout.tsx";
import AdminAddRoutine from "./components/admin/adminRoutine/admin-addroutine.tsx";
import AdminTrainerDetails from "./components/admin/adminTrainer/admin-trainerdetails.tsx";
import AdminMemberDetails from "./components/admin/adminMember/admin-memberdetails.tsx";
import AdminWorkoutDetails from "./components/admin/adminWorkout/admin-workoutdetails.tsx";
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
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="workouts" element={<AdminWorkout />} />
          <Route path="workouts/add" element={<AdminAddWorkout />} />
          <Route path="workouts/:id" element={<AdminWorkoutDetails />} />
          <Route path="routines" element={<AdminRoutines />} />
          <Route path="routines/add" element={<AdminAddRoutine />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="members/add" element={<AdminAddMember />} />
          <Route path="members/:id" element={<AdminMemberDetails />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="trainers/add" element={<AdminAddTrainer />} />
          <Route path="trainers/:id" element={<AdminTrainerDetails />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Trainer Dashboard */}
        <Route
          path="/trainer"
          element={
            <PrivateRoute allowedRoles={["TRAINER"]}>
              <TrainerDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<TrainerPage />} />
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="workout" element={<TrainerWorkout />} />
          <Route path="workouts/add" element={<TrainerAddWorkout />} />
          <Route path="workouts/:id" element={<TrainerWorkoutDetails />} />
          <Route path="routines" element={<TrainerRoutines />} />
          <Route path="routines/add" element={<TrainerAddRoutine />} />
          <Route path="routines/:id" element={<TrainerRoutineDetails />} />
          <Route path="members" element={<TrainerMembers />} />
          <Route path="members/add" element={<TrainerAddMember />} />
          <Route path="members/:id" element={<TrainerMemberDetails />} />
          {/* ✅ update profile route to accept ID */}
          <Route path="profile/:id" element={<TrainerProfile />} />
          <Route path="chat" element={<TrainerChat />} />
        </Route>

        {/* Member Dashboard */}
        <Route
          path="/member"
          element={
            <PrivateRoute allowedRoles={["MEMBER"]}>
              <MemberDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<MemberPage />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="workout" element={<MemberWorkout />} />
          <Route path="workouts/:id" element={<MemberWorkoutDetails />} />
          <Route path="routines" element={<MemberRoutines />} />
          <Route path="routines/add" element={<MemberAddRoutines />} />
          <Route path="routines/:id" element={<MemberRoutineDetails />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="profile/trainer/:id" element={<MemberTrainerProfile />} />
          <Route path="chat" element={<MemberChat />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
