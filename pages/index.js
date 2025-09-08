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
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading Profile</h2>
          <p className="text-gray-400 mt-2">Just a moment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-purple-500/20">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 z-0"></div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 blur"></div>
              <img
                src={profile.profile.pfp}
                alt={profile.username}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-slate-800 shadow-xl"
              />
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {profile.username}
              </h1>
              <p className="text-gray-300 text-lg mt-1">{profile.handle} • {profile.pronouns}</p>
              <p className="mt-4 text-gray-300 leading-relaxed max-w-lg">{profile.bio}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* YouTube Section */}
        {youtubeData && youtubeData.video && (
          <section className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mr-3">
                <i className="fab fa-youtube text-2xl mr-2 text-red-500"></i>
                Latest YouTube Video
              </span>
            </h2>
            
            <div className="flex flex-col lg:flex-row bg-slate-700/40 rounded-xl overflow-hidden border border-slate-600/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="lg:w-2/5 relative group cursor-pointer">
                <div className="aspect-video h-full overflow-hidden">
                  <img 
                    src={youtubeData.video.thumbnail} 
                    alt={youtubeData.video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <i className="fas fa-play text-white text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="p-6 lg:w-3/5">
                <h3 className="text-xl font-medium text-white mb-3 hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                  {youtubeData.video.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-4">
                  <span className="flex items-center bg-slate-700/60 px-3 py-1.5 rounded-full">
                    <i className="fas fa-eye mr-2 text-blue-400"></i> 
                    {Number(youtubeData.video.viewCount).toLocaleString()} views
                  </span>
                  <span className="flex items-center bg-slate-700/60 px-3 py-1.5 rounded-full">
                    <i className="fas fa-thumbs-up mr-2 text-green-400"></i> 
                    {Number(youtubeData.video.likeCount).toLocaleString()} likes
                  </span>
                  <span className="flex items-center bg-slate-700/60 px-3 py-1.5 rounded-full">
                    <i className="fas fa-comment mr-2 text-yellow-400"></i> 
                    {Number(youtubeData.video.commentCount).toLocaleString()} comments
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-5">
                  <i className="far fa-calendar-alt mr-2 text-purple-400"></i>
                  Published: {new Date(youtubeData.video.publishedAt).toLocaleDateString()}
                </p>
                
                <a 
                  href={`https://youtube.com/watch?v=${youtubeData.video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/20 font-medium group"
                >
                  <i className="fab fa-youtube mr-3 text-xl"></i>
                  Watch on YouTube
                  <i className="fas fa-arrow-up-right-from-square ml-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity"></i>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <i className="fas fa-link mr-3 text-purple-400"></i>
            Connect with me
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                icon: 'fab fa-twitter', 
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
                url: `https://discord.com/users/${profile.socials.discord}`
              }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r ${social.color} text-white rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 shadow-md hover:shadow-lg group`}
              >
                <i className={`${social.icon} text-2xl mb-2`}></i>
                <span className="text-sm font-medium">{social.label}</span>
                <i className="fas fa-arrow-up-right-from-square mt-2 text-xs opacity-0 group-hover:opacity-70 transition-opacity"></i>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} {profile.username} • All rights reserved</p>
      </footer>
    </div>
  );
}
