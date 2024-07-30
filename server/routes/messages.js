const express = require("express")

const Conversation = require("../model/conversation.model")
const  Message = require("../model/message.model")
const { getReceiverSocketId, io } = require("../socket/socket.js")
const router = express.Router()


router.post("/send/:id",async(req,res)=>{
    console.log(req.params)
    console.log(req.body)
    try {
		const { message, myid } = req.body;
		
		const { id: receiverId } = req.params;
		const senderId = myid;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
			

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
})

router.get("/reciver/:rid/sender/:sid",async(req,res)=>{
    console.log(req.params.rid)
    console.log(req.params.sid)
    try {
        const userToChatId  = req.params.rid;
		const senderId = req.params.sid;
        
        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router