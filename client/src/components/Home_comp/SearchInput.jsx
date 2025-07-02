import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

function SearchInput() {

    const [search, setSearch] = useState("")
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return;
        if(search.length < 3) {
            return toast.error("Search term must be at least 3 characters long")
        }

        const conversation = conversations.find((c) => c.firstName.toLowerCase().includes(search.toLowerCase()))
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch('')
        } else {
            return toast.error("No such user found")
        }
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search.." className="input bg-white text-black input-bordered rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-circle bg-green-700 text-white">
            <IoIosSearch className="w-6 h-6"/>
            </button>
        </form>
    )
}

export default SearchInput;