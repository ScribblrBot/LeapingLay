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
          // Continue without YouTube data - it's optional
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
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center text-white">
        <div className="text-red-400 text-2xl mb-4">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg text-white pb-10">
      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Banner and Profile Header */}
      <header className="relative">
        <div 
          className="h-48 md:h-64 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.profile.banner})` }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 px-6 py-4 bg-gray-800 bg-opacity-70 backdrop-blur rounded-xl">
            <img
              src={profile.profile.pfp}
              alt={profile.username}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-800 shadow-lg"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-300">{profile.username}</h1>
              <p className="text-gray-300">{profile.handle} • {profile.pronouns}</p>
              <p className="mt-2 text-gray-200 max-w-2xl">{profile.bio}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        {/* YouTube Section - Only show if data is available */}
        {youtubeData && youtubeData.video && (
          <section className="card mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-300">
              <i className="fab fa-youtube mr-2"></i> Latest YouTube Video
            </h2>
            <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative md:w-1/3">
                <img 
                  src={youtubeData.video.thumbnail} 
                  alt={youtubeData.video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <i className="fas fa-play text-white text-xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-4 md:w-2/3">
                <h3 className="text-lg font-semibold mb-2">{youtubeData.video.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                  <span><i className="fas fa-eye mr-1"></i> {Number(youtubeData.video.viewCount).toLocaleString()} views</span>
                  <span><i className="fas fa-thumbs-up mr-1"></i> {Number(youtubeData.video.likeCount).toLocaleString()} likes</span>
                  <span><i className="fas fa-comment mr-1"></i> {Number(youtubeData.video.commentCount).toLocaleString()} comments</span>
                </div>
                <p className="text-sm text-gray-400">
                  Published: {new Date(youtubeData.video.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section className="card">
          <h2 className="text-xl font-bold mb-6 text-blue-300">Connect with me</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <a 
              href={`https://youtube.com/channel/${profile.socials.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-red-600 hover:bg-red-500"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a 
              href={`https://twitch.tv/${profile.socials.twitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-purple-600 hover:bg-purple-500"
            >
              <i className="fab fa-twitch"></i>
            </a>
            <a 
              href={`https://instagram.com/${profile.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-pink-600 hover:bg-pink-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href={`https://twitter.com/${profile.socials.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-blue-400 hover:bg-blue-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href={`https://throne.com/${profile.socials.throne}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-yellow-600 hover:bg-yellow-500"
            >
              <i className="fas fa-crown"></i>
            </a>
            <a 
              href={`https://discord.com/users/${profile.socials.discord}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon bg-indigo-600 hover:bg-indigo-500"
            >
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
