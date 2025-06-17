'use client'
import Link from "next/link"
export default function Footer(){
return (
    
     <div
           className="px-4 py-8 bg-gray-900 text-gray-400 text-center">
            <p className="mb-4">
              &copy; {new Date().getFullYear()} LinkNest. All rights reserved.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
        </div>
)
}