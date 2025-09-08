import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeServer, setActiveServer] = useState('profile');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data only
        const profileResponse = await fetch('/json/profile.json');
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle server clicks
  const handleServerClick = (serverId, url = null) => {
    if (url) {
      // Open URL in new tab
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
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient bg-300% animate-shimmer">
                  {profile.username}
                </h1>
                <p className="text-gray-300 text-xl mt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="bg-slate-800/50 px-3 py-1 rounded-full border border-purple-500/20">
                    @{profile.handle}
                  </span>
                  <span className="bg-purple-600/20 px-3 py-1 rounded-full text-purple-300">
                    {profile.pronouns}
                  </span>
                </p>
                <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-2xl bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/10">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>
        );
      case 'youtube':
        return (
          <div className="max-w-6xl mx-auto px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                <i className="fab fa-youtube text-3xl mr-3 text-red-500 drop-shadow-lg"></i>
                YouTube Channel
              </span>
            </h2>
            <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-500/30">
              <p className="text-gray-300 mb-6">Content for YouTube server would go here.</p>
              <a 
                href={`https://youtube.com/channel/${profile.socials.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Visit YouTube Channel
              </a>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">
              {activeServer.charAt(0).toUpperCase() + activeServer.slice(1)} Server
            </h2>
            <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-500/30">
              <p className="text-gray-300">test {activeServer} test.</p>
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
        <div className="bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-purple-500/30 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-red-400 text-5xl mb-4 animate-bounce">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Something went wrong
            </h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25 font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Try Again</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden flex">
      <div className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4 border-r border-gray-800">
        <div 
          className={`relative w-12 h-12 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
            activeServer === 'profile' 
              ? 'rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600' 
              : 'rounded-2xl bg-gray-700 hover:rounded-3xl hover:bg-purple-600'
          }`}
          onClick={() => handleServerClick('profile')}
        >
          <img
            src={profile.profile.pfp}
            alt={profile.username}
            className="w-full h-full object-cover"
          />
          <div className={`absolute -left-1 top-1/2 w-1 h-8 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ${
            activeServer === 'profile' ? 'opacity-100' : 'opacity-0'
          }`}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="w-8 h-0.5 bg-gray-700 rounded-full"></div>

        {[
          { 
            id: 'youtube',
            platform: 'youtube', 
            icon: 'fab fa-youtube', 
            color: 'bg-red-500',
            url: `https://youtube.com/channel/${profile.socials.youtube}`
          },
          { 
            id: 'twitch',
            platform: 'twitch', 
            icon: 'fab fa-twitch', 
            color: 'bg-purple-500',
            url: `https://twitch.tv/${profile.socials.twitch}`
          },
          { 
            id: 'instagram',
            platform: 'instagram', 
            icon: 'fab fa-instagram', 
            color: 'bg-pink-500',
            url: `https://instagram.com/${profile.socials.instagram}`
          },
          { 
            id: 'twitter',
            platform: 'twitter', 
            icon: 'fab fa-x-twitter', 
            color: 'bg-blue-400',
            url: `https://twitter.com/${profile.socials.twitter}`
          },
          { 
            id: 'throne',
            platform: 'throne', 
            icon: 'fas fa-crown', 
            color: 'bg-yellow-500',
            url: `https://throne.com/${profile.socials.throne}`
          },
          { 
            id: 'discord',
            platform: 'discord', 
            icon: 'fab fa-discord', 
            color: 'bg-indigo-500',
            url: `https://discord.gg/${profile.socials.discord}`
          }
        ].map((social) => (
          <div
            key={social.id}
            className={`relative w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group ${
              activeServer === social.id 
                ? 'rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600' 
                : `rounded-2xl ${social.color} hover:rounded-3xl hover:scale-110`
            }`}
            onClick={() => handleServerClick(social.id, social.url)}
          >
            <i className={`${social.icon} text-xl text-white`}></i>
            <div className={`absolute -left-1 top-1/2 w-1 h-4 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ${
              activeServer === social.id ? 'opacity-100' : 'opacity-0'
            }`}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {social.platform}
            </div>
          </div>
        ))}

        <div className="mt-auto mb-2 relative">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Head>
          <title>{profile.username} - Profile</title>
          <meta name="description" content={profile.bio} />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </Head>

        <header className="relative z-10">
          {renderServerContent()}
        </header>

        <footer className="max-w-6xl mx-auto px-8 py-8 text-center text-gray-400 text-sm relative z-10">
          <p className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/10">
            © {new Date().getFullYear()} {profile.username} • All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
