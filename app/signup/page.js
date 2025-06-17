'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "../Footer/page"

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setEmail('')
      setPassword('')
      setUsername('')
      router.push('/dashboard/profile')
    } else {
      setErr(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-gray-100 flex-grow">
      
      {/* Form section */}
      <div className="flex items-center justify-center flex-grow px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 flex items-center gap-2">
            <span>🚀</span> Sign up for LinkNest
          </h2>
          {err && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{err}</div>
          )}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md"
              >
                Sign Up
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account? <Link href='/login' className="text-blue-600 hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer section */}
      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>
  )
}
