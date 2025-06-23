import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home.tsx";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import ResetPassword from "./pages/resetPassword.tsx";

export default function RouteLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
