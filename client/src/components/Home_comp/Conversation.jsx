function Conversation () {
    return(
        <div className="flex gap-2 items-center hover:bg-green-700 rounded p-2 py-1 mt-2 mb-2 cursor-pointer">
            <div className="avatar online">
                <div className="w-20 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-2 justify-between">
                    <p className="font-bold text-black text-xl">Cersei Lannister</p>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </div>
    )
}

export default Conversation;