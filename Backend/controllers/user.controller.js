import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
        const {fullname,username,email,password,phoneNumber}=req.body;
        if(!fullname || !username || !email || !password || !phoneNumber){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const userN=await User.findOne({username});
        const userE=await User.findOne({email});
        if(userN || userE){
            return res.status(400).json({
                message:"User already exists with this Username or Email",
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullname,
            username,
            email,
            password:hashedPassword,
            phoneNumber
        });
        return res.status(201).json({
            message:"User registered successfully",
            user:newUser,
            success:true,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
        });
    }
}

export const login=async(req,res)=>{
    try{
        const {identifier,password}=req.body;
        if(!identifier || !password){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const user=await User.findOne({
            $or:[{email:identifier},{username:identifier}]
        });
        if(!user){
            return res.status(400).json({
                message:"No account found with that username or email",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Password",
                success:false
            })
        }
        const tokenData={
            userId:user._id,
            username:user.username
        }
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.status(200).cookie("token",token,{maxAge:1*24*60*70*1000,httpsOnly:true,sameSite:'strict'}).json
        ({
            message:`Welcome back ${user.fullname}`,
            user:{
                _id:user._id,
                fullname:user.fullname,
                username:user.username,
                email:user.email,
                phoneNumber:user.phoneNumber,
            },
            success:true
        })
    }
    catch(error){
        console.error("Login error:",error);
        return res.status(500).json({
            message:"Login failed.Please try again later.",
            success:false,
        });
    }
}

export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    }
    catch(error){
        console.error("Logout error:",error);
        return res.status(500).json({
            message:"Logout failed.Please try again later.",
            success:false,
        });
    }
}