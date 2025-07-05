import {
  createBrowserRouter,
} from "react-router-dom";

import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";
import AdminDashboard from "./pages/admin-dashboard.tsx";
import TrainerDashboard from "./pages/trainer-dashboard.tsx";
import MemberDashboard from "./pages/member-dashboard.tsx";
import NotFound from "./pages/notFound.tsx";

import PrivateWrapper from "./components/routing/PrivateWrapper.tsx";

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
    path: "/admin-dashboard",
    element: (
      <PrivateWrapper allowedRoles={["admin"]}>
        <AdminDashboard />
      </PrivateWrapper>
    ),
  },
  {
    path: "/trainer-dashboard",
    element: (
      <PrivateWrapper allowedRoles={["trainer"]}>
        <TrainerDashboard />
      </PrivateWrapper>
    ),
  },
  {
    path: "/member-dashboard",
    element: (
      <PrivateWrapper allowedRoles={["member"]}>
        <MemberDashboard />
      </PrivateWrapper>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
