import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";
import Dashboard from "./pages/dashboard.tsx";
import NotFound from "./pages/notFound.tsx";
import AdminDashboard from "./components/admin-dashboard.tsx";
import TrainerDashboard from "./components/trainer-dashboard.tsx";
import MemberDashboard from "./components/member-dashboard.tsx";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/register", Component: Register },
  { path: "/login", Component: Login },
  { path: "/reset-password", Component: ResetPassword },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { path: "admin", Component: AdminDashboard },
      { path: "trainer", Component: TrainerDashboard },
      { path: "member", Component: MemberDashboard },
      { path: "*", Component: NotFound }, // Fallback for invalid roles
    ],
  },
  { path: "*", Component: NotFound }, // Catch-all for other invalid paths
]);