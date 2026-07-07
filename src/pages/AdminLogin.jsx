import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      const auth = response.data;

      localStorage.setItem("token", auth.token);
      localStorage.setItem("role", auth.role);
      localStorage.setItem("email", auth.email);

      alert("Login successful!");

      navigate("/admin/registrations");

    } catch (error) {
        console.log(error.response);

        alert(
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message
        );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Super Admin Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}