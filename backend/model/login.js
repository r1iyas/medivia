import mongoose, { Mongoose, Schema } from "mongoose";

const loginScheema =new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},

}) 
const logindata=mongoose.model("Login",loginScheema)

export default logindata    