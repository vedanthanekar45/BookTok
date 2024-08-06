import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext.jsx";

function useLogout () {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    async function logout() {
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/auth/logout', {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
            console.error('Error:', error.messgae);
        } finally {
            setLoading(false);
        }
    }
    return {loading, logout}
}

export default useLogout