import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterApartment from "./pages/RegisterApartment";
import AdminRegistrations from "./pages/AdminRegistrations";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register-apartment" element={<RegisterApartment />} />
      <Route path="/admin/registrations" element={<AdminRegistrations />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}