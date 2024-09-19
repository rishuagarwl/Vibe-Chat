import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./route/auth.js"
import messageRoutes from "./route/message.js"
import userRoutes from "./route/users.js"
import {app,server} from "./socket/socket.js"

import connectToMongoDb from "./db/connect_to_db.js";



dotenv.config()
const PORT = process.env.PORT || 5000;

app.use(express.json());  //to parse the incoming requests with json payloads
app.use(cookieParser()); // middleware


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req, res)=>{
    res.send("server is ready");    
});


server.listen(PORT, ()=>{
    connectToMongoDb()
    console.log(`Server is running on port ${PORT}`)
})