import user from "../models/userSchema.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const JWT_SECRET =process.env.JWT_SECRET || 'your jwt secret';
const Token_Expires='24';
const createToken = (userId) => jwt.sign({id:userId},JWT_SECRET, {expiresIn:Token_Expires});

export async function RegisterUser (req,res,next) {
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res(400).json({success:false , message:"Field are required"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false , message:"Invalid Email"})
    }
    if(password.length<8){
        return res.status(400).json({success:false , message:"password must be at least 8 characters"})
    }
    try{
        if(await user.findOne({email})){
return res.status(400).json({success:false , message:"user already exists"})
        }
        const hashed= await bcrypt.hash(password,10);
        const user=await user.create({name, email ,password:hashed});
        const token=create.token(user._id);
        res.status(201).json({success:true,token,user: {id:true._id, name: username ,email:user.email}});
    }
    catch(error){
next(error)
    }
}
export async function LoginUser(req,res,next) {
    const {email, password}= req.body;
   if( !email || !password){
        return res(400).json({success:false , message:"Field are required"})
    }
    try{
        const user= await user.findOne({email});
        if(!user){
 return res(400).json({success:false , message:"user not found"})
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
 return res(400).json({success:false , message:"Incorrect password"})
        }
        const token=create.token(user._id);
        res.status(201).json({success:true,token,user: {id:true._id, name: username ,email:user.email}});
    }
    catch(error){
        next(error);
    }

}
 export async function getCurrentUser(req,res,next){
        const user = await user.findOne(req.user.id).select("name email");
        try{
            if(!user){
 return res(400).json({success:false , message:"user not found"})
        }
        res.json({success:true ,user}); 
        }
        catch(error){
            next(error);
        }
    }
    
export async function updateProfile(req,res,next) {
 if( !email || !password || !validator.isEmail(email)){
        return res(400).json({success:false , message:"Field are required"})
    }
    try{
        const exists= await user.findOne({email, _id:{$ne: req.user.Id }});
        if(exists){
return res(400).json({success:false , message:"Email already exists "})
        }
        const user =await user.findByIdAndUpdate(
            req.user.id,
            {name,email},
            {new:true, runValidator:true ,select:"name email"}
        );
    }
    catch(error){
        next(error)
    }
}
export async function updatePassword(req,res,next){
    const {currentPassword , newPassword} = req.body;
 if( password || newPassword || newPassword.length< 8 ){
        return res(400).json({success:false , message:"Field are required"})
    }

    try{
        const user = await user.findOne(req.user.id).select("password");
        if(!user){
 return res(400).json({success:false , message:"user not found"})
        }
        const match= await bcrypt.compare(currentPassword,user.password);
        if(!match){
return res(400).json({success:false , message:"password is not correct "})
        }
        user.password=await bcrypt.hash(newPassword,10);
        await user.save();
        res.json({success:true ,message:"password changed"})
}
catch(error){
    next(error)
}
}