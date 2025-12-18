import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import shopdata from "./model/shop.js"
import logindata from "./model/login.js";
import bcrypt from "bcrypt"
import multer from "multer";
import imagedata from "./model/image.js";
// import Product from "./model/delete.js";
import userdata from "./model/user.js";
import bookingdata from "./model/Booking.js";
import doctordata from "./model/doctor.js";
import drbookingdata from "./model/bookingfordoctor.js";

mongoose.connect("mongodb://localhost:27017/forshop").then(()=>{
    console.log("mongodb connected successfully");
    
}).catch((error)=>{
    console.error("mongodb connection error")
})

const server =express()

server.use(express.json());
server.use(cors({
    origin:'*'
}))

server.listen(5000,()=>{
    console.log("server started")
})
// ----------------- Multer Configuration -----------------
const storage = multer.diskStorage({
  destination: "uploads/", // all files will be stored in 'uploads/' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });
server.use("/uploads", express.static("uploads"));
 

server.post("/addshop",async (req,res)=>{
    console.log(req.body)
    const{email,ownersname,nameofshop,address,phonenumber,password}=req.body
    try{
        const exist=await logindata.findOne({username:email})
        if(exist){
            return res.status(402).json({message:"shop already exist"})

        }
        const hashedpassword =await bcrypt.hash(password,8)
        const login=await logindata.create({username:email,password:hashedpassword,role:"shop"})
        await shopdata.create({commonkey:login._id,nameofshop,address,ownersname,phonenumber,email})

        return res.status(200).json({statuscode:200,message:"registed successfully"})
    }
    catch(error){
        console.log(error);
        
        res.status(500).json({statuscode:500,message:"server error"});
    }
})



server.post("/addlogindata",async (req,res)=>{
    console.log(req.body);
    const{email,password}=req.body
    try{
        const user =await logindata.findOne({username:email})
        console.log(user,'-------');
        
        if(!user){
            return res.json({statuscode:400,message:"user not existed"})
        }
        const passwordvalue =await bcrypt.compare(password,user.password)
        if(! passwordvalue){
            return res.status(400).json({statuscode:400,message:"password is invalid"})
        }
            return res.status(200).json({message:"login successfully",user})
    }catch(error){
        console.log(error);
        
        res.status(500).json({statuscode:500,message:"server error"});
    }
    
})


server.get("/viewdata/:id",async(req,res)=>{
    console.log('ssssssssssssssssss');
    
    try{
        const result=await shopdata.findOne({commonkey:req.params.id})
        if(result){
            res.status(200).json({statuscode:200,result})
        }
        else{
            res.status(400).json({statuscode:400,message:"data didnit get"})
        }
        
    }catch(error){
        res.status(500).json({statuscode:500,message:"server error"})
    }
})


server.post("/adddetails",upload.single("image"),async(req,res)=>{
    console.log(req.body);
    
    const{product,description,price,quantity,shopId}=req.body
console.log(req.file);

    const image =req.file? req.file.filename:null

    console.log(image,"iiiiiiiiiiiiiiiiiiiiiii");
    

    try{
        const productdata=await imagedata.create({image,product,description,price,quantity,shopId})
        console.log(productdata);
        
        return res.status(200).json({message:"product added successfully"})
    }
    catch(error){
        res.status(500).json({message:"try differentlly"})
        console.log(error);
        
    }
    
} )



// server.get("/:id",async(req,res)=>{
//     try{
//         const product =await product.findById(req.params.id);
//         if(!product) return res.status(404).json({message:"product not found"});
//         res.json(product)
//     }catch(err){
//         res.status(500).json({message:"server error"})
//     }
// })

server.get("/getProductsByShop/:shopId",async(req,res)=>{
    try{
        const {shopId} =req.params;
        console.log(shopId);
        
        const products =await imagedata.find({shopId});
console.log(products);

        if(!products.length){
            return res.status(400).json({Message:"No products found for this shop"})
        }
        res.status(200).json(products)

    }catch(error){
        console.log(error);
        res.status(500).json({message:"server error"})
        
    }
})

server.delete("/deleteProduct/:id",async(req,res)=>{
        console.log(req.params.id);
        
        try{
            const deletedata =  await imagedata.findByIdAndDelete(req.params.id);
             console.log(deletedata);
             
            
        res.json({message:"product deleted"})
        }catch(err){
            console.log(err);
            
            return res.status(404).json({message:"error found"})
        }
       
    })


server.get("/getProduct/:id",async(req,res)=>{
    try{
        const product=await imagedata.findById(req.params.id);
        if(!product) return res.status(404).json({message:"product not found"})
        res.json(product)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


server.put("/updateProduct/:id", async (req, res) => {
  try {
    const updatedProduct = await imagedata.findByIdAndUpdate(
      req.params.id,
      {
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image
      },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});




server.post("/adduser", async (req, res) => {
  console.log(req.body);
  const { email, name, address, phonenumber, password, image } = req.body;

  try {
    const exist = await logindata.findOne({username:email});
    if (exist) {
      return res.status(402).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const login = await logindata.create({username:email,password:hashedPassword,role:"user"})
    await userdata.create({commonkey:login._id,name,address,phonenumber,email,image});

    return res.status(200).json({
      statuscode: 200,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscode: 500, message: "Server error" });
  }
});

server.get("/userdata/:id",async(req,res)=>{
    try{
        const result =await userdata.findOne({commonkey:req.params.id})
        if(result){
            res.status(200).json({statuscode:200,result})

        }
        else{
            res.status(400).json({statuscode:400,message:"try again"})
        }
    }catch(error){
        console.log(error);
        
        res.status(500).json({statuscode:500,message:"server error"})
    }
})

server.get("/getAllProducts",async(req,res)=>{
    console.log("request for shop",req.params.shopId);
    try{
        const products =await imagedata.find().populate("shopId");
        console.log("products found:",products.length);
        res.json(products)
    }catch(err){
        console.error("error fetching all products:",err);
        res.status(500).json({error:"failed to fetch products"});
        
    }
})

server.post("/addBooking", async (req, res) => {
  try {
    const { userId, productId, shopId, quantity } = req.body;
    if (!userId || !productId || !shopId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = new bookingdata({ userId, productId, shopId, quantity });
    await booking.save();

    res.status(201).json({ 
      success: true,
      message: "Booking successful!",
      booking
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ 
      success: false,
      message: "Booking failed", 
      error: err.message 
    });
  }
});


server.get("/getBookingsByShop/:shopId",async(req,res)=>{
    try{
        const {shopId} =req.params;
        console.log(shopId,'ssssssssssssshopid');
        
        const booking =await bookingdata.find({shopId})
            .populate("productId")
            .populate("userId");
         
        const   validBookings =booking.filter((b)=>b.productId!==null)  
            res.json(validBookings);
    }catch(err){
        console.log(err);
        
        res.status(500).json({error:err.message})
    }
});

server.post("/addDoctor",async(req,res)=>{
    console.log(req.body);

    const {email,name,clinic,address,number,password} =req.body;

    try{
        const exist =await logindata.findOne({username:email})
        if(exist){
            return res.status(402).json({message:"Doctor already exist"});
        }
          const hashedPassword=await bcrypt.hash(password,8);
          const login =await logindata.create({username:email,password:hashedPassword,role:"doctor"})
          await doctordata.create({
            commonkey:login._id,email,name,clinic,address,number})
                  return res.status(200).json({statuscode:200,message:"registed successfully"})

    }catch(error){
        console.log(error);
        res.status(500).json({
            statuscode:500,
            message:"server error"
        })
    }
    
} )

server.get("/getdoctordata/:id",async(req,res)=>{
    console.log("Received request to fetch doctor data");

    try{
        const result =await doctordata.findOne({commonkey:req.params.id});
        if(result){
            res.status(200).json({statuscode:200,result})
        }else{
            res.status(400).json({statuscode:400,message:"data not found" })
        }
    }catch(error){
        console.error("error fetching doctor data",error);
        res.status(500).json({
            statuscode:500,message:"server error"
        })
    }
    
})

server.post("/addDoctorBooking",async (req,res)=>{
    console.log("Booking appointment:",req.body);
    const {userId,doctorId,date,timeSlot,reason}= req.body

    try{
        const booking =new drbookingdata({
            userId,doctorId,date,timeSlot,reason
        })
        await booking.save();

        res.status(200).json({message:"appointment booked successfully"})
    }catch(error){
        console.error("error adding appointment:",error)
        res.status(500).json({message:"server error while booking appoinments"})
    }

    
})

server.get("/viewAllDoctors",async (req,res)=>{
    console.log("fetching all doctors");
    try{
        const result =await doctordata.find();
        res.status(200).json({statuscode:200,result})
    }catch(error){

        console.error("error fetching doctors:",error)
        res.status(500).json({message:"server error while fetching doctors"})
    }
})

server.get("/getDoctorAppointments/:doctorId",async(req,res)=>{
    console.log('haai');

        try{
            const result =await drbookingdata.find({doctorId:req.params.doctorId})
            .populate("userId","username")
            res.status(200).json(result)
            console.log(req.params);
            

        }catch(error){
            console.log("error fetching doctor appointments",error)
            res.status(500).json({message:"server error"});
        }
})

server.get("/viewallusers", async (req,res)=>{
    console.log("fetching all users");
    try{
        const result =await userdata.find();
        res.status(200).json({statuscode:200,result})

    }catch(error){
        console.error("error fetching doctors:",error);
        res.status(500).json({message:"server error while fetching users"})
    }
})