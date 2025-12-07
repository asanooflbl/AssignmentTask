import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export const usersignup = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({success:false,message:"All fields are requred"})
        }
        const exists = await User.findOne({email});
        if(exists){
          return  res.status(400).json({success:false,message:"Email already exists"})
        }
        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password:hashed
        })

        // n8n webhook integration
        try {
            await axios.post('https://sanoof-assignment.app.n8n.cloud/webhook/8381f3ce-1465-4c86-9233-8cca83ab30c7', {
                username: user.username,
                email: user.email,
                signupTime: new Date()
            });
        } catch (err) {
            console.log('n8n webhook error:', err.message);
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"5d"})
        res.status(201).json({success:true,message:"User Registered",token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
                
    } catch (error) { 
        res.json({success:false,message:error.message})
    }
}

export const userlogin = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email  || !password){
            return res.status(400).json({success:false,message:"email and password are required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"Invalid User"})
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({success:false,message:"Incorrect Password"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"5d"})
        res.status(200).json({success:true,message:"User logged in successfully",token,
            user:{id:user._id,
            username:user.username,
            email:user.email
            }
        })
    } catch(error){
        res.json({success:false,message:error.message})
    }
}