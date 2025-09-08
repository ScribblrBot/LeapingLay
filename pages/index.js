import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeServer, setActiveServer] = useState('profile');

  // Mock profile data for demonstration
  useEffect(() => {
    const mockProfile = {
      username: "AuroraNova",
      handle: "aurora_nova",
      pronouns: "she/her",
      bio: "Digital creator & streamer. Love sharing gaming moments and connecting with awesome people! Check out my content across platforms 🌟",
      profile: {
        pfp: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
      },
      socials: {
        youtube: "UC_x5XgPlCI4jN4V",
        twitch: "aurora_nova",
        instagram: "aurora_nova",
        twitter: "aurora_nova",
        throne: "aurora_nova",
        discord: "aurora_nova"
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
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl mb-6">
                <img
                  src={profile.profile.pfp}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                {profile.username}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/10">
                  @{profile.handle}
                </span>
                <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm text-purple-300">
                  {profile.pronouns}
                </span>
              </div>
              
              <p className="text-gray-200 text-lg leading-relaxed max-w-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg">
                {profile.bio}
              </p>
            </div>
          </div>
        );
      case 'youtube':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                <i className="fab fa-youtube text-3xl mr-3 text-red-500"></i>
                YouTube Channel
              </span>
            </h2>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10">
              <p className="text-gray-300 mb-6 text-center">Check out my latest videos and content on YouTube!</p>
              <div className="flex justify-center">
                <a 
                  href={`https://youtube.com/channel/${profile.socials.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <i className="fab fa-youtube mr-2"></i> Visit YouTube Channel
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {activeServer.charAt(0).toUpperCase() + activeServer.slice(1)} Content
            </h2>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10">
              <p className="text-gray-300 text-center">This is the {activeServer} section content.</p>
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
            <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
              ? 'rounded-3xl ring-2 ring-purple-400' 
              : 'rounded-2xl bg-gray-800 hover:rounded-3xl hover:ring-2 hover:ring-purple-400/50'
          }`}
          onClick={() => handleServerClick('profile')}
        >
          <img
            src={profile.profile.pfp}
            alt={profile.username}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="w-8 h-0.5 bg-white/10 rounded-full"></div>

        {[
          { 
            id: 'youtube',
            platform: 'youtube', 
            icon: 'fab fa-youtube', 
            color: 'from-red-500 to-red-600',
            url: `https://youtube.com/channel/${profile.socials.youtube}`
          },
          { 
            id: 'twitch',
            platform: 'twitch', 
            icon: 'fab fa-twitch', 
            color: 'from-purple-500 to-purple-600',
            url: `https://twitch.tv/${profile.socials.twitch}`
          },
          { 
            id: 'instagram',
            platform: 'instagram', 
            icon: 'fab fa-instagram', 
            color: 'from-pink-500 to-pink-600',
            url: `https://instagram.com/${profile.socials.instagram}`
          },
          { 
            id: 'twitter',
            platform: 'twitter', 
            icon: 'fab fa-x-twitter', 
            color: 'from-blue-400 to-blue-500',
            url: `https://twitter.com/${profile.socials.twitter}`
          },
          { 
            id: 'throne',
            platform: 'throne', 
            icon: 'fas fa-crown', 
            color: 'from-yellow-500 to-yellow-600',
            url: `https://throne.com/${profile.socials.throne}`
          },
          { 
            id: 'discord',
            platform: 'discord', 
            icon: 'fab fa-discord', 
            color: 'from-indigo-500 to-indigo-600',
            url: `https://discord.gg/${profile.socials.discord}`
          }
        ].map((social) => (
          <div
            key={social.id}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group ${
              activeServer === social.id 
                ? 'rounded-3xl ring-2 ring-white' 
                : `rounded-2xl bg-gradient-to-br ${social.color} hover:rounded-3xl hover:scale-110`
            }`}
            onClick={() => handleServerClick(social.id, social.url)}
            title={`Visit ${social.platform}`}
          >
            <i className={`${social.icon} text-xl text-white`}></i>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {social.platform}
            </div>
          </div>
        ))}

        <div className="mt-auto mb-2 relative">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-green-500/30">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
          <p className="bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/5 max-w-md mx-auto">
            © {new Date().getFullYear()} {profile.username} • All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
