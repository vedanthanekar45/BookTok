import { IoIosSearch } from "react-icons/io";

function SearchInput() {
    return (
        <form className="flex items-center gap-2">
            <input type="text" placeholder="Search.." className="input bg-white text-black input-bordered rounded-full"/>
            <button type="submit" className="btn btn-circle bg-green-700 text-white">
            <IoIosSearch className="w-6 h-6"/>
            </button>
        </form>
    )
}

export default SearchInput;