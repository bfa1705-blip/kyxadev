import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    // Récupérer tous les utilisateurs sans les mots de passe
    const users = await User.find({}, '-password').sort({ createdAt: -1 });

    console.log('Users fetched:', users.length);
    console.log('Sample user badges:', users[0]?.badges);

    return NextResponse.json(
      {
        users: users.map(user => ({
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || '',
          badges: user.badges || [],
          createdAt: user.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
