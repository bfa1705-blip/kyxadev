"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HalftoneBackground from "@/components/HalftoneBackground";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <HalftoneBackground />
      <main className="min-h-screen bg-transparent relative" style={{ zIndex: 10 }}>
        <Header />
        
        {/* HOME SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center px-12 pt-24">
          <div className="max-w-6xl w-full">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="text-white">The Ultimate </span>
                <span className="inline-block relative">
                  <span className="bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-transparent font-black tracking-wider animate-pulse-slow" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    OSINT
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-transparent font-black tracking-wider blur-sm opacity-50 animate-pulse-slow" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    OSINT
                  </span>
                </span>
                <span className="text-white"> Search Platform</span>
              </h1>
              <style jsx>{`
                @keyframes pulse-slow {
                  0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 0.8;
                    transform: scale(1.02);
                  }
                }
                .animate-pulse-slow {
                  animation: pulse-slow 3s ease-in-out infinite;
                }
              `}</style>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Leverage public data to uncover insights, track footprints, and investigate efficiently.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/register" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a href="#search" className="px-8 py-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 hover:border-blue-500 text-white rounded-xl font-medium transition-all hover:scale-105">
                  Explore Features
                </a>
              </div>
            </div>

            {/* Features Grid with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                  title: "People Search",
                  desc: "Find detailed information about individuals",
                  color: "from-blue-500 to-blue-600",
                  delay: "delay-100"
                },
                { 
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                  title: "Company Intelligence",
                  desc: "Access comprehensive business data",
                  color: "from-blue-500 to-blue-600",
                  delay: "delay-200"
                },
                { 
                  icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                  title: "Domain Analysis",
                  desc: "Investigate domains and infrastructure",
                  color: "from-cyan-500 to-blue-600",
                  delay: "delay-300"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${isVisible ? `opacity-100 translate-y-0 ${item.delay}` : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <section id="search" className="py-20 px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Advanced Search Tools
              </h2>
              <p className="text-gray-400 text-lg">Multiple search methods to find what you need</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Email Lookup", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "from-blue-500 to-cyan-500", desc: "Find information linked to email addresses" },
                { name: "IP Address", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", color: "from-blue-600 to-blue-500", desc: "Trace IP addresses and geolocations" },
                { name: "Username", icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-cyan-500 to-blue-500", desc: "Search across multiple platforms" },
                { name: "Phone Number", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", color: "from-blue-500 to-blue-600", desc: "Lookup phone number details" },
                { name: "Social Media", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "from-blue-400 to-cyan-500", desc: "Discover social media profiles" },
                { name: "Image Search", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "from-cyan-500 to-blue-600", desc: "Reverse image search capabilities" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 px-12 bg-gradient-to-b from-transparent to-zinc-950/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10M+", label: "Searches Performed" },
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-12 text-center backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Ready to Start Investigating?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of investigators, researchers, and security professionals using Ronix-Labs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/register" className="group relative px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Start Free Trial
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                  <a href="/pricing" className="px-10 py-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 hover:border-blue-500 text-white rounded-xl font-semibold transition-all hover:scale-105">
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-2xl">Ronix-Labs</h3>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  The ultimate OSINT search platform. Trace. Uncover. Reveal.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-zinc-800/50 hover:bg-blue-600 border border-zinc-700 hover:border-blue-500 rounded-lg flex items-center justify-center transition-all group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-800/50 hover:bg-blue-600 border border-zinc-700 hover:border-blue-500 rounded-lg flex items-center justify-center transition-all group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-800/50 hover:bg-blue-600 border border-zinc-700 hover:border-blue-500 rounded-lg flex items-center justify-center transition-all group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-800/50 hover:bg-blue-600 border border-zinc-700 hover:border-blue-500 rounded-lg flex items-center justify-center transition-all group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-3">
                  <li><a href="#search" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Features
                  </a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Pricing
                  </a></li>
                  <li><a href="/search" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Search Tools
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    API Access
                  </a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    About Us
                  </a></li>
                  <li><a href="/support" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Support
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Blog
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Careers
                  </a></li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Privacy Policy
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Terms of Service
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Cookie Policy
                  </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Security
                  </a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-zinc-800 pt-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
                  <p className="text-gray-400 text-sm">Get the latest OSINT insights and updates</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 md:w-64 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Ronix-Labs. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Status</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Documentation</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>


      </main>
    </>
  );
}
