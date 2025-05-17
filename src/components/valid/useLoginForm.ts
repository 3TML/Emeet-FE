import { useState, useEffect } from "react";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormErrors {
  username: string;
  password: string;
}

export const useLoginForm = (
  initialData: LoginFormData = { username: "", password: "" }
) => {
  const [formData, setFormData] = useState<LoginFormData>(initialData);
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({
    username: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: LoginFormErrors = {
      username: !formData.username ? "Vui lòng nhập username/email" : "",
      password: !formData.password ? "Vui lòng nhập mật khẩu" : "",
    };
    setFormErrors(newErrors);
    setIsFormValid(!newErrors.username && !newErrors.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    formErrors,
    isFormValid,
    handleInputChange,
    setFormData,
  };
};
