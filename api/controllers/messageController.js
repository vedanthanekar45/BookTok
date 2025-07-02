/* This program is to handle all the messgaes incoming and outgoing */

// Importing the Conversation and Message models
import Conversation from "../models/conversation.js"
import Message from "../models/message.js"

// Function to handle incoming messages
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatID] }
        }).populate("messages");

        // SAFETY FIRST
        if (!conversation || !conversation.messages) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// export const getMessage = async (req, res) => {
//     try {
//         // Get the ID(as defined by the database) of the user that you're talking to, plus the senderID
//         const {id: userToChatID} = req.params;
//         const senderID = req.user._id;

//         // Find if the conversation already exists, if yes then populate it with the messages given
//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderID, userToChatID]}
//         }).populate("messages"); // ---> Not reference but actual messages

//         // If the conversation doesn't exist, then create one
//         if(!conversation) {
//             return res.status(200).json([]);
//         }

//         res.status(200).json(conversation.messages);

//     } catch (error) {
//         console.log("Error in getMessage controller: ", error.message);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// }

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id:receiverID } = req.params;
        const senderID = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] },
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
        }

        const newMessage = new Message({
            senderID: senderID,
            receiverID: receiverID,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}