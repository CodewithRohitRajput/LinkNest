import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true , unique : true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, default: '' },
  bio: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  website: { type: String, default: '' },
  profilePic :{type : String , default : ''},
  phoneNumber:{type : Number  , default : ''},
  city : {type : String , default : ''},
  state : {type : String , default : ''},
  projects : {type : Number , default : ''},
  experience : {type : Number , default : ''},
  skills:{
    type : [String], 
    validate  : [arrayLimit]
  }
});

function arrayLimit(val){
    return val.length <= 5
}

// ✅ FORCE fresh model load in dev
delete mongoose.models.User;

export const UserModel = mongoose.model("User", UserSchema);
