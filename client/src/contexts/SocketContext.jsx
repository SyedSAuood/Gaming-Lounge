import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useStateContext } from "./ContextsProvider";

const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { user } = useStateContext()

    useEffect(() => {
        if (user.data !== "Unauthorized") {
            const socket = io("http://localhost:5000",{
                query: {
                    userId: user._id
                }
            } );


            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});


            return () => socket.close();
        }
        // Return a dummy socket object if user is unauthorized
        return () => {};
    }, [user]); // Include user in the dependency array



	return (
        <SocketContext.Provider value={{ socket , onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}