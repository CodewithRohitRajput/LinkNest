'use client'
import { useRouter } from "next/navigation";


export default function LogoutBtn(){
  const router = useRouter();
    
  const handleLogout = async ()=>{
    await fetch('http://localhost:3000/api/logout' , 
        {method : 'DELETE' , 
            credentials : 'include'
        }
    );
    router.push('/')
  }


  return (
    <div>
                <button
                onClick={handleLogout}
                  type="submit"
                  className="bg-transparent border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg"
                >
                  Logout
                </button>
    </div>
  )


}