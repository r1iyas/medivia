import mongoose, { Schema } from "mongoose";

const bookingSchema =new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Login", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    date:{type:String,required:true},
    timeSlot:{type:String,required:true},
    reason:{type:String,required:true},
})

const drbookingdata =mongoose.model("DoctorBooking",bookingSchema);
export default drbookingdata;