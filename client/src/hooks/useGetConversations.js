import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const apiBase = import.meta.env.VITE_API_URL;

function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        async function getConversations() {
            setLoading(true);
            try {
                const storedUser = localStorage.getItem("chat-user");
                const user = JSON.parse(storedUser);
                const res = await fetch(`${apiBase}/users`, 
                    {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                }
            )
                console.log(res);
                if(!res) {
                    toast.error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(`Error: , ${error.message}`)
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, []);

    return {conversations}
}

export default useGetConversations;