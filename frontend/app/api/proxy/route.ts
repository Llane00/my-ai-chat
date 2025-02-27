import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 从请求 URL 中获取参数
  const url = request.nextUrl.searchParams.get("url");
  const needCache = request.nextUrl.searchParams.get("needCache");
  
  // 从环境变量获取后端 URL，如果未设置则使用默认值
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 },
    );
  }

  try {
    // 传递 needCache 参数
    const response = await fetch(
      `${backendUrl}/crawl?needCache=${needCache}&url=${encodeURIComponent(url)}`,
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();

    // 将后端的响应返回给前端
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend API" },
      { status: 500 },
    );
  }
}
