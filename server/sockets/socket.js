import {Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}


const userSocketMap = {}; 

io.on("connection", (socket) => {
    console.log("User connected", socket.id)
    const userId = socket.handshake.query.userId
    if(userId != "undefined"){
        userSocketMap[userId] = socket.id
    }
    // emit() used to send the event   
    io.emit("onlineUsers", Object.keys(userSocketMap))
     
    // on() used to listen the event
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })
})

export {app, io, server }


