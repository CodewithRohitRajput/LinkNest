'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const[name , Setname] = useState('');

  

  useEffect(() => {

    const fetchUsername = async () =>{
       const res = await fetch('/api/profile')
       const data = await res.json();
       Setname(data.username);
    }

    fetchUsername();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LinkNest
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/about" className={`text-gray-700 hover:text-blue-600 font-medium ${pathname === '/about' ? 'underline' : ''}`}>
            About
          </Link>

          <Link href="/dashboard/profile" className={`text-gray-700 hover:text-blue-600 font-medium ${pathname.startsWith('/dashboard') ? 'underline' : ''}`}>
            My Details
          </Link>

          <Link href={`/profile/${name}`} className={`text-gray-700 hover:text-blue-600 font-medium ${pathname.startsWith('/dashboard') ? 'underline' : ''}`}>
            My Portfolio
          </Link>

          <Link href="/dashboard/profile" className={`text-gray-700 hover:text-blue-600 font-medium ${pathname.startsWith('/dashboard') ? 'underline' : ''}`}>
            Contact Us
          </Link>
         
        </div>
      </div>
    </nav>
  )
}
