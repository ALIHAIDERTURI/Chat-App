import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp =  async (req, res)=>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body

        if(password!== confirmPassword){
            return res.status(400).json({error: "password don't match"})
        }
        
        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"Username already exists!"}  )
        }

        // password hashing here 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // placeHolder picture for profile 
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
        }
        else{
            res.status(400).json({error:"invalid user data"})
        }
        
    } catch (error) {
        console.log("Error in signUp controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
        
    }
}

export const login =  async (req, res)=>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
           return res.status(400).json({error: "invalid credentials"})
        }
        
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"logged Out successfully"})

        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}