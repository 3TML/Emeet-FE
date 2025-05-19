"use client";
import React from "react";
import { useAutoLogin } from "@/hooks/useAutoLogin";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  useAutoLogin();
  return <>{children}</>;
};

export default AuthWrapper;
