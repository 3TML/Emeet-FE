"use client";

import { useState, useEffect, useCallback } from "react";

// Email validation function
export const validateGmail = (email: string): string => {
  if (!email) return "";

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    return "Please enter a valid Gmail address";
  }
  return "";
};

// Username validation function
export const validateUsername = (username: string): string => {
  if (!username) return "";
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  return "";
};

// Password validation function
export const validatePassword = (password: string): string => {
  if (!password) return "";

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  return "";
};

// Form data interface
export interface AuthFormData {
  email: string;
  password: string;
  username: string;
  fullName: string;
  role: string;
  gender: string;
  isExpert: boolean;
  listCategoryId: string[];
  experience: string;
  pricePerMinute: number;
}

// Form errors interface
export interface AuthFormErrors {
  email: string;
  password: string;
  username: string;
  role: string;
  gender: string;
  isExpert: boolean;
  listCategoryId: string[];
  experience: string;
  pricePerMinute: number;
}

// Custom hook for authentication form handling
export const useAuthForm = (
  initialData: AuthFormData = {
    email: "",
    password: "",
    username: "",
    fullName: "",
    role: "",
    gender: "",
    isExpert: false,
    listCategoryId: [],
    experience: "",
    pricePerMinute: 0,
  }
) => {
  // Form state
  const [formData, setFormData] = useState<AuthFormData>(initialData);
  const [formErrors, setFormErrors] = useState<AuthFormErrors>({
    email: "",
    password: "",
    username: "",
    role: "",
    gender: "",
    isExpert: false,
    listCategoryId: [],
    experience: "",
    pricePerMinute: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate the entire form
  const validateForm = useCallback(() => {
    const newErrors: AuthFormErrors = {
      username: validateUsername(formData.username),
      email: validateGmail(formData.email),
      password: validatePassword(formData.password),
      role: "",
      gender: formData.gender ? "" : "Please select your gender",
      isExpert: false,
      listCategoryId: [],
      experience:
        formData.isExpert && !formData.experience
          ? "Please enter your experience"
          : "",
      pricePerMinute: 0,
    };

    setFormErrors(newErrors);
    setIsFormValid(
      !!(
        formData.email &&
        formData.password &&
        formData.fullName &&
        formData.gender &&
        !newErrors.email &&
        !newErrors.password &&
        !newErrors.gender &&
        (!formData.isExpert ||
          (formData.experience && formData.pricePerMinute > 0))
      )
    );
  }, [formData]);

  // Validate form when input changes
  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (
    e: React.FormEvent,
    onSuccess?: (data: AuthFormData) => void
  ) => {
    e.preventDefault();
    if (isFormValid && onSuccess) {
      onSuccess(formData);
    }
  };

  return {
    formData,
    formErrors,
    isFormValid,
    handleInputChange,
    handleSubmit,
    setFormData,
  };
};
