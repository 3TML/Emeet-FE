"use client";

import { useState } from "react";
import { registerUserApi } from "@/lib/api/user";
import { RegisterForm } from "@/types/user";
import defaultTheme from "tailwindcss/defaultTheme";

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await registerUserApi(form);
    setMessage(res.message);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        aria-label="Registration Form"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          aria-label="Name"
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          aria-label="Email"
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          aria-label="Password"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {message && (
          <div className="mt-4 text-center text-sm" aria-live="polite">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
