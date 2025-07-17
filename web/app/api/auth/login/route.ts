import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs" // In a real app, you'd use bcrypt for password comparison

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Simulate a delay for network latency
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real application, you would:
    // 1. Find the user by email in the database
    // 2. Compare the provided password with the hashed password: await bcrypt.compare(password, user.password_hash);
    // 3. Generate a JWT token and set it as a cookie or return it

    // For now, we'll simulate a successful login for specific test credentials
    if (email === "test@example.com" && password === "password123") {
      console.log("Mock Login: Successful for", email)
      return NextResponse.json({ success: true, message: "Giriş başarılı!", token: "mock-jwt-token" }, { status: 200 })
    } else {
      console.log("Mock Login: Failed for", email)
      return NextResponse.json({ success: false, error: "Geçersiz e-posta veya şifre." }, { status: 401 })
    }
  } catch (error) {
    console.error("Mock Login Error:", error)
    return NextResponse.json({ success: false, error: "Giriş sırasında bir hata oluştu." }, { status: 500 })
  }
}
