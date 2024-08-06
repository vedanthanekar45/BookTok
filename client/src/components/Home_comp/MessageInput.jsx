import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {

    const [message, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessage()

    async function handleSubmit (e) {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage("")
    }

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text" className="border text-sm rounded-xl block w-full p-2.5
                bg-gray-100 text-black" placeholder="Enter your Message..." 
                value={message}
                onSubmit={(e) => sendMessage(e.target.value)}/>
                <button type="submit" className="absolute text-green-600 inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="loading loading-spinner"></div> : <IoSendSharp />}                   
                </button>
            </div>
        </form>
    )
}

export default MessageInput;