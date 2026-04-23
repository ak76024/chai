import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    username: {type:String, required:true, unique:true},
    bio: {type:String, default:""},
    image: {type:String},
    razorpayId: {type:String, default:""},
    razorpaySecret: {type:String, default:""},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
export default mongoose.models.User || mongoose.model("User", userSchema);