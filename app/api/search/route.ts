import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const badge = searchParams.get('badge') || '';
    const category = searchParams.get('category') || '';

    let filter: any = {};

    if (query) {
      filter.username = { $regex: query, $options: 'i' };
    }

    if (badge) {
      filter.badges = badge;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        badges: user.badges,
        category: user.category,
        createdAt: user.createdAt,
      })),
      count: users.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to search users' },
      { status: 500 }
    );
  }
}
