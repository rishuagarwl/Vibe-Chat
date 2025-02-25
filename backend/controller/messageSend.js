import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import { getReceiverId } from "../socket/socket.js";



export const sendMessage = async(req, res)=>{
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId, 
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

   

        // this will run parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO FUNCTIONALIty will go here
        const receiverSocketId = getReceiverId(receiverId)
        if(receiverId){
            //io.to(<socket.id>).emit() used to send events to specific clients
            io.to(receiverId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    }
    catch(error){
        console.log("error in sending message controller", error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const getMessages = async(req, res)=>{

    try{
        const{id:userToChatId} = req.params;
        const senderId = req.user._id;     

        const conversation  = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages)
    }
    catch(error){
        console.log("error in getting messages", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}