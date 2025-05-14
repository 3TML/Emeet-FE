"use client";

import { useState, useEffect } from "react";

// Email validation function
export const validateGmail = (email: string): string => {
  if (!email) return "";
  
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    return "Please enter a valid Gmail address";
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
}

// Form errors interface
export interface AuthFormErrors {
  email: string;
  password: string;
}

// Custom hook for authentication form handling
export const useAuthForm = (initialData: AuthFormData = { email: "", password: "" }) => {
  // Form state
  const [formData, setFormData] = useState<AuthFormData>(initialData);
  const [formErrors, setFormErrors] = useState<AuthFormErrors>({
    email: "",
    password: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate form when input changes
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  // Validate the entire form
  const validateForm = () => {
    const newErrors: AuthFormErrors = {
      email: validateGmail(formData.email),
      password: validatePassword(formData.password)
    };
    
    setFormErrors(newErrors);
    setIsFormValid(!!(formData.email && formData.password && !newErrors.email && !newErrors.password));
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent, onSuccess?: (data: AuthFormData) => void) => {
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
    setFormData
  };
};
