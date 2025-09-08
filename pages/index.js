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

    // Simulate loading for demo purposes
    setTimeout(() => {
      fetchData();
    }, 2500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
        <div className="relative">
          {/* Animated circles */}
          <div className="absolute -inset-12">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-purple-500 rounded-full opacity-25 animate-bounce"></div>
          </div>
          
          {/* Main loader */}
          <div className="relative z-10">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-spin-slow p-1">
              <div className="w-full h-full rounded-full bg-gray-900"></div>
            </div>
            
            <div className="absolute top-0 w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse opacity-70"></div>
          </div>
          
          {/* Text */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
              LeapingLay
            </h2>
            <p className="mt-2 text-gray-300">Loading the ultimate profile...</p>
            
            {/* Animated dots */}
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}</style>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white pb-10">
      <Head>
        <title>{profile.username} - Profile</title>
        <meta name="description" content={profile.bio} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Banner and Profile Header */}
      <header className="relative z-10">
        <div 
          className="h-48 md:h-64 w-full bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${profile.profile.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 bg-gray-900 bg-opacity-60 rounded-full text-xs text-gray-200 backdrop-blur-sm">
              <i className="fas fa-image mr-1"></i> Banner
            </span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 px-6 py-4 bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-2xl border border-gray-700 border-opacity-30 shadow-2xl">
            <div className="relative">
              <img
                src={profile.profile.pfp}
                alt={profile.username}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-800 shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
                {profile.username}
              </h1>
              <p className="text-gray-300 mt-1">{profile.handle} • <span className="text-blue-300">{profile.pronouns}</span></p>
              <p className="mt-3 text-gray-200 max-w-2xl leading-relaxed">{profile.bio}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 relative z-10">
        {/* YouTube Section - Only show if data is available */}
        {youtubeData && youtubeData.video && (
          <section className="bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700 border-opacity-30 shadow-2xl transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              <i className="fab fa-youtube mr-3"></i> Latest YouTube Video
            </h2>
            
            <div className="flex flex-col lg:flex-row bg-gray-800 bg-opacity-70 rounded-xl overflow-hidden border border-gray-700 border-opacity-20">
              <div className="relative lg:w-2/5 group">
                <img 
                  src={youtubeData.video.thumbnail} 
                  alt={youtubeData.video.title}
                  className="w-full h-48 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <i className="fas fa-play text-white text-xl"></i>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-red-600 rounded text-xs font-semibold">NEW</span>
                </div>
              </div>
              
              <div className="p-6 lg:w-3/5">
                <h3 className="text-xl font-bold mb-3 hover:text-blue-300 transition-colors duration-300">{youtubeData.video.title}</h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                  <span className="flex items-center">
                    <i className="fas fa-eye mr-2 text-blue-400"></i> 
                    {Number(youtubeData.video.viewCount).toLocaleString()} views
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-thumbs-up mr-2 text-green-400"></i> 
                    {Number(youtubeData.video.likeCount).toLocaleString()} likes
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-comment mr-2 text-yellow-400"></i> 
                    {Number(youtubeData.video.commentCount).toLocaleString()} comments
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Published: {new Date(youtubeData.video.publishedAt).toLocaleDateString()}
                </div>
                
                <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors duration-300 transform hover:scale-105">
                  Watch on YouTube
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section className="bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 border-opacity-30 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            <i className="fas fa-plug mr-3"></i>Connect With Me
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {[
              { platform: 'youtube', color: 'bg-red-600 hover:bg-red-500', icon: 'fab fa-youtube', label: 'YouTube' },
              { platform: 'twitch', color: 'bg-purple-600 hover:bg-purple-500', icon: 'fab fa-twitch', label: 'Twitch' },
              { platform: 'instagram', color: 'bg-pink-600 hover:bg-pink-500', icon: 'fab fa-instagram', label: 'Instagram' },
              { platform: 'twitter', color: 'bg-blue-400 hover:bg-blue-300', icon: 'fab fa-twitter', label: 'Twitter' },
              { platform: 'throne', color: 'bg-yellow-600 hover:bg-yellow-500', icon: 'fas fa-crown', label: 'Throne' },
              { platform: 'discord', color: 'bg-indigo-600 hover:bg-indigo-500', icon: 'fab fa-discord', label: 'Discord' }
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
                className={`${social.color} social-icon rounded-xl flex flex-col items-center justify-center p-4 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <i className={`${social.icon} text-2xl mb-2`}></i>
                <span className="text-xs font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .social-icon {
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          transform: translateY(-5px) rotate(3deg);
        }
      `}</style>
    </div>
  );
}
