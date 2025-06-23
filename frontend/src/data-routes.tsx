import { createBrowserRouter } from "react-router"
import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";

export const router = createBrowserRouter([
    { path: "/", Component: Home },
    { path: "/register", Component: Register },
    { path: "/login", Component: Login },
    { path: "/reset-password", Component: ResetPassword },
]);