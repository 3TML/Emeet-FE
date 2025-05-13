import { RegisterForm } from "@/types/user";

export const registerUserApi = async (form: RegisterForm) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
};

export const getUsersApi = async () => {
  const res = await fetch("/api/register");
  return res.json();
};
