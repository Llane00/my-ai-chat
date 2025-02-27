import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  
  // 获取环境变量中的用户名和密码
  const validUsername = process.env.USERNAME || "admin";
  const validPassword = process.env.CODE || "password";
  
  // 验证用户名和密码
  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
} 
