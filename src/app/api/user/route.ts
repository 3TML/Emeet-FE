import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/controllers/userController";
import {
  getUsersApi,
  registerUserApi,
  updateUserApi,
  deleteUserApi,
} from "@/lib/api/user";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  const result = registerUser({ name, email, password });
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
export async function GET(req: NextRequest) {
  const users = await getUsersApi();
  return NextResponse.json(users);
}
