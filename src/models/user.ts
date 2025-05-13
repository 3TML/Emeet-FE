export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

import { registerUserApi } from "@/lib/api/user";

const handleRegister = async (form) => {
  const result = await registerUserApi(form);
  // Xử lý kết quả đăng ký ở đây
};
