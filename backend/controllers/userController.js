import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import dotenv from 'dotenv';
dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };

const registerUser = async(req, res)=>{
    const { name, email, password } = req.body;
    try{
        const exists = await userModel.findOne({email});

        if(exists){
            return res.json({success:false, message:"User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong passowrd"});
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassowrd = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassowrd,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    }
}

const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {registerUser, loginUser}