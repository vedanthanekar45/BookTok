import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

function ConversationList() {
    const {conversations} = useGetConversations();
    console.log(conversations, "Conversations");
        return (
        <div className="py-2 flex flex-col overflow-auto">
            {
                conversations.map((conversation) => (
                    <Conversation 
                        key={conversation._id}
                        conversation={conversation}
                    />
                ))
            }
        </div>
    )
}

export default ConversationList;