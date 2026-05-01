import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Vérifier si l'utilisateur est admin
function isAdmin(username: string): boolean {
  return username === 'kyxa';
}

// GET - Récupérer tous les utilisateurs
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        badges: user.badges,
        category: user.category,
        createdAt: user.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un utilisateur
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { userId } = await request.json();

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}

// PATCH - Ajouter ou retirer un badge
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const { userId, action, badge } = await request.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'addBadge') {
      if (!user.badges.includes(badge)) {
        user.badges.push(badge);
      }
    } else if (action === 'removeBadge') {
      user.badges = user.badges.filter((b: string) => b !== badge);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        badges: user.badges,
        category: user.category,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update badges' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un utilisateur
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { userId, username, email } = await request.json();

    const updateData: any = {};
    
    if (username) {
      // Vérifier si le username est déjà pris
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
    
    if (email) {
      // Vérifier si l'email est déjà pris
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 409 }
        );
      }
      
      updateData.email = email.toLowerCase();
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        badges: user.badges,
        category: user.category,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}
