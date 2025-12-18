import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
    email:{type:String,required:true},
    ownersname:{type:String,required:true},
    nameofshop:{type:String,required:true},
    address:{type:String,required:true},
    phonenumber:{type:Number,required:true},
    // password:{type:String,required:true},
    commonkey:{type:Schema.Types.ObjectId ,ref:"Login"}

}) 


const shopdata = mongoose.model("shop",shopSchema)

export default shopdata