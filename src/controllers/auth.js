import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../database/models/users.js"


// Register new account
export const Register=async(req,res)=>{
    try {
        const {password,...userData}=req.body;
        const findUser=await User.findOne({where:{email:userData.email}})
        if(findUser){
            return res.status(404).json({message:"User arleady exist"});  
              }
              const hashPassword=await bcrypt.hash(password,10);
              const userAccount=await User.create({...userData,password:hashPassword});
              res.status(201).json({message:"User created successfully",userAccount});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

// login to the system
export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //check if user is in database
        const user=await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({message:"User try to login in the system is not in the database"})
        }
        //compare user credentials 
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        // define token and what it will have
        const token=jwt.sign(
            {
                id:user.id,
                role:user.role,
                fullName:user.fullName,
                email:user.email,
                phoneNumber:user.phoneNumber,
            },
             process.env.JWT_SECRET,{expiresIn:"1d"}
        )
        res.status(200).json({message:"Loggin succ",token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}