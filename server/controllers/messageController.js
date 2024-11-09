import Conversation from "../models/ConversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res)=>{
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

       let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage =  new Message({
            senderId,
            receiverId,
            message,
        })
        
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //socket io functionality goes here

        // To run both parallel
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({error: "internal server error"})
        
    }
}

export const getMessage = async (req, res)=>{
    try {

        const {id:userToChatId} = req.params;
        const senderId =  req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages") // getting actual msgs in that conversation
        
        if(!conversation){
           return res.status(200).json([])
        }
        const messages = conversation.messages
        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({error: "internal server error"})
        
    }
}