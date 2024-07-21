import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

async function useGetConversations() {
    const [loading, setLoading] = useState(null);
    const [conversation, setConversations] = useState([]);

    useEffect(() => {
        async function getConversations() {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/users")
                const data = res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.log("Error getting users")
                toast.error('Error: ', error.message)
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    },[])

    return {loading, conversation}
}

export default useGetConversations;