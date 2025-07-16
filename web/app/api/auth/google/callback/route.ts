import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/login?error=no_code")
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    })

    const tokens = await tokenResponse.json()

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const googleUser = await userResponse.json()

    const connection = await createConnection()

    // Check if user exists
    const [existingUsers] = await connection.execute(
      "SELECT id, first_name, last_name, email, neighborhood FROM users WHERE email = ?",
      [googleUser.email],
    )

    let user
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      // User exists, log them in
      user = existingUsers[0]
    } else {
      // Create new user
      const [result] = await connection.execute(
        "INSERT INTO users (first_name, last_name, email, password, neighborhood, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [
          googleUser.given_name || googleUser.name.split(" ")[0],
          googleUser.family_name || googleUser.name.split(" ")[1] || "",
          googleUser.email,
          "", // No password for Google users
          "Belirtilmemiş", // Default neighborhood
          true, // Google users are verified
        ],
      )

      user = {
        id: (result as any).insertId,
        first_name: googleUser.given_name || googleUser.name.split(" ")[0],
        last_name: googleUser.family_name || googleUser.name.split(" ")[1] || "",
        email: googleUser.email,
        neighborhood: "Belirtilmemiş",
      }
    }

    await connection.end()

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    // Redirect to dashboard with token
    const response = NextResponse.redirect("/dashboard")
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.redirect("/login?error=oauth_failed")
  }
}
