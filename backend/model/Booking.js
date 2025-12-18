import mongoose, { Schema } from "mongoose"

const bookingSchema =new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Login",required:true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    quantity:{type:Number,default:1},
    date:{type:Date,default:Date.now}
})



const bookingdata =mongoose.model("Booking",bookingSchema)
export default bookingdata