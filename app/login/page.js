'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "../Footer/page"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials : 'include',
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      setEmail('')
      setPassword('')
      router.push('/dashboard/profile')
    } else {
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 flex items-center gap-2">
            <span>🔐</span> Hey Buddy, Log in to LinkNest
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="Enter your password"
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
                Log In
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-4">
              Do not have an account? <Link href='/signup' className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <Footer />
      </footer>
    </div>
  )
}
