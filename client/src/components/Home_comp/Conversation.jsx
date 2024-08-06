import useConversation from "../../store/useConversation";

function Conversation ({conversation}) {
    const {selectedConversation, setSelectedConversation}= useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    return(
        <div className={`flex gap-2 items-center hover:bg-gray-200 py-2 rounded p-2 my-1 cursor-pointer
        ${isSelected ? "bg-gray-200": ""}
        `} onClick={() => setSelectedConversation(conversation)}> 
            <div className="avatar online">
                <div className="w-16 rounded-full">
                    <img src={conversation.profilePic} />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-2 justify-between">
                    <p className="font-bold text-black text-xl">{conversation.firstName} {conversation.lastName}</p>
                </div>
                <p className="text-gray-600">{conversation.userName}</p>
            </div>
            <div></div>
        </div>
    )
}

export default Conversation;