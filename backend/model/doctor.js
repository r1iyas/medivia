import mongoose, { Schema } from "mongoose";

const doctorSchema =new Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    clinic:{type:String,required:true},
    address:{type:String,required:true},
    number:{type:String,required:true},
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:"Login",
    }
})
const doctordata =mongoose.model("doctor",doctorSchema)

export default doctordata;