import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendDiscordWebhook, getClientIP } from '@/lib/discord-webhook';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        { error: 'Username can only contain letters, numbers and underscores' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Connexion à MongoDB
    await connectDB();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username: username.toLowerCase() }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'User already exists with this email' },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      badges: [],
    });

    // Send Discord webhook
    const clientIP = getClientIP(req);
    await sendDiscordWebhook('register', {
      username: user.username,
      email: user.email,
      timestamp: new Date().toLocaleString('en-US', { 
        timeZone: 'UTC',
        dateStyle: 'full',
        timeStyle: 'long'
      }),
      ip: clientIP
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          badges: user.badges || [],
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
