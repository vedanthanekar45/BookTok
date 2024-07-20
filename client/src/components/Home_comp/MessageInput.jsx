import { IoSendSharp } from "react-icons/io5";

function MessageInput() {
    return (
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input type="text" className="border text-sm rounded-xl block w-full p-2.5
                bg-gray-100 text-black" placeholder="Enter your Message..." />
                <button type="submit" className="absolute text-green-600 inset-y-0 end-0 flex items-center pe-3">
                    <IoSendSharp />
                </button>
            </div>
        </form>
    )
}

export default MessageInput;