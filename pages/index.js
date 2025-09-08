// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [youtubeData, setYoutubeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await fetch('/json/profile.json');
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch YouTube data with error handling
        try {
          const youtubeResponse = await fetch(
            `https://blade66.vercel.app/api/66f07ec7-0668-4912-baaf-848e7673c261?youtube=${profileData.socials.youtube}`
          );
          
          if (!youtubeResponse.ok) {
            console.warn('YouTube API not available, continuing without video data');
            setYoutubeData(null);
          } else {
            const youtubeData = await youtubeResponse.json();
            setYoutubeData(youtubeData);
          }
        } catch (youtubeError) {
          console.warn('YouTube API error:', youtubeError.message);
          setYoutubeData(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Header Section */}
      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture with Glow Effect */}
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <img
                  src={profile.profile.pfp}
                  alt={profile.username}
                  className="w-40 h-40 rounded-full object-cover border-4 border-slate-800 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

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
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12 relative z-10">
        {/* YouTube Section */}
        {youtubeData && youtubeData.id && (
          <section className="mb-12">
            <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-500/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
              
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  <i className="fab fa-youtube text-3xl mr-3 text-red-500 drop-shadow-lg"></i>
                  Latest YouTube Video
                </span>
              </h2>
              
              <div className="flex flex-col lg:flex-row bg-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/50 hover:border-purple-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
                {/* Video Thumbnail */}
                <div className="lg:w-2/5 relative group cursor-pointer overflow-hidden">
                  <div className="aspect-video h-full">
                    <img 
                      src={youtubeData.thumbnail} 
                      alt={youtubeData.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl group-hover:shadow-red-500/40">
                      <i className="fas fa-play text-white text-2xl transform group-hover:scale-110 transition-transform"></i>
                    </div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-8 lg:w-3/5">
                  <h3 className="text-2xl font-semibold text-white mb-4 hover:text-purple-300 transition-colors duration-300 line-clamp-2 leading-tight">
                    {youtubeData.title}
                  </h3>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: 'eye', value: youtubeData.viewCount, label: 'views', color: 'text-blue-400' },
                      { icon: 'thumbs-up', value: youtubeData.likeCount, label: 'likes', color: 'text-green-400' },
                      { icon: 'comment', value: youtubeData.commentCount, label: 'comments', color: 'text-yellow-400' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <i className={`fas fa-${stat.icon} text-lg ${stat.color}`}></i>
                          <div>
                            <div className="text-white font-semibold text-lg">
                              {Number(stat.value).toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Publish Date */}
                  <div className="flex items-center gap-3 text-gray-400 mb-6 p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <i className="far fa-calendar-alt text-purple-400 text-lg"></i>
                    <span>Published: {new Date(youtubeData.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  {/* Watch Button */}
                  <a 
                    href={`https://youtube.com/watch?v=${youtubeData.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-500/30 font-semibold group relative overflow-hidden"
                  >
                    <i className="fab fa-youtube text-xl"></i>
                    Watch on YouTube
                    <i className="fas fa-arrow-up-right-from-square ml-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity"></i>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section className="bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-500/30 relative overflow-hidden">
          <div className="absolute -top-15 -left-15 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <i className="fas fa-link text-2xl text-purple-400 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"></i>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connect with me
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { 
                platform: 'youtube', 
                color: 'from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700', 
                icon: 'fab fa-youtube', 
                label: 'YouTube',
                url: `https://youtube.com/channel/${profile.socials.youtube}`
              },
              { 
                platform: 'twitch', 
                color: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700', 
                icon: 'fab fa-twitch', 
                label: 'Twitch',
                url: `https://twitch.tv/${profile.socials.twitch}`
              },
              { 
                platform: 'instagram', 
                color: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600', 
                icon: 'fab fa-instagram', 
                label: 'Instagram',
                url: `https://instagram.com/${profile.socials.instagram}`
              },
              { 
                platform: 'twitter', 
                color: 'from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500', 
                icon: 'fab fa-x-twitter', 
                label: 'Twitter',
                url: `https://twitter.com/${profile.socials.twitter}`
              },
              { 
                platform: 'throne', 
                color: 'from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700', 
                icon: 'fas fa-crown', 
                label: 'Throne',
                url: `https://throne.com/${profile.socials.throne}`
              },
              { 
                platform: 'discord', 
                color: 'from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600', 
                icon: 'fab fa-discord', 
                label: 'Discord',
                url: `https://discord.gg/${profile.socials.discord}`
              }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r ${social.color} text-white rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className={`${social.icon} text-3xl mb-3 relative z-10`}></i>
                <span className="text-lg font-semibold relative z-10">{social.label}</span>
                <i className="fas fa-arrow-up-right-from-square mt-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10"></i>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400 text-sm relative z-10">
        <p className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/10">
          © {new Date().getFullYear()} {profile.username} • All rights reserved
        </p>
      </footer>
    </div>
  );
}
