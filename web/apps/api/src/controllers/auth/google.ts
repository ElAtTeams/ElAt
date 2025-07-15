import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createConnection } from '../../lib/database';

export function googleAuth(req: Request, res: Response) {
  const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&response_type=code`;
  res.redirect(googleAuthUrl);
}

export async function googleCallback(req: Request, res: Response) {
  const { code } = req.query;

  if (!code) {
    return res.redirect('/login?error=no_code');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    });

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser = await userResponse.json();

    const connection = await createConnection();

    try {
      // Check if user exists
      const [existingUsers] = await connection.execute(
        'SELECT id, first_name, last_name, email FROM users WHERE email = ?',
        [googleUser.email]
      );

      let user;
      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        // User exists, log them in
        user = existingUsers[0];
      } else {
        // Create new user
        const [result] = await connection.execute(
          'INSERT INTO users (first_name, last_name, email, password, email_verified, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [
            googleUser.given_name || googleUser.name.split(' ')[0],
            googleUser.family_name || googleUser.name.split(' ')[1] || '',
            googleUser.email,
            '', // No password for Google users
            true, // Google users are verified
          ]
        );

        user = {
          id: (result as any).insertId,
          first_name: googleUser.given_name || googleUser.name.split(' ')[0],
          last_name: googleUser.family_name || googleUser.name.split(' ')[1] || '',
          email: googleUser.email,
        };
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Create user session
      await connection.execute(
        'INSERT INTO user_sessions (user_id, session_token, device_info, ip_address) VALUES (?, ?, ?, ?)',
        [user.id, token, req.headers['user-agent'] || 'unknown', req.ip || 'unknown']
      );

      // Set cookie and redirect
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.redirect('/dashboard');
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.redirect('/login?error=oauth_failed');
  }
} 