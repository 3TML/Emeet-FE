import { LoginForm, RegisterForm } from "@/types/user";
import { apiGet, apiPost } from "./fetcher";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://emeet.gahonghac.net/api/v1";

export const registerUserApi = async (form: RegisterForm) => {
  try {
    return await apiPost(`${API_URL}/auth/RegisterAccount`, form);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUserApi = async (form: LoginForm) => {
  try {
    return await apiPost(`${API_URL}/auth/LoginByPassword`, form);
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const getCategoryApi = async () => {
  try {
    return await apiGet(`${API_URL}/category/GetAll`, {
      cache: "no-store",
      retries: 3,
      timeout: 15000,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
