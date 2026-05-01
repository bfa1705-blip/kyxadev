"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import GridBackground from "@/components/GridBackground";

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  badges?: string[];
  category?: string;
  createdAt: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [allBadges, setAllBadges] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
    fetchAllBadges();
  }, [router]);

  const fetchAllBadges = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        const badges = Array.from(new Set(data.users.flatMap((u: User) => u.badges || [])));
        setAllBadges(badges as string[]);
      }
    } catch (error) {
      console.error('Failed to fetch badges:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedBadge) params.append('badge', selectedBadge);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.users);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <GridBackground />
        <main className="min-h-screen bg-black relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Redirecting to login...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <GridBackground />
      <main className="min-h-screen bg-black relative z-10">
        <Header />
        <div className="px-12 pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-white mb-3">
                User <span className="text-blue-500">Search</span>
              </h1>
              <p className="text-gray-400">Search users by username, badge, or category</p>
            </div>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8">
              <div className="mb-6">
                <label className="block text-white text-sm mb-2">Search by Username</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter username..."
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white text-sm mb-2">Filter by Badge</label>
                <div className="relative">
                  <select 
                    value={selectedBadge}
                    onChange={(e) => setSelectedBadge(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">All Badges</option>
                    {allBadges.map(badge => (
                      <option key={badge} value={badge}>{badge}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50"
              >
                {loading ? 'Searching...' : 'Search Users'}
              </button>
            </div>

            {loading && (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Searching...</p>
              </div>
            )}

            {!loading && hasSearched && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-xl font-semibold">
                    Search Results ({results.length})
                  </h2>
                  {results.length > 0 && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBadge("");
                        setResults([]);
                        setHasSearched(false);
                      }}
                      className="text-blue-500 hover:text-blue-400 transition-colors text-sm"
                    >
                      Clear search
                    </button>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-400">No users found matching your criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="group bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-4 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={user.username}
                              className="w-16 h-16 rounded-full object-cover shadow-lg shadow-blue-500/50 mb-3 border-2 border-blue-500/30"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/50 mb-3">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <h3 className="text-white font-semibold text-sm mb-1">@{user.username}</h3>
                          {user.badges && user.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {user.badges.map((badge, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-yellow-500 to-amber-500 px-1.5 py-0.5 rounded text-white text-[9px] font-bold shadow-sm">
                                  {badge}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedUser && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <div 
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">User Profile</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                {selectedUser.profilePicture ? (
                  <img
                    src={selectedUser.profilePicture}
                    alt={selectedUser.username}
                    className="w-24 h-24 rounded-full object-cover shadow-lg shadow-blue-500/50 mb-4 border-4 border-blue-500/30"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-500/50 mb-4">
                    {selectedUser.username.charAt(0).toUpperCase()}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">@{selectedUser.username}</h3>
                
                {selectedUser.badges && selectedUser.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {selectedUser.badges.map((badge, idx) => (
                      <div key={idx} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/50">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-bold text-sm">{badge}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </div>
                  <div className="text-white font-medium">{selectedUser.email}</div>
                </div>

                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Member since
                  </div>
                  <div className="text-white font-medium">
                    {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
