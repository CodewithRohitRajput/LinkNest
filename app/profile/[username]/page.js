import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/app/models/User";
import Link from "next/link";

export default async function PublicProfile({ params }) {
  await connectDB();
  const { username } = params;

  const user = await UserModel.findOne({ username }).lean();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-red-500 mb-4 text-center animate-pulse">
            User Not Found
          </h1>
          <p className="text-gray-600 text-center">
            The profile you are looking for does not exist or has been removed.
          </p>
          <div className="mt-6 flex justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Picture */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-white/20 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden shadow-2xl">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={`${user.fullname || user.username}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {/* <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-1 px-4 rounded-full text-sm shadow-lg">
                PRO
              </div> */}
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {user.fullname || user.username}
            </h1>
            <p className="text-blue-300 text-xl mb-4">@{username}</p>
            
            <div className="max-w-xl">
              <p className="text-gray-300 text-lg mb-6">
                {user.bio || "Passionate professional with a drive for excellence and innovation."}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center  md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.projects}</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.experience}</div>
                  <div className="text-gray-400 text-sm">Years Exp</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Skills & Expertise
          </h2>
          
          <div className="flex flex-wrap gap-3">
           {user.skills}
          </div>
        </div>
        
        {/* Contact & Social Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300">{user.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">{user.city}, {user.state}</span>
              </div>
            </div>
          </div>
          
          {/* Social Links Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Connect With Me
            </h2>
            
            <div className="space-y-3">
              {user.linkedin && (
                <Link
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600/30 to-blue-800/30 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:from-blue-600/50 hover:to-blue-800/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-blue-300 transition-colors">LinkedIn</div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Professional Network</div>
                  </div>
                </Link>
              )}
              
              {user.github && (
                <Link
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-gray-700/30 to-gray-900/30 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:from-gray-700/50 hover:to-gray-900/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.13-1.47-1.13-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.91 1.56 2.39 1.11 2.97.85.09-.66.36-1.11.65-1.36-2.27-.26-4.65-1.13-4.65-5.03 0-1.11.39-2.02 1.04-2.73-.1-.26-.45-1.3.1-2.71 0 0 .85-.27 2.79 1.04a9.72 9.72 0 0 1 5.12 0c1.94-1.31 2.79-1.04 2.79-1.04.55 1.41.2 2.45.1 2.71.65.71 1.04 1.62 1.04 2.73 0 3.91-2.38 4.77-4.65 5.03.36.31.68.93.68 1.88v2.79c0 .27.16.58.67.5A10 10 0 0 0 22 12c0-5.58-4.42-10-10-10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-gray-300 transition-colors">GitHub</div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Code & Projects</div>
                  </div>
                </Link>
              )}
              
              {user.website && (
                < Link
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-green-600/30 to-green-800/30 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:from-green-600/50 hover:to-green-800/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 0 1-8-8c0-1.87.65-3.58 1.72-4.96l11.24 11.24A7.96 7.96 0 0 1 12 20zm6.28-3.04L7.04 5.72A7.96 7.96 0 0 1 12 4a8 8 0 0 1 6.28 12.96z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-green-300 transition-colors">Portfolio</div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Personal Website</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        {/* <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Contact Me
          </button>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            Available for freelance work, consulting, and collaboration opportunities.
          </p>
        </div> */}
      </div>
    </div>
  );
}