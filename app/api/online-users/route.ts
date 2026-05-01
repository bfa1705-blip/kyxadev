import { NextResponse } from 'next/server';

// Store active sessions in memory (in production, use Redis or similar)
const activeSessions = new Map<string, number>();
const SESSION_TIMEOUT = 60000; // 1 minute

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Update session timestamp
    activeSessions.set(sessionId, Date.now());

    // Clean up expired sessions
    const now = Date.now();
    for (const [id, timestamp] of activeSessions.entries()) {
      if (now - timestamp > SESSION_TIMEOUT) {
        activeSessions.delete(id);
      }
    }

    return NextResponse.json({ 
      success: true,
      onlineCount: activeSessions.size 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Clean up expired sessions
    const now = Date.now();
    for (const [id, timestamp] of activeSessions.entries()) {
      if (now - timestamp > SESSION_TIMEOUT) {
        activeSessions.delete(id);
      }
    }

    return NextResponse.json({ 
      onlineCount: activeSessions.size 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get online count' }, { status: 500 });
  }
}
