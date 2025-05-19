import { LoginForm, LoginGoogleForm, RegisterForm } from "@/types/user";
import { apiGet, apiPost } from "./fetcher";

const BASE_URL = "https://emeet.gahonghac.net/api/v1";

export const registerUserApi = async (form: RegisterForm) => {
  try {
    return await apiPost(`${BASE_URL}/auth/RegisterAccount`, form);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUserApi = async (form: LoginForm) => {
  try {
    return await apiPost(`${BASE_URL}/auth/LoginByPassword`, form);
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const getUsersApi = async () => {
  try {
    return await apiGet("/api/register");
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};



export const getCategoryApi = async () => {
  try {
    return await apiGet(`${BASE_URL}/category/GetAll`, {
      cache: "no-store",
      retries: 3,
      timeout: 15000,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};


export const loginGoogleApi = async (form: LoginGoogleForm) => {
  try {
    return await apiPost(`${BASE_URL}/auth/LoginGoogle`, form);
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};