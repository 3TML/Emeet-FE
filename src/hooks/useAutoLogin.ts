"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";
import { getAccessToken, fetchUser } from "@/lib/api/authApi";
import { User } from "../types/user";

export const useAutoLogin = () => {
  const { setUser, setLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true);
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("No user");
        const userObj: User = JSON.parse(userStr);
        if (!userObj.refreshToken) throw new Error("No refreshToken");
        const { accessToken } = await getAccessToken(userObj.refreshToken);
        const userData = await fetchUser(accessToken);
        const newUser = {
          ...userData,
          refreshToken: userObj.refreshToken,
          accessToken,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        router.replace("/login");
      }
    };
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
