import { useContext, createContext, useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import io from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

const apiBase = import.meta.env.VITE_API_URL;

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const {authUser} = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const socket = io(`${apiBase}`, {
                query: {
                    userID: authUser._id
                }
            });
            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}