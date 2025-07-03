import { useEffect, useState } from 'react'
import useConversation from '../store/useConversation'

const useGetMessages = () => {

    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            const storedUser = localStorage.getItem("chat-user");
            const user = JSON.parse(storedUser);
            try {
                const res = await fetch(`http://localhost:5000/messages/get/${selectedConversation._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                })
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()

    }, [selectedConversation?._id, setMessages])

    return {messages, loading}
}

export default useGetMessages