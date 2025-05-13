import { User } from "@/models/user";

const users: User[] = [];

export const registerUser = (
  user: Omit<User, "id">
): { success: boolean; message: string } => {
  const exists = users.some((u) => u.email === user.email);
  if (exists) {
    return { success: false, message: "Email already registered." };
  }
  users.push({ ...user, id: Date.now().toString() });
  return { success: true, message: "Registration successful!" };
};
