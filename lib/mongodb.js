import mongoose from 'mongoose'

export async function connectDB(){
    try{
        if(mongoose.connection.readyState === 1){
            console.log("Already Connected to MongoDB")
            return
        }

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected")

    }catch(err){
        console.error("Failed to Connect to MongoDB" , err)
    }
}