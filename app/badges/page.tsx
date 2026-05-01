"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import GridBackground from "@/components/GridBackground";

export default function BadgesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleClaimBadge = async (badgeName: string) => {
    setError("");
    setSuccess("");
    setClaiming(true);

    console.log('Claiming badge:', badgeName);
    console.log('User data:', user);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          claimBadge: badgeName,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Claim failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccess(`${badgeName} Badge claimed successfully!`);
      
      // Rafraîchir après 2 secondes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Claim error:', err);
      setError(err.message || 'An error occurred');
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setClaiming(false);
    }
  };

  const badges = [
    {
      name: "OG",
      title: "OG Badge",
      description: "Original member of the platform",
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/50",
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      free: true,
    },
  ];

  if (loading) {
    return (
      <>
        <GridBackground />
        <main className="min-h-screen bg-black relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading badges...</p>
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
              <div className="flex items-center gap-4 mb-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-4xl font-bold text-white">Badges Collection</h1>
              </div>
              <p className="text-gray-400">Collect and showcase your achievements</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => {
                const hasBadge = user?.badges && user.badges.includes(badge.name);
                
                return (
                  <div
                    key={index}
                    className={`bg-zinc-900/50 backdrop-blur-sm border rounded-2xl p-6 glow-effect transition-all relative ${
                      hasBadge ? 'border-' + badge.color.split('-')[1] + '-500' : 'border-zinc-800'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${badge.shadowColor} ${
                        !hasBadge && 'opacity-50 grayscale'
                      }`}>
                        {badge.icon}
                      </div>
                      
                      <h3 className="text-white text-xl font-bold mb-2">{badge.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{badge.description}</p>
                      
                      {badge.free && (
                        <div className="inline-block bg-green-500/20 border border-green-500/50 text-green-500 px-3 py-1 rounded-full text-xs font-medium mb-4">
                          Free Badge
                        </div>
                      )}
                      
                      {hasBadge ? (
                        <div className="w-full">
                          <div className="bg-green-500/20 border border-green-500/50 text-green-500 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Claimed
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            console.log('Button clicked!');
                            handleClaimBadge(badge.name);
                          }}
                          disabled={claiming}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50 cursor-pointer relative z-20"
                        >
                          {claiming ? 'Claiming...' : 'Claim Badge'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 text-center backdrop-blur-sm glow-effect">
              <h3 className="text-2xl font-bold text-white mb-3">More Badges Coming Soon!</h3>
              <p className="text-gray-300 mb-4">
                Stay tuned for more exclusive badges and achievements
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check back regularly for new badges
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
