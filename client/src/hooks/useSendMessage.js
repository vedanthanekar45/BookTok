import { useState } from "react";
import toast from "react-hot-toast"
import useConversation from "../store/useConversation.js"

const  useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("chat-user");
            const user = JSON.parse(storedUser);
            const res = await fetch(`http://localhost:5000/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({message}) 
            })
            const data = await res.json();
            if (data.error) {throw new Error(data.error)}
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, sendMessage}
}

export default useSendMessage;