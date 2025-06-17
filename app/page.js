import Link from "next/link"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import LogoutBtn from "./logoutBtn/page";
import Footer from "./Footer/page";
import Navbar from "./Navbar/page";


export default async function Dashboard() {

     const cookieStore = await cookies();
      const token = await cookieStore.get("token")?.value;
   
  
      


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Navbar/>
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fade-in">
          LinkNest: Your 2-Minute Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Create a stunning, shareable portfolio in just 2 minutes. Showcase your social media, projects, and professional links with ease.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
  {token ? (
    <>
      {/* Logout Button */}
      <LogoutBtn/>

      {/* Get Started Button */}
      <Link
        href="/dashboard/profile"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        Get Started
      </Link>
    </>
  ) : (
    <>
      {/* Signup Button */}
      <Link
        href="/signup"
        className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
      >
        Signup
      </Link>

      {/* Get Started Button */}
      <Link
        href="/dashboard/profile"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        Get Started
      </Link>
    </>
  )}
</div>

      </header>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose LinkNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Build your portfolio in just 2 minutes with our intuitive interface.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable Links</h3>
              <p className="text-gray-600">
                Add your LinkedIn, GitHub, personal website, and more to create a unique hub.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Anywhere</h3>
              <p className="text-gray-600">
                Share your LinkNest profile on social media, resumes, or business cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Your Portfolio?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Join thousands of professionals using LinkNest to showcase their online presence in minutes.
        </p>
        <Link
          href="/dashboard/profile"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg inline-block"
        >
          Build now
        </Link>
      </section>

      {/* Footer */}
<Footer/>
    </div>
  )
}