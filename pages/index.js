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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading Profile</h2>
          <p className="text-gray-600 mt-2">Just a moment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative">
              <img
                src={profile.profile.pfp}
                alt={profile.username}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
              <p className="text-gray-600 text-lg">{profile.handle} • {profile.pronouns}</p>
              <p className="mt-3 text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* YouTube Section */}
        {youtubeData && youtubeData.video && (
          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-red-600 mr-3 text-2xl"><i className="fab fa-youtube"></i></span>
              Latest YouTube Video
            </h2>
            
            <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="lg:w-2/5 relative group">
                <img 
                  src={youtubeData.video.thumbnail} 
                  alt={youtubeData.video.title}
                  className="w-full h-48 lg:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <i className="fas fa-play text-white text-lg"></i>
                  </div>
                </div>
              </div>
              
              <div className="p-6 lg:w-3/5">
                <h3 className="text-lg font-medium text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                  {youtubeData.video.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-eye mr-2 text-blue-500"></i> 
                    {Number(youtubeData.video.viewCount).toLocaleString()} views
                  </span>
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-thumbs-up mr-2 text-green-500"></i> 
                    {Number(youtubeData.video.likeCount).toLocaleString()} likes
                  </span>
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-comment mr-2 text-yellow-500"></i> 
                    {Number(youtubeData.video.commentCount).toLocaleString()} comments
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-5">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Published: {new Date(youtubeData.video.publishedAt).toLocaleDateString()}
                </p>
                
                <a 
                  href={`https://youtube.com/watch?v=${youtubeData.video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <i className="fab fa-youtube mr-3 text-xl"></i>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-link mr-3 text-blue-500 text-2xl"></i>
            Connect with me
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { 
                platform: 'youtube', 
                color: 'bg-red-600 hover:bg-red-700', 
                icon: 'fab fa-youtube', 
                label: 'YouTube',
                url: `https://youtube.com/channel/${profile.socials.youtube}`
              },
              { 
                platform: 'twitch', 
                color: 'bg-purple-600 hover:bg-purple-700', 
                icon: 'fab fa-twitch', 
                label: 'Twitch',
                url: `https://twitch.tv/${profile.socials.twitch}`
              },
              { 
                platform: 'instagram', 
                color: 'bg-pink-600 hover:bg-pink-700', 
                icon: 'fab fa-instagram', 
                label: 'Instagram',
                url: `https://instagram.com/${profile.socials.instagram}`
              },
              { 
                platform: 'twitter', 
                color: 'bg-blue-400 hover:bg-blue-500', 
                icon: 'fab fa-twitter', 
                label: 'Twitter',
                url: `https://twitter.com/${profile.socials.twitter}`
              },
              { 
                platform: 'throne', 
                color: 'bg-yellow-600 hover:bg-yellow-700', 
                icon: 'fas fa-crown', 
                label: 'Throne',
                url: `https://throne.com/${profile.socials.throne}`
              },
              { 
                platform: 'discord', 
                color: 'bg-indigo-600 hover:bg-indigo-700', 
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
                className={`${social.color} text-white rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
              >
                <i className={`${social.icon} text-2xl mb-2`}></i>
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} {profile.username} • All rights reserved</p>
      </footer>
    </div>
  );
}
