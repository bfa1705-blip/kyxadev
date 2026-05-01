"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Generate or retrieve session ID
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);

    // Function to update online status
    const updateOnlineStatus = async () => {
      try {
        const response = await fetch('/api/online-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid })
        });
        const data = await response.json();
        if (data.onlineCount !== undefined) {
          setOnlineUsers(data.onlineCount);
        }
      } catch (error) {
        console.error('Failed to update online status:', error);
      }
    };

    // Function to fetch online count
    const fetchOnlineCount = async () => {
      try {
        const response = await fetch('/api/online-users');
        const data = await response.json();
        if (data.onlineCount !== undefined) {
          setOnlineUsers(data.onlineCount);
        }
      } catch (error) {
        console.error('Failed to fetch online count:', error);
      }
    };

    // Initial update
    updateOnlineStatus();

    // Update every 30 seconds to keep session alive
    const updateInterval = setInterval(updateOnlineStatus, 30000);

    // Fetch count every 10 seconds for real-time updates
    const fetchInterval = setInterval(fetchOnlineCount, 10000);

    // Cleanup on unmount
    return () => {
      clearInterval(updateInterval);
      clearInterval(fetchInterval);
    };
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 px-2 sm:px-4 py-2 sm:py-3 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800 px-3 sm:px-6 py-2 flex items-center justify-between shadow-lg overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-8 min-w-0">
          <a href="/" className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
            <img 
              src="https://i.postimg.cc/Dw6LWGJX/pngtree-letter-k-logo-vector-png-image-14655876-1-removebg-preview.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </a>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <a href="/#home" className="text-gray-300 hover:text-white transition-colors text-sm relative group whitespace-nowrap">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/search" className="text-gray-400 hover:text-white transition-colors text-sm relative group whitespace-nowrap">
              Search
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm relative group whitespace-nowrap">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/support" className="text-gray-400 hover:text-white transition-colors text-sm relative group whitespace-nowrap">
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/users" className="text-gray-400 hover:text-white transition-colors text-sm relative group whitespace-nowrap">
              Users
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Online Users Counter */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-800/50 rounded-full border border-green-500/30 shadow-lg shadow-green-500/20">
            <div className="relative">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-white font-bold text-xs sm:text-sm tabular-nums">{onlineUsers}</span>
              <span className="text-gray-400 text-[10px] sm:text-xs">online</span>
            </div>
          </div>

          {user ? (
            <>
              <a href="/profile" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700 hover:border-blue-500 transition-colors">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.username || 'User'}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/30">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-white text-xs font-medium">@{user.username || 'user'}</div>
                </div>
              </a>
              <a href="/profile" className="sm:hidden w-8 h-8 flex items-center justify-center">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.username || 'User'}
                    className="w-8 h-8 rounded-full object-cover border-2 border-zinc-700"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 text-xs shadow-lg shadow-red-500/30"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all flex items-center gap-1 sm:gap-1.5 btn-glow text-xs sm:text-sm whitespace-nowrap">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="hidden xs:inline">Login</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
