import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/app/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET;

export async function POST(req){
    await connectDB();
    const {email , password} = await req.json();

    const notUser = await UserModel.findOne({email});
    if(!notUser) return Response.json({error : "User dont exist"} , {status : 400})

        const validUser = await bcrypt.compare(password , notUser.password )

        if(!validUser) return Response.json({error : "Wrong Password"} , {status : 400})

            const token = jwt.sign({userId : notUser._id} , SECRET, {expiresIn : "7d"})

        
  

           return new Response(
  JSON.stringify({ message: "Login Successful" }),
  {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`,
      "Content-Type": "application/json"
    }
  }
);



}
