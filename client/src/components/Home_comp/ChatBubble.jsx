import { useAuthContext } from "../../context/authContext";
import useConversation from "../../store/useConversation";

function ChatBubble ({message}) {
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const chatClass = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? 'bg-green-700' : 'bg-gray-200'

    return (
        <div className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-black font-sans ${bubbleBgColor}`}>{message}</div>
        </div>
    )
}

export default ChatBubble;