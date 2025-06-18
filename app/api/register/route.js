import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/app/models/User";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

const SECRET = process.env.JWT_SECRET;

export async function POST(req){
    try{
        await connectDB();
        const{username , email , password} = await req.json();

        const userExist = await UserModel.findOne({email})
        if(userExist){
            return Response.json({error : "Email already exists"} , {status  : 400});
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new UserModel({username , email , password : hashedPassword});
        await newUser.save();

        const token = jwt.sign({userId : newUser._id }, SECRET , {expiresIn : '7d'})

      return new Response(
  JSON.stringify({ message: "User registered" }),
  {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
      'Content-Type': 'application/json'
    }
  }
);


    }catch(err){
        {
            if(err.code === 11000){
                return  Response.json({error : "Username already exist"} , {status : 400})
            }
        }
        return Response.json({error : "Something technically gone wrong "} , {status : 500})
    }

}
