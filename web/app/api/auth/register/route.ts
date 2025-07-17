import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs" // In a real app, you'd use bcrypt for password hashing

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    // Simulate a delay for network latency
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real application, you would:
    // 1. Hash the password: const hashedPassword = await bcrypt.hash(password, 10);
    // 2. Check if user already exists in the database
    // 3. Save the new user to the database

    // For now, we'll just return a success response
    console.log("Mock Register: Received", { firstName, lastName, email, password })

    // Simulate a successful registration
    return NextResponse.json({ success: true, message: "Kayıt başarılı!" }, { status: 200 })
  } catch (error) {
    console.error("Mock Register Error:", error)
    return NextResponse.json({ success: false, error: "Kayıt sırasında bir hata oluştu." }, { status: 500 })
  }
}
