import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeServer, setActiveServer] = useState('profile');
  const [hoveredServer, setHoveredServer] = useState(null);

  useEffect(() => {
    // Mock profile data for demonstration
    const mockProfile = {
      "bio": "I'm an Artist, YouTuber, and Gamer who loves creating storytime animations, digital art, and gaming content! You might've seen me on YouTube or maybe just stumbled across me here, but either way, welcome! I share my art journey, funny stories, and some rather chaotic gaming moments. >;)",
      "username": "LeapingLay",
      "handle": "leapinglay",
      "pronouns": "He/Him",
      "profile": {
        "pfp": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
      },
      "socials": {
        "youtube": "UC7mh6hOpjyMnSpwZ8Nr_h-Q",
        "discord": "xCawduju59",
        "instagram": "leapinglay",
        "twitch": "leapinglay",
        "throne": "leapinglay",
        "twitter": "leapinglay"
      }
    };
    
    // Simulate API fetch
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 1500);
  }, []);

  // Function to handle server clicks
  const handleServerClick = (serverId, url = null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveServer(serverId);
    }
  };

  // Function to render content based on active server
  const renderServerContent = () => {
    switch(activeServer) {
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/25">
                  <img
                    src={profile.profile.pfp}
                    alt={profile.username}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 bg-cyan-400/80 rounded-full flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <i className="fas fa-expand text-white"></i>
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 hover:bg-gradient-to-l transition-all duration-500">
                {profile.username}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-white/10 px-4 py-2 rounded-full text-sm border border-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">
                  @{profile.handle}
                </span>
                <span className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-4 py-2 rounded-full text-sm text-purple-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:scale-105 hover:shadow-purple-500/10 transition-all duration-300 cursor-default">
                  {profile.pronouns}
                </span>
              </div>
              
              <div className="relative group">
                <p className="text-gray-200 text-lg leading-relaxed max-w-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-400/30 transition-all duration-500">
                  {profile.bio}
                </p>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          </div>
        );
      case 'youtube':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3 group">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-pink-500 transition-all duration-500">
                <i className="fab fa-youtube text-3xl mr-3 text-red-500 group-hover:text-red-400 transition-colors duration-300"></i>
                YouTube Channel
              </span>
            </h2>
            <div className="relative group">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-red-500/10 hover:border-red-400/30 transition-all duration-500">
                <p className="text-gray-300 mb-6 text-center">Check out my latest videos and content on YouTube!</p>
                <div className="flex justify-center">
                  <a 
                    href={`https://youtube.com/channel/${profile.socials.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <span className="relative z-10 flex items-center">
                      <i className="fab fa-youtube mr-3 text-xl"></i> Visit YouTube Channel
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-2 bg-red-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </a>
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        );
      // Other server cases would follow similar pattern with enhanced hover effects
      default:
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center group">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-500">
                {activeServer.charAt(0).toUpperCase() + activeServer.slice(1)} Content
              </span>
            </h2>
            <div className="relative group">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10 hover:shadow-cyan-500/10 hover:border-cyan-400/30 transition-all duration-500">
                <p className="text-gray-300 text-center">This is the {activeServer} section content.</p>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mt-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Loading Profile
          </h2>
          <p className="text-gray-400 mt-2 animate-pulse">Just a moment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-purple-500/30">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      {/* Server sidebar */}
      <div className="w-20 bg-black/30 flex flex-col items-center py-6 space-y-5 border-r border-white/10">
        <div 
          className={`relative w-14 h-14 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
            activeServer === 'profile' 
              ? 'rounded-3xl ring-2 ring-purple-400 scale-110' 
              : 'rounded-2xl bg-gray-800 hover:rounded-3xl hover:ring-2 hover:ring-purple-400/50 hover:scale-110'
          }`}
          onClick={() => handleServerClick('profile')}
          onMouseEnter={() => setHoveredServer('profile')}
          onMouseLeave={() => setHoveredServer(null)}
        >
          <img
            src={profile.profile.pfp}
            alt={profile.username}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -left-1 top-1/2 w-1 h-8 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
          
          {/* Hover tooltip */}
          <div className={`absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${hoveredServer === 'profile' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
            View Profile
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-black border-t-transparent border-b-transparent"></div>
          </div>
        </div>

        <div className="w-8 h-0.5 bg-white/10 rounded-full"></div>

        {[
          { 
            id: 'youtube',
            platform: 'youtube', 
            icon: 'fab fa-youtube', 
            color: 'from-red-500 to-red-600',
            hoverColor: 'hover:from-red-400 hover:to-red-500',
            url: `https://youtube.com/channel/${profile.socials.youtube}`
          },
          { 
            id: 'twitch',
            platform: 'twitch', 
            icon: 'fab fa-twitch', 
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-400 hover:to-purple-500',
            url: `https://twitch.tv/${profile.socials.twitch}`
          },
          { 
            id: 'instagram',
            platform: 'instagram', 
            icon: 'fab fa-instagram', 
            color: 'from-pink-500 to-pink-600',
            hoverColor: 'hover:from-pink-400 hover:to-pink-500',
            url: `https://instagram.com/${profile.socials.instagram}`
          },
          { 
            id: 'twitter',
            platform: 'twitter', 
            icon: 'fab fa-twitter', 
            color: 'from-blue-400 to-blue-500',
            hoverColor: 'hover:from-blue-300 hover:to-blue-400',
            url: `https://twitter.com/${profile.socials.twitter}`
          },
          { 
            id: 'throne',
            platform: 'throne', 
            icon: 'fas fa-crown', 
            color: 'from-yellow-500 to-yellow-600',
            hoverColor: 'hover:from-yellow-400 hover:to-yellow-500',
            url: `https://throne.com/${profile.socials.throne}`
          },
          { 
            id: 'discord',
            platform: 'discord', 
            icon: 'fab fa-discord', 
            color: 'from-indigo-500 to-indigo-600',
            hoverColor: 'hover:from-indigo-400 hover:to-indigo-500',
            url: `https://discord.gg/${profile.socials.discord}`
          }
        ].map((social) => (
          <div
            key={social.id}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group ${
              activeServer === social.id 
                ? 'rounded-3xl ring-2 ring-white scale-110' 
                : `rounded-2xl bg-gradient-to-br ${social.color} ${social.hoverColor} hover:rounded-3xl hover:scale-110`
            }`}
            onClick={() => handleServerClick(social.id, social.url)}
            onMouseEnter={() => setHoveredServer(social.id)}
            onMouseLeave={() => setHoveredServer(null)}
          >
            <i className={`${social.icon} text-xl text-white transition-transform duration-300 group-hover:scale-125`}></i>
            
            {/* Hover tooltip */}
            <div className={`absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${hoveredServer === social.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
              Visit {social.platform}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-black border-t-transparent border-b-transparent"></div>
            </div>
            
            {/* Active indicator */}
            <div className={`absolute -left-1 top-1/2 w-1 h-4 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ${
              activeServer === social.id ? 'opacity-100' : 'opacity-0'
            }`}></div>
            
            {/* Hover pulse effect */}
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        ))}

        <div className="mt-auto mb-2 relative group">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-green-500/30 hover:border-green-400/50 hover:scale-110 transition-all duration-300">
            <div className="w-3 h-3 bg-green-500 rounded-full group-hover:animate-pulse"></div>
          </div>
          
          {/* Online status tooltip */}
          <div className="absolute left-14 bottom-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Online
            <div className="absolute right-full bottom-2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-black border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Head>
          <title>{profile.username} - Profile</title>
          <meta name="description" content={profile.bio} />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </Head>

        <main className="flex-1 py-8">
          {renderServerContent()}
        </main>

        <footer className="py-6 text-center text-gray-400 text-sm">
          <div className="relative group inline-block">
            <p className="bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/5 max-w-md mx-auto hover:bg-black/30 hover:border-cyan-400/20 transition-all duration-500">
              © {new Date().getFullYear()} {profile.username} • All rights reserved
            </p>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}
