import Messages from "./Messages"
import MessageInput from "./MessageInput";

function MessageContainer() {
    const nochatselected = true;
    return (
        <div className="md:min-w-[800px] flex flex-col">
            {nochatselected ? (
                <NoChatSelected />
            ) : (
                <>
                <div className="bg-green-700 px-4 py-2 mb-2">
                    <span className="label-text text-xl">To:  </span>
                    <span className='text-white text-xl'>Cersei Lannister</span>
                </div>
                <Messages />
                <MessageInput />
                
            </>
            )}
            
        </div>
    )
}

const NoChatSelected = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col
            items-center gap-2">
                <p>Welcome Alicent Hightower!</p>
                <p>Select a chat to start messaging.</p>
            </div>
        </div>
    )
}

export default MessageContainer;