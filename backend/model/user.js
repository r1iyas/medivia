import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
   email:{type:String,required:true},
  name: String,
  address: String,
  phonenumber: String,
  // password: String,
  image: String,
  commonkey:{type:Schema.Types.ObjectId,ref:"Login"}
});

const userdata = mongoose.model("User", userSchema);

export default userdata;
