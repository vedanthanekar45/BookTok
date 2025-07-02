import ChatBubble from "./ChatBubble";
import useGetMessages from "../../hooks/useGetMessages";
import { useEffect, useRef } from "react";

function Messages() {

    const {messages, loading} = useGetMessages()
    console.log(messages)

    const lastMsgRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behaviour: "smooth"})
        }, 500)
    }, [messages])

    return (
        <div className="px-4 flex-1 overflow-auto scroll">

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMsgRef}>
                    <ChatBubble message={message}/>
                </div>
            ))}

            {!loading && messages.length === 0 && (
            <p className="text-center mt-10">Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages