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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-pink-500 rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading Profile</h2>
          <p className="text-gray-600 mt-2">Just a moment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-200">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg hover:from-blue-600 hover:to-pink-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-8">
      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Card with YouTube Video */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Profile Info */}
            <div className="lg:w-2/5 bg-gradient-to-b from-blue-500 to-pink-500 p-8 text-white flex flex-col">
              <div className="flex flex-col items-center text-center mb-8">
                <img
                  src={profile.profile.pfp}
                  alt={profile.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                />
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-blue-100">{profile.handle} • {profile.pronouns}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <i className="fas fa-quote-left mr-2 text-blue-200"></i>
                  About Me
                </h2>
                <p className="text-blue-100 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fas fa-link mr-2 text-blue-200"></i>
                  Connect With Me
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { platform: 'youtube', icon: 'fab fa-youtube', color: 'bg-red-500 hover:bg-red-600' },
                    { platform: 'twitch', icon: 'fab fa-twitch', color: 'bg-purple-500 hover:bg-purple-600' },
                    { platform: 'instagram', icon: 'fab fa-instagram', color: 'bg-pink-500 hover:bg-pink-600' },
                    { platform: 'twitter', icon: 'fab fa-twitter', color: 'bg-blue-400 hover:bg-blue-500' },
                    { platform: 'throne', icon: 'fas fa-crown', color: 'bg-yellow-500 hover:bg-yellow-600' },
                    { platform: 'discord', icon: 'fab fa-discord', color: 'bg-indigo-500 hover:bg-indigo-600' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={
                        social.platform === 'youtube' ? `https://youtube.com/channel/${profile.socials[social.platform]}` :
                        social.platform === 'discord' ? `https://discord.com/users/${profile.socials[social.platform]}` :
                        `https://${social.platform}.com/${profile.socials[social.platform]}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110`}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - YouTube Video */}
            <div className="lg:w-3/5 p-8">
              {youtubeData && youtubeData.video && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                      Latest YouTube Video
                    </span>
                  </h2>
                  
                  {/* Video Embed */}
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeData.video.id}`}
                      title={youtubeData.video.title}
                      className="w-full h-64 md:h-80"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Video Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {youtubeData.video.title}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-lg font-semibold">
                          {Number(youtubeData.video.viewCount).toLocaleString()}
                        </div>
                        <div className="text-gray-600 text-sm">Views</div>
                      </div>
                      <div className="text-center bg-pink-50 rounded-lg p-3">
                        <div className="text-pink-600 text-lg font-semibold">
                          {Number(youtubeData.video.likeCount).toLocaleString()}
                        </div>
                        <div className="text-gray-600 text-sm">Likes</div>
                      </div>
                      <div className="text-center bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-lg font-semibold">
                          {Number(youtubeData.video.commentCount).toLocaleString()}
                        </div>
                        <div className="text-gray-600 text-sm">Comments</div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-6">
                      <i className="far fa-calendar-alt mr-2"></i>
                      Published: {new Date(youtubeData.video.publishedAt).toLocaleDateString()}
                    </div>

                    <a 
                      href={`https://youtube.com/watch?v=${youtubeData.video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg hover:from-blue-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <i className="fab fa-youtube mr-3 text-xl"></i>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Content Creation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-paint-brush mr-3 text-blue-500"></i>
              Content I Create
            </h3>
            <div className="space-y-3">
              {['Storytime Animations', 'Digital Art', 'Gaming Content', 'Art Journey', 'Funny Stories', 'Chaotic Gaming Moments'].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-fire mr-3 text-pink-500"></i>
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <i className="fas fa-video text-blue-500"></i>
                </div>
                <div>
                  <p className="font-medium">Uploaded new video</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-100 p-2 rounded-lg mr-3">
                  <i className="fas fa-palette text-pink-500"></i>
                </div>
                <div>
                  <p className="font-medium">Shared new artwork</p>
                  <p className="text-sm text-gray-600">5 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <i className="fas fa-gamepad text-purple-500"></i>
                </div>
                <div>
                  <p className="font-medium">Live streaming</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-4 mt-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} {profile.username} • All rights reserved</p>
      </footer>
    </div>
  );
}
