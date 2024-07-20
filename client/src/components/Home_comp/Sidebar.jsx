import SearchInput from "./SearchInput"
import ConversationList from "./ConversationList"

function Sidebar() {
    return (
        <div className="border-r border-slate-500 p-2 w-[350px] flex flex-col">
            <SearchInput />
            <div className="divider px-3"></div>
            <ConversationList />
        </div>
    )
}

export default Sidebar;