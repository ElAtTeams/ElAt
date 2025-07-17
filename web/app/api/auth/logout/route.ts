import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Simulate a delay for network latency
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In a real application, you would:
    // 1. Clear any authentication tokens (e.g., invalidate JWT, clear cookies)
    console.log("Mock Logout: User logged out")
    return NextResponse.json({ success: true, message: "Çıkış başarılı." }, { status: 200 })
  } catch (error) {
    console.error("Mock Logout Error:", error)
    return NextResponse.json({ success: false, error: "Çıkış sırasında bir hata oluştu." }, { status: 500 })
  }
}
