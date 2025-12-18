import mongoose, { Schema } from "mongoose";

const imageschema =new Schema({
    image:{type:String,required:true},
    product:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true},
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop",
        required:true
    }
})


const imagedata=mongoose.model("Image",imageschema)

export default imagedata