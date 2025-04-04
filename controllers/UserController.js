const { default: mongoose } = require('mongoose');
const User=require('../models/User');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
 require('../routers/UserRouters');

exports.getAllUsers = async (req, res) => {
    try {
       
        if ( req.user.role !== 'admin') {
            return res.status(400).json({ message: ' Admins only' });
        }

      
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createUser=async(req,res)=>{
const{name,email,password}=req.body
try {
  user={name,email,password}
  savedUser=new User(user)
  savedUser.save()
  res.status(200).json(savedUser)  
} catch (error) {
    res.status (500).json({message:error.message})
}
}
exports.getUserByName=async(req,res)=>{
    const{name}=req.body
    try {
       const user=await User.find({name:name})
       res.status(200).json(user) 
    } catch (error) {
        res.status (500).json({message:error.message})
    }
}
exports.updateUserById =async (req,res)=>{
    const {id} =req.params 
    const{name,email,password}=req.body
    try {
 const userToUpdate= await User.findByIdAndUpdate(id,{name,email,password})
    res.status(200).json({message:"User Updated successfully"})

    }
 catch (error) {
        res.status (500).json({message:error.message})
    }
}
exports.UpdateAllUserByEmail=async(req,res)=>{
    try {
        const oldEmail=req.body
        const newEmail=req.body
        const users =await User.updateMany({email:oldEmail,email:newEmail})
        res.status(200).json(users)
    } catch (error) {
        
    }
}
exports.deleteUserById =async (req,res)=>{
    const {id} =req.params 
    const{name,email,password}=req.body
    try {
 const userTodelete= await User.findByIdAndDelete(id,{name,email,password})
    res.status(200).json({message:"User Deleted successfully"})

    }
 catch (error) {
        res.status (500).json({message:error.message})
    }
}
exports.login=async(req,res)=>{
    const {email,password}=req.body
    console.log('you are in login url')
    try {
      const user=await  User.findOne ({email:email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
      const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(400).json({message:'invalid password'}) 
}
const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1y" })

 res .status(200).json({message:'User log in is sucsssfully',token:token})
    } catch (error) {
        res.status (500).json({message:error.message})
    }
}

exports.auth = async (req, res, next) => {
    try {
        
        const token = req.header('Auth');
        if (!token) {
            return res.status(400).json({ message: "Token not found" }); 
        }

        const verified = jwt.verify(token, SECRET_KEY);

        
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

       
        req.user = user;
        next();

    } catch (error) {
        res.status (500).json({message:"Invallied Token"})
    }
};
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});  
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};