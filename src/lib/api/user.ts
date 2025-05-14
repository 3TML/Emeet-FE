import { RegisterForm } from "@/types/user";

const BASE_URL = "https://emeet.gahonghac.net/api/v1/auth";
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

export const getTestApi = async () => {
  const res = await fetch(`${BASE_URL}/testAPI`, {
  });
  return res.json();
};

export const getCategoryApi = async () => {
  const res = await fetch(`${BASE_URL}/GetAll`, {
  });
  return res.json();
};
