import { useState } from 'react'
import toast from "react-hot-toast"

function useSignup () {
    const [loading, setLoading] = useState(false);

    const signup = async ({firstName, lastName, userName, email, password}) => {
        const success = handleInputErrors({firstName, lastName, userName, email, password})
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5173/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({firstName, lastName, userName, email, password})
            })

            const data = await res.json();
            console.log(data);
            toast.success("User successfully registered! Proceed to login.")
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup}
}

function handleInputErrors({firstName, lastName, userName, email, password}) {
    if(!firstName || !lastName || !userName || !email || !password) {
        toast.error('Please fill in all fields')
        return false;
    }
}

export default useSignup;