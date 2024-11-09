import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()
const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.jWT_SECRET,{ expiresIn: '15d'})
    res.cookie("jwt", token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development" 
    })

}

export default generateTokenAndSetCookie