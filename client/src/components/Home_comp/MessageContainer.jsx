import Messages from "./Messages"
import MessageInput from "./MessageInput";
import useConversation from "../../store/useConversation";
import { useEffect } from "react";

function MessageContainer() {
    const {selectedConversation, setSelectedConversation}= useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])
    return (
        <div className="md:min-w-[800px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                <div className="bg-green-700 px-4 py-2 ">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={selectedConversation.profilePic}></img>
                        </div>
                        <span className='text-white ml-4 mt-2 text-xl'>{selectedConversation.firstName} {selectedConversation.lastName}</span>
                    </div>
                    
                </div>
                <Messages />
                <MessageInput />
                </>)}
        </div>
        
    )
}

const NoChatSelected = () => {

    const storedUser = localStorage.getItem("chat-user");
    const user = JSON.parse(storedUser);
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col
            items-center gap-2">
                <p>Welcome {user.firstName} {user.lastName}!</p>
                <p>Select a chat to start messaging.</p>
            </div>
        </div>
    )
}

export default MessageContainer;