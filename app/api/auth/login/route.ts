import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendDiscordWebhook, getClientIP } from '@/lib/discord-webhook';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username/Email and password are required' },
        { status: 400 }
      );
    }

    // Connexion à MongoDB
    await connectDB();

    // Trouver l'utilisateur par username OU email
    const user = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ]
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Send Discord webhook
    const clientIP = getClientIP(req);
    await sendDiscordWebhook('login', {
      username: user.username,
      email: user.email,
      timestamp: new Date().toLocaleString('en-US', { 
        timeZone: 'UTC',
        dateStyle: 'full',
        timeStyle: 'long'
      }),
      ip: clientIP
    });

    // Créer la réponse avec un cookie de session
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || '',
          badges: user.badges || [],
        },
      },
      { status: 200 }
    );

    // Définir un cookie de session (simplifié pour cet exemple)
    response.cookies.set('user', JSON.stringify({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || '',
      badges: user.badges || [],
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
