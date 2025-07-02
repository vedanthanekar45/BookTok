import ChatBubble from "./ChatBubble";
import useGetMessages from "../../hooks/useGetMessages";

function Messages() {

    const {messages, loading} = useGetMessages()
    console.log(messages)

    return (
        <div className="px-4 flex-1 overflow-auto scroll">

            {!loading && messages.length > 0 && messages.map((message) => {
                <ChatBubble key={message._id} message={message}/>
            })}

            {!loading && messages.length === 0 && (
            <p className="text-center mt-10">Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages