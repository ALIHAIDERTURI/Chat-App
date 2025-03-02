import { configDotenv } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dbConnection from "./db/dbConfig.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors";
import {app, server} from "./sockets/socket.js"
import path from "path"

configDotenv();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")))

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
})

server.listen(port, () => {
  dbConnection();
  console.log(`Server is running on port ${port}`);
});
