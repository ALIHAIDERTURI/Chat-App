import User from '../models/userModel.js'

export const getUsers = async (req, res)=>{
    try {

        const loggedInUserId = req.user._id
        const filterUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filterUsers)
        
    } catch (error) {
        console.log("Error in getUsers controller", error.message);
        res.status(500).json({error: "internal server error"})
        
    }
}