import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditPassword from "../pages/EditPassword";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recovery/:id" element={<EditPassword />} />

      <Route path="*" element={<Navigate to={"/home"} />} />
    </Routes>
  );
}
