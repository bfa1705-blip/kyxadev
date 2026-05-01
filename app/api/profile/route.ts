import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId, '-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || '',
          badges: user.badges || [],
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, username, profilePicture, claimBadge } = await req.json();

    console.log('PUT /api/profile - Request body:', { userId, username, profilePicture, claimBadge });

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Claim badge
    if (claimBadge) {
      console.log('Claiming badge:', claimBadge, 'for user:', userId);
      
      const user = await User.findById(userId);
      if (!user) {
        console.error('User not found:', userId);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      console.log('User found:', { id: user._id, username: user.username, badges: user.badges });

      // Initialiser badges si undefined
      if (!user.badges) {
        console.log('Initializing badges array');
        user.badges = [];
      }

      if (!user.badges.includes(claimBadge)) {
        console.log('Adding badge to user');
        user.badges.push(claimBadge);
        await user.save();
        
        console.log('Badge claimed successfully, new badges:', user.badges);
        
        return NextResponse.json(
          {
            message: 'Badge claimed successfully',
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
      } else {
        console.log('Badge already claimed');
        return NextResponse.json(
          { error: 'Badge already claimed' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};

    if (username) {
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

      const existingUser = await User.findOne({ 
        username: username.toLowerCase(),
        _id: { $ne: userId }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }

      updateData.username = username.toLowerCase();
    }

    if (profilePicture !== undefined) {
      updateData.profilePicture = profilePicture;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, select: '-password' }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
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
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
