'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/Navbar/page'

export default function ProfilePage() {
  const [fullname, setFullname] = useState('')
  const [bio, setBio] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [website, setWebsite] = useState('')
  const [skills, setSkills] = useState('') // Ensure string
  const [profilePic, setProfilePic] = useState('')
  const [urlname, setUrlname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [projects, setProjects] = useState('')
  const [experience, setExperience] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/profile')
        const data = await res.json()
        if (res.ok) {
          setFullname(data.fullname || '')
          setBio(data.bio || '')
          setLinkedin(data.linkedin || '')
          setGithub(data.github || '')
          setWebsite(data.website || '')
          setSkills(data.skills || '') // Ensure skills is a string
          setProfilePic(data.profilePic || '')
          setPhoneNumber(data.phoneNumber || '')
          setCity(data.city || '')
          setState(data.state || '')
          setProjects(data.projects || '')
          setExperience(data.experience || '')
          setUrlname(data.username || '')
        } else {
          setError('Failed to load profile')
        }
      } catch (err) {
        setError('An error occurred while fetching profile')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const fileChanger = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!fullname.trim()) {
      setError('Full name is required')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, bio, linkedin, github, website, skills, profilePic , phoneNumber , city , state , projects , experience }),
      })

      if (res.ok) {
        alert('Profile Updated Successfully')
      } else {
        setError('Failed to update profile')
      }
    } catch (err) {
      setError('An error occurred while updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  // Safely split skills
  const skillList = typeof skills === 'string' && skills.trim() ? skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4 py-12 relative overflow-hidden">
      <Navbar/>
      {/* Background particles */}
      < div className='mt-5' >

      
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse absolute -top-20 -left-20"></div>
        <div className="w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse absolute -bottom-20 -right-20"></div>
      </div>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all hover:scale-[1.02] duration-500">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-3xl">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex items-center justify-center mb-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-300 shadow-xl transition-transform duration-300 group-hover:scale-105">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-3xl">
                  🧑
                </div>
              )}
            </div>
            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-300 shadow-md group-hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h6m6 0h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={fileChanger}
              className="hidden"
            />
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3 animate-fade-in">
          <span className="text-indigo-600">✨</span> Craft Your Profile
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-medium animate-slide-in mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              

              />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
              Short Bio
            </label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md resize-y"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.07 22 2 13.93 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.25 2.67.73 3.88a1.003 1.003 0 0 1-.21 1.11l-2.2 2.2z" />
</svg>
              </span>
              <input
                id="PhoneNumber"
                type="Number"
                placeholder="1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>



          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm4 0h2V11H7v10zm4 0h2v-4h-2v4zm0-6h2v-2h-2v2zm0-4h2V7h-2v2zm0-4h2V3h-2v2zm4 14h6V9h-6v14zm2-10h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
</svg>

              </span>
              <input
                id="city"
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>


          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
              State
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
               <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
</svg>


              </span>
              <input
                id="state"
                type="text"
                placeholder="Enter state name"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>


          <div>
            <label htmlFor="projects" className="block text-sm font-semibold text-gray-700 mb-2">
              How many projects you have completed ? (in numbers)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
             <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M10 4H4a2 2 0 0 0-2 2v2h8l2 2h10V6a2 2 0 0 0-2-2h-8z" />
  <path d="M2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6H11l-2-2H2z" />
</svg>

              </span>
              <input
                id="projects"
                type="text"
                placeholder="Projects completion number"
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>



          <div>
            <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
              Experience (in years)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm4 4V4h-4v2h4zM2 11h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9z"/>
</svg>

              </span>
              <input
                id="experience"
                type="text"
                placeholder="Enter numbers only"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>




          <div>
            <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-2">
              LinkedIn URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </span>
              <input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </span>
              <input
                id="github"
                type="url"
                placeholder="https://github.com/your-username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
              Portfolio Website
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </span>
              <input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
              Skills (separated by commas)
            </label>
            <input
              id="skills"
              type="text"
              placeholder="e.g. React, Node, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value || '')} // Ensure string
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-gradient-to-r from-gray-50/80 to-gray-100/80 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow-md"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {skillList.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-medium transform hover:scale-105 hover:bg-indigo-200 transition-all duration-200 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg transform hover:scale-[1.01] ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        <Link href={`/profile/${urlname}`}>
          <button
            className=" cursor-pointer w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg transform hover:scale-[1.01]"
          >
            View My Portfolio
          </button>
        </Link>
      </div>
    </div>
    </div>
  )
}