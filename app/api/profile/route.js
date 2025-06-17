import { UserModel } from "@/app/models/User";
import { connectDB } from "@/lib/mongodb";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";


const SECRET = process.env.JWT_SECRET;

export async function GET(){
    await connectDB();

    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value;

    const decoded = jwt.verify(token , SECRET);

    const user = await UserModel.findById(decoded.userId)

    return Response.json(user , {status : 200});

}

export async function PUT(req){
    await connectDB();

    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value;

    const decoded = jwt.verify(token , SECRET);
    const body = await req.json();

    const updatedUser = await UserModel.findByIdAndUpdate( decoded.userId , {
        fullname : body.fullname , 
        bio : body.bio,
        linkedin : body.linkedin,
        github : body.github,
        website : body.website,
        skills : body.skills,
        profilePic : body.profilePic,
        phoneNumber : body.phoneNumber,
        city : body.city,
        state : body.state,
        projects : body.projects,
        experience : body.experience,
    } , {new  : true})


return Response.json({message : "Profile updated"} , {status : 200})

}



